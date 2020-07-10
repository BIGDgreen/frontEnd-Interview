# koa2中间件的简单实现
## 说明
1. 本次的简单实现重点在中间件的原理上（`compose函数`），而其他部分的实现就忽略了很多细节，只是让代码能跑起来。

2. 与`express`不同，`koa2`的路由处理与它本身是分开的（路由处理用`koa-router`）。这里的内容不包括路由处理。

3. 本次的实现内容包括koa的`use`，`listen`和中间件的洋葱圈模型。

# koa中间件执行机制
koa2中间件使用的是`洋葱圈模型`。这里附上一张网络上广为流传的图：

![洋葱圈模型](https://img-blog.csdnimg.cn/2020070719383912.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

从这张图也能知道个大概意思：请求从最外层传到最里层，响应从最里层逐层往外传递。

下面来看一个经典的例子理解一下（如果之间不了解koa中间件机制的话，请跟着注释一步步地走）：

```js
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  // 1. request: 请求处理开始！执行这一行代码，然后往下走
  console.log('第一层洋葱 - 开始')
  // 2. request: 遇到一个异步函数，进入这个中间件
  await next();

  // 12. response: 第二个中间件执行结束后返回这里，代码往下执行，获得之前在ctx中存储的变量
  const rt = ctx.response.get('X-Response-Time');
  // 13. response: 控制台打印 请求方法 请求路径 响应时间
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  // 14. response: 所有中间件执行结束！
  console.log('第一层洋葱 - 结束')
});

// x-response-time
app.use(async (ctx, next) => {
  // 3. request: 从第一个中间件进入了这里，执行这一行代码，然后往下走 
  console.log('第二层洋葱 - 开始')
  // 4. request: 继续执行代码，存储当前时间戳
  const start = Date.now();
  // 5. request: 又遇到一个异步函数，进入这第三个中间件
  await next();

  // 9. response: 第三个中间件执行结束后返回这里，代码往下执行，获得 ms 变量：第三个中间件的执行时间
  const ms = Date.now() - start;
  // 10. response: 设置 ctx属性，值可以从ctx.response中拿到
  ctx.set('X-Response-Time', `${ms}ms`);
  // 11. response: 第二个中间件执行结束，返回到第一个中间件的next()下方
  console.log('第二层洋葱 - 结束')
});

// response
app.use(async ctx => {
  // 6. request: 从第二个中间件进入到了这里，执行这一行代码，然后往下走
  console.log('第三层洋葱 - 开始')
  // 7. 收到响应数据，将 Hello World 返回给前端
  ctx.body = 'Hello World';
  // 8. response: 第三个中间件执行结束，响应阶段开始，返回到第二个中间件的 next() 下方
  console.log('第三层洋葱 - 结束')
});

// 该函数优先于上面所有函数的执行！
app.listen(8000, () => {
  console.log('server is listening at 8000');
});
```


执行代码后，在浏览器中输入`http://localhost:8000`，控制台打印出：
```
server is listening at 8000
第一层洋葱 - 开始
第二层洋葱 - 开始
第三层洋葱 - 开始
第三层洋葱 - 结束
第二层洋葱 - 结束
GET / - 7ms      
第一层洋葱 - 结束
```

浏览器中显示`Hello World`。


# 代码实现
## 1. 初始化一个类并导出
这里遵循`koa2`的写法直接导出一个类。
```js
class MiniKoa2 {
}

module.exports = MiniKoa2;
```

## 2. 写构造方法
用一个数组来存放所有中间件。
```js
constructor() {
    this.middlewares = [];
}
```
## 3. 注册公有函数use
`koa2`中提供一个`use`函数用来注册中间件，函数参数为中间件函数。因此在`use`中我们直接将中间件放入数组中，最后返回`this`以支持链式调用。
```js
use(fn) {
    this.middlewares.push(fn);
    return this;    // 支持链式调用
}
```
## 4. 注册公有函数listen
在这个方法中，我们需要创建一个http服务，并把处理路由的回调函数传进去。这里创建一个私有函数_callback作为这个回调函数：
```js
const http = require('http');
const _callback = Symbol();
```
`listen`函数：
```js
listen(...args) {
    const server = http.createServer(this[_callback]());
    server.listen(...args);
}
```

## 5. 实现`_callback`方法
`_callback`方法作为创建 http 服务的回调函数，将返回一个拥有`req`和`res`参数的函数。
```js
[_callback]() {
    // 组合中间件
    const fn = this[_compose](this.middlewares);

    return (req, res) => {
        // 创建ctx
        const ctx = this[_createContext](req, res);
        // 执行fn
        return this[_handleRequest](ctx, fn);
    }
}
```

## 6. 核心代码：实现中间件原理（compose函数）
```js
 // 核心代码：组合中间件，实现next机制
[_compose](middleware) {
    // 数组类型判断
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
    }

    return (ctx, next) => {
        // 上一个执行的中间件
        let index = -1;
        // 首先执行第一个中间件
        return dispatch(0);

        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next()被多次调用'));
            index = i;
            // 当前执行的中间件
            let fn = middleware[i];
            if (i === middleware.length) fn = next
            if (!fn) return Promise.resolve()
            // 最终返回一个Promise对象
            try {
                // 按规范来说fn应该为一个Promise函数
                // 但为了兼容fn不是Promise函数的情况，就再用Promise包裹一层
                // 使用bind是为了让dispatch不执行，直接作为函数传入fn
                return Promise.resolve(
                    // 执行当前中间件
                    // 中间件的参数为(ctx, next)
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch (err) {
                return Promise.reject(err);
            }
        }

    }
}
```

## 7. 简单实现createContext和handleRequest函数
```js
[_createContext](req, res) {
    // 这里只写了很少的一部分
    const ctx = {
        req,
        res
    }
    ctx.method = req.method;
    ctx.url = req.url;
    return ctx;
}

[_handleRequest](ctx, fn) {
    // 简单实现
    return fn(ctx);
}
```

# 完整代码
```js
const http = require('http');

// 声明私有方法
const _compose = Symbol();
const _callback = Symbol();
const _createContext = Symbol();
const _handleRequest = Symbol();


class MiniKoa2 {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
        return this;    // 支持链式调用
    }

    listen(...args) {
        const server = http.createServer(this[_callback]());
        server.listen(...args);
    }

    [_callback]() {
        const fn = this[_compose](this.middlewares);

        return (req, res) => {
            const ctx = this[_createContext](req, res);
            return this[_handleRequest](ctx, fn);
        }
    }

    // 核心代码：组合中间件，实现next机制
    [_compose](middleware) {
        // 数组类型判断
        if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
        for (const fn of middleware) {
            if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
        }

        return (ctx, next) => {
            // 上一个执行的中间件
            let index = -1;
            // 首先执行第一个中间件
            return dispatch(0);

            function dispatch(i) {
                if (i <= index) return Promise.reject(new Error('next()被多次调用'));
                index = i;
                // 当前执行的中间件
                let fn = middleware[i];
                if (i === middleware.length) fn = next
                if (!fn) return Promise.resolve()
                // 最终返回一个Promise对象
                try {
                    // 按规范来说fn应该为一个Promise函数
                    // 但为了兼容fn不是Promise函数的情况，就再用Promise包裹一层
                    // 使用bind是为了让dispatch不执行，直接作为函数传入fn
                    return Promise.resolve(
                        // 执行当前中间件
                        // 中间件的参数为(ctx, next)
                        fn(ctx, dispatch.bind(null, i + 1))
                    )
                } catch (err) {
                    return Promise.reject(err);
                }
            }

        }
    }

    [_createContext](req, res) {
        const ctx = {
            req,
            res
        }
        ctx.method = req.method;
        ctx.url = req.url;
        return ctx;
    }

    [_handleRequest](ctx, fn) {
        return fn(ctx);
    }
}

module.exports = MiniKoa2;
```

# 测试
## 测试文件
```js
const app = require('./MiniKoa2')();

// logger
app.use(async (ctx, next) => {
    console.log('第一层洋葱 - 开始')
    await next();
    const rt = ctx['X-Response-Time'];
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    console.log('第一层洋葱 - 结束')
});

// x-response-time
app.use(async (ctx, next) => {
    console.log('第二层洋葱 - 开始')
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx['X-Response-Time'] = `${ms}ms`;
    console.log('第二层洋葱 - 结束')
});

// response
app.use(async ctx => {
    console.log('第三层洋葱 - 开始')
    ctx.res.end('hello koa');
    console.log('第三层洋葱 - 结束')
});

app.listen(8000, () => {
    console.log('server is listening at 8000');
});
```
## 测试结果
启动node服务，在浏览器中输入`http://localhost:8000/`。

可以看到浏览器中打印出`hello koa`。

控制台中打印出：
```
server is listening at 8000
第一层洋葱 - 开始
第二层洋葱 - 开始
第三层洋葱 - 开始
第三层洋葱 - 结束
第二层洋葱 - 结束
GET / - 7ms      
第一层洋葱 - 结束
```
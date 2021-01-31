# express中间件的简单实现
## 说明
本次的简单实现中实现了express的`use`，`get`，`post`，`listen`，`res.json`和中间件的`next`机制。

## 功能分析
回顾expess的使用：
1. 声明一个express实例
```js
   const app = require('express')
```
2. 在实例上调用方法`use`，`use`方法的参数是`一个路由+多个函数`，当然也可以不传路由，比如：
```js
    app.use(cookieParser());    // 只传函数

    app.use('/api/user', userRouter());     // 传路由+函数

    app.use('/api/demo', loginCheck(), handleDemo());   // 传路由+多个函数
```
3. 在实例上调用方法`get`，`get`方法参数形式与`use`相同，所不同的是只有当请求方法为`get`时，`app.get`中传入的函数才会被执行。

4. 在实例上调用方法`post`，`post`与`get`形式一样，只是请求方法变成了`post`。

5. 在实例上调用`listen`方法，用于启动`http`服务，通常，我们会给listen方法传入一个端口和一个方法：
```js
app.listen(5000, () => {
    console.log(`http is listening at 5000`);
})
```
也可以只传入一个端口：
```js
app.listen(5000)
```

6. 关于路由的处理：
   传路由时就相当于多了一层限制，只有当你指定的路由与请求的路由相同或者是请求的路由的前缀时，`app.use/get/post`中的函数才会被执行。

   就以`app.use`为例说明一下，
```js
app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next()
});

app.use('/api/user', (req, res, next) => {
    console.log('处理 /api/user 路由')
    next()
})
```
那么当请求的路由为`api/user`时，这两个方法都会被执行，最后打印出：
```
处理 /api 路由
处理 /api/user 路由
```

7. 另外还有很重要的一点是中间件的`next`机制。在上面的例子中，如果第一个`use`的方法里没写`next()`，那么路由处理到此为止，就不会再去找下一个函数了。就是说，当上面的例子变成：
```js
app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
});

app.use('/api/user', (req, res, next) => {
    console.log('处理 /api/user 路由')
    next()
})
```
那么，只会打印出：
```
处理 /api 路由
```

8. 最后就是在函数的`res`参数上，绑定了一个`json`方法，使用`res.json`，我们可以很方便的给前端返回一个`json`数据。
   
## 代码实现
下面来简单实现一下：
### 1. 初始化一个类并导出
首先声明一个类`MiniExpress`，这里直接用es6。最后导出一个工厂函数，这样我们在外部只需要调用这个函数（而不需要new）就可以得到一个实例。
```js
class MiniExpress {
}

module.exports = () => new MiniExpress();
```

### 2. 写构造方法
这里我们需要一个数组按顺序存放要处理的中间件：
```js
constructor() {
    this.routes = [];
}
```

### 3. 注册公有函数 `use`，`get` 和 `post`。
   在函数中，我们需要把函数中传入的所有中间件都放入到对应的数组中。
   
   由于传入的参数要兼容有路由的模式，因此写一个私有函数来处理参数。这里用`Symbol`来声明私有函数：
```js
const _register = Symbol();
```

然后实现`use`，`get`和`post`：

```js
use() {
    // 将当前函数中的所有参数展开传入_register函数中，
    // 经过_register函数处理后，函数中的所有参数都会被放进一个对象中，
    // 该对象的结构为：{ path: '', queue = [] } path中放路由，queue中放中间件（函数）
    const info = this[_register].apply(this, arguments);
    // 将处理后的对象放入this.routes中
     this.routes.push(info);
}

get() {
    const info = this[_register].apply(this, arguments);
    // 给info添加属性method，便于以后根据请求方法筛选中间件
    info.method = 'get';
    this.routes.push(info);
}

post() {
    const info = this[_register].apply(this, arguments);
    info.method = 'post';
    this.routes.push(info);
}
```
`_register`方法：
```js
 [_register](path) {
    const info = {}; // info有path和queue两个属性，其中path中放路由，queue中放中间件函数
    if (typeof path === 'string') {
        // 第一个参数为路由
        info.path = path;
        // 从第二个参数开始裁取参数数组（如果不是数组就转为数组），将结果存入 queue
        info.queue = Array.prototype.slice.call(arguments, 1);
    } else {
        // 没有传路由，则默认赋值为跟路由
        info.path = '/';
        // 将整个参数（转换为）数组存入 queue
        info.queue = Array.prototype.slice.call(arguments, 0);
    }
    // 返回保存了路由和中间件的对象
    return info;
}
```

经过上面的处理后，所有中间件就被收集了起来。接下来，开始创建`http`服务。并将请求与`http`服务连接起来。

### 4.写`listen`方法
在这个方法中，我们需要创建一个`http`服务，并把处理路由的回调函数传进去。这里创建一个私有函数`_callback`作为这个回调函数：
```js
const http = require('http');
const _callback = Symbol();
```

注册`listen`函数：
```js
listen(...args) {
    // 使用http的createServer方法注册一个http服务
    const server = http.createServer(this[_callback]());
    // 将所有参数展开传入listen函数中，参数中的第一项为端口
    server.listen(...args);
}
```
这里使用展开运算符的作用：

> 如果传入的参数是数组，那么直接展开，传入函数中
> 
> 如果传入的参数不是数组，那么先将所有参数都放入数组中，然后再将这个数组展开，传入函数中

### 5. 实现`_callback`方法
我们需要在这个函数中返回一个函数。在返回的函数中处理路由。给函数有`req`和`res`参数。

首先在`res`中注册一个`json`函数，用于给前端返回一个`json`字符串：
```js
 [_callback]() {
    return (req, res) => {
        res.json = data => {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(data));
        };
    }
}
```

然后根据请求方法和请求路由，把当前匹配到的所有路由放进一个数组中。这里举个例子进一步解释一下：

比如现在的请求方法是`get`，请求路由是`/api/user/info`。假设你的`express`是这么写的：
```js
const app = require('express')();

// 方法1
app.use((req, res, next) => {
    next();
});

// 方法2
app.get((req, res, next) => {
    next();
});

// 方法3
app.get('/api', (req, res, next) => {
    next();
});

// 方法4
app.get('/api/user/info', (req, res, next) => {
    next()
    res.json({
        errNo: 0,
        msg: 'get info success'
    });
});
```

在`express`中，这四个方法会依次执行，最后给前端返回一个json字符串。由此可以想到，在`express`的实现中，需要将这四个方法的参数统一收集起来。然后为参数中所有的中间件（函数），都实现`next`机制。而这些参数之前已经放进了一个对象中，并存入了各自的数组（`this.routes.all`，`this.routes.get`，`this.routes.post`）。

这里将收集中间件的方法命名为`__match`，将实现`next`机制的方法命名为`_handle`。这两个函数都是私有函数，因此首先：
```js
const _match = new Symbol();
const _handle = new Symbol();
```

然后将它们加入`_callback`函数中：
```js
 [_callback]() {
    return (req, res) => {
        res.json = data => {
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(data));
        };

        // 将req中的url和method拿出来
        const url = req.url;
        const method = req.method.toLowerCase();

        const resultList = this[_match](method, url);
        this[_handle](req, res, resultList);
    }
}
```


### 6. 实现`_match`方法
之前分析过了`_match`方法的作用就是根据请求方法和请求路由收集所有匹配到的中间件。这里路由的匹配是匹配前缀，在最开始分析路由处理的时候也讲到过。直接上代码：
```js
 [_match](method, url) {
    // 声明一个数组收集处理结果
    let queue = [];

    // 忽略获得网站图标的请求
    if (url === '/favicon.ico') {
        return queue;
    }

    // 声明一个中间变量，存储根据请求方法匹配后的结果
    let curRoutes = [];
    // 根据请求方法匹配，匹配app.use中的中间件时忽略请求方法
    this.routes.forEach(route => {
        if (!route.method || (route.method && route.method === method)) {
            curRoutes.push(route);
        }
    })

    // 根据请求的路由匹配，匹配到当前路由的前缀就加入queue
    curRoutes.forEach(routeInfo => {
        if (url.indexOf(routeInfo.path) === 0) {
            queue = queue.concat(routeInfo.queue);
        }
    })

    // 返回处理结果
    return queue;
}
```

### 7. 实现`_handle`方法
将所有匹配到的中间件收集起来之后，我们需要用`next`机制将他们联系起来。`next`机制刚开始的时候也有介绍，这里就不再重复说了。上代码：
```js
[_handle](req, res, queue) {
    const next = () => {
        // middleware赋值为队首，并将队首弹出
        // 这里的队列中存储的是所有匹配到的中间件
        const middleware = queue.shift();
        if (middleware) {
            // 进入下一个中间件
            middleware(req, res, next);
        }
    };
    next();
}
```

至此，所有分析结束，最后附上完整的代码：

## 完整代码
```js
const http = require('http');
const slice = Array.prototype.slice;

// 定义私有方法
const _register = Symbol();
const _match = Symbol();
const _callback = Symbol();
const _handle = Symbol();

class MiniExpress {
    constructor() {
        // 按顺序存放要处理的中间件
        this.routes = [];
    }

    use() {
        // 将当前函数中的所有参数展开传入_register函数中，
        // 经过_register函数处理后，函数中的所有参数都会被放进一个对象中，
        // 该对象的结构为：{ path: '', queue = [] } path中放路由，queue中放中间件（函数）
        const info = this[_register].apply(this, arguments);
        this.routes.push(info);
    }

    get() {
        const info = this[_register].apply(this, arguments);
        info.method = 'get';
        this.routes.push(info);
    }

    post() {
        const info = this[_register].apply(this, arguments);
        info.method = 'post';
        this.routes.push(info);
    }

    listen(...args) {
        const server = http.createServer(this[_callback]());
        server.listen(...args);
    }

    /**
     * 如果传入了路由则将路由和其他参数放进queue，
     * 否则，将路由赋值为跟路由，然后存入queue
     *
     * @param {*} path
     * @returns {object} path：路由，queue：其他参数(中间件)
     * @memberof MiniExpress
     */
    [_register](path) {
        const info = {}; // info有path和queue两个属性，其中path中放路由，queue中放中间件
        if (typeof path === 'string') {
            // 第一个参数为路由
            info.path = path;
            // 从第二个参数开始裁取参数数组（如果不是数组就转为数组），将结果存入 queue
            info.queue = slice.call(arguments, 1);
        } else {
            info.path = '/';
            // 将整个参数（转换为）数组存入 queue
            info.queue = slice.call(arguments, 0);
        }
        return info;
    }

    /**
    * http.createServer方法中的回调函数
    *
    * @returns {function}
    * @memberof MiniExpress
    */
    [_callback]() {
        return (req, res) => {
            res.json = data => {
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(data));
            };
            const url = req.url;
            const method = req.method.toLowerCase();

            const resultList = this[_match](method, url);
            this[_handle](req, res, resultList);
        }
    }

    [_match](method, url) {
        // 存放最终匹配成功的中间件
        let queue = [];

        // 忽略网站图标的请求
        if (url === '/favicon.ico') {
            return queue;
        }

        // 定义中间变量，存放方法匹配后的结果
        let curRoutes = [];

        // 匹配方法
        this.routes.forEach(route => {
            if (!route.method || (route.method && route.method === method)) {
                curRoutes.push(route);
            }
        })

        // 匹配路由（前缀）
        curRoutes.forEach(routeInfo => {
            if (url.indexOf(routeInfo.path) === 0) {
                queue = queue.concat(routeInfo.queue);
            }
        })
        return queue;
    }

    // next机制
    [_handle](req, res, queue) {
        const next = () => {
            // 第一个匹配的中间件
            const middleware = queue.shift();
            if (middleware) {
                // 执行中间件函数
                middleware(req, res, next);
            }
        };
        next();
    }
}

module.exports = () => {
    // 工厂函数
    return new MiniExpress()
}
```

## 测试
测试代码：
```js
const app = require('./MiniExpress')();

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url)
    next();
})

app.use((req, res, next) => {
    // 假设在处理 cookie
    console.log('处理 cookie ...')
    req.cookie = {
        userId: 'abc123'
    }
    next();
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api 路由')
    next();
})

app.get('/api', (req, res, next) => {
    console.log('get /api 路由')
    next();
})

// 模拟登录验证
function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log('模拟登录成功')
        next()
    }, 1000);
}

// 添加中间件
app.get('/api/user/info', loginCheck, (req, res, next) => {
    console.log('get /api/user/info')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.use((req, res, next) => {
    res.json({
        errno: 404,
        msg: 'not found'
    })
})

app.listen(5000, () => {
    console.log('server is running on port 5000')
})
```

## 测试结果
将这个代码运行起来，在浏览器中输入`http://localhost:5000/api/user/info`。可以看到控制台中会打印出：
```
server is running on port 5000
请求开始... GET /api/user/info
处理 cookie ...
处理 /api 路由
get /api 路由
模拟登录成功
get /api/user/info
```

浏览器中显示出一个json字符串：
```
{
    "errno": 0,
    "data": {
    "userId": "abc123"
    }
}
```

测试结束。

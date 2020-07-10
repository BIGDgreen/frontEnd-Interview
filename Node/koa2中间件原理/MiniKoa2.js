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
}

// 导出一个类
module.exports = MiniKoa2;

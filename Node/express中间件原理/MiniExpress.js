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
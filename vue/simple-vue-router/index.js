/*
 * @Author       : BigDgreen
 * @Date         : 2020-08-03 20:34:43
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-03 21:18:25
 * @FilePath     : \前端知识点总结\vue\simple-vue-router\index.js
 */

class historyRouter {
    constructor() {
        this.current = null;
    }
}

class vueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        this.routesMap = this.createMap(this.routes);
        this.history = new HistoryRouter();
        this.init();    // 初始化路由

    }
    init() {
        // history api不同
        if (this.mode === 'hash') {
            location.hash ? "" : location.hash = "/";
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1);
            });
            window.addEventListener("hashchange", () => {
                this.history.current = location.hash.slice(1);
            })
        }
    }
    // 转变options的数据结构
    createMap(routes) {
        return routes.reduce((memo, current) => {
            memo[current.path] = current.component;
            return memo;
        }, {});
    }
}

// 单例模式
// 作为静态属性
vueRouter.install = function (vm) {
    if (vueRouter.install.installed) return;
    vueRouter.install.installed = true;
    vm.mixin({
        // 让每个组件上都挂载main中的router
        beforeCreate() {
            // 根实例 -> app.vue -> 组件
            // this 指向当前组件
            if (this.$options && this.$options.router) {
                // 只有main.js中执行
                this._root = this;
                this._router = this.$options.router;
                // 利用vue内置方法完成current的数据绑定
                Vue.until.defineReactive(this, 'current', this._router.history);
            } else {
                this._root = this.$parent._root;
            }
            // 只有getter，没有setter
            // 变量权限思维
            Object.defineProperty(this, "$router", {
                get() {
                    return this._root._router;
                }
            })
            Object.defineProperty(this, "$route", {
                get() {
                    return this._root._router.history.current;
                }
            })
        }
    })

    vm.components('router-view', {
        // current变量一旦改变，就会重新渲染
        // 获取current，找到current对应的组件，并渲染
        render(h) {
            // 获取组件实例下的router
            let current = this._self._root._router.history.current;
            // 对应到组件
            let routerMap = this._self._root.routerMap;
            return h(routerMap[current]);
        }
    })
}

export default vueRouter
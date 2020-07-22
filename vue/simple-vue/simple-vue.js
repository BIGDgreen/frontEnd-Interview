const utils = {
    getValue(expr, vm) {
        // 触发getter
        // 此处可以优化，比如处理三目运算符
        return vm.$data[expr.trim()];
    },
    setValue(expr, vm, newValue) {
        // 触发setter
        vm.$data[expr] = newValue;
    },
    model(node, value, vm) {    // 当前节点，属性值，vue实例
        // 从data里面拿到初始值
        const initValue = this.getValue(value, vm);

        // 添加watcher
        new Watcher(value, vm, newValue => {
            // 值发生变化时执行
            this.modelUpdater(node, newValue);
        })

        // 监听input事件，通过setter改变 $data 中的 value
        node.addEventListener('input', e => {
            const newValue = e.target.value;
            this.setValue(value, vm, newValue);
        })

        this.modelUpdater(node, initValue);
    },
    text(node, value, vm) {
        let result;
        if (value.includes('{{')) {
            // {{ xxx }}
            result = value.replace(/\{\{(.+)\}\}/g, (...args) => {
                const expr = args[1]; // {{}} 中间的值
                new Watcher(expr, vm, (newVal) => {
                    this.textUpdater(node, newVal);
                })
                return this.getValue(expr, vm);
            })
        } else {
            // v-test = "xxx"
            result = this.getValue(value, vm);
        }

        this.textUpdater(node, result);
    },
    on(node, value, vm, eventName) {
        const fn = vm.$options.methods[value];  // 当前函数
        node.addEventListener(eventName, fn.bind(vm));
    },
    textUpdater(node, value) {
        // console.log(111, value);
        node.textContent = value;
    },
    modelUpdater(node, value) {
        node.value = value;
    }
}


class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = this._resolveData(options.data);
        this.$options = options;

        // 触发 this.$data.xxx 和模板的绑定
        new Observer(this.$data);

        // 处理模板部分，将模板中使用的 data 部分的变量与模板绑定起来
        new Compiler(this.$el, this);

        // 数据代理
        this.proxyData(this.$data);

    }

    // 将data中的数据代理到this上，使this.xx = this.$data.xx
    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newVal) {
                    data[key] = newVal;
                }
            })
        });
    }

    // 处理data类型
    _resolveData(data) {
        if (data && typeof data === 'object') {
            return data;
        }
        if (data && typeof data === 'function') {
            return data();
        }
    }
}

/**
 * 创建一个观察者，递归遍历，为$data中的每一个数据添加getter和setter
 * 最后和模板进行绑定
 */
class Observer {
    constructor(data) {
        this.observe(data);
    }

    observe(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key]);
            })
        }
    }

    defineReactive(obj, key, value) {
        this.observe(value);    // 递归处理，递归处理后value一定为非引用类型的值
        const dep = new Dep();
        Object.defineProperty(obj, key, {
            get: () => {
                // console.log("$data get", key, value);
                // get时收集当前数据的所有dom依赖
                const target = Dep.target;
                target && dep.addWatcher(target);   // 收集watcher
                return value;
            },
            set: (newVal) => {
                if (value === newVal) return;
                this.observe(newVal);   // 递归处理，因为newVal可能是一个对象
                // console.log("$data set", key, newVal);
                value = newVal;

                // set时，触发所有watcher更新
                dep.notify();
            }
        })
    }
}

class Compiler {
    // el: dom节点 vm：vue实例
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el); // 获取el dom节点
        this.vm = vm;

        // 将所有节点转化成文档片段，然后操作文档片段，这样节点变化就不会引起回流和重绘，而是在最后插入的时候一次性处理
        const fragment = this.compileFragment(this.el);
        // 编译文档片段
        this.compile(fragment);
        // 将dom节点重新放到el上，此时fragment被清空
        this.el.appendChild(fragment);
    }

    compileFragment(el) {
        // 创建一个文档片段
        const f = document.createDocumentFragment();
        let firstChild;
        // 把el上的所有节点插入文档片段
        while (firstChild = el.firstChild) {
            // append使el中的node转移到f中，最后会清空el中的childNodes
            f.appendChild(firstChild);
        }
        // console.dir(el);
        // console.dir(f);
        return f;
    }

    // 模板编译
    compile(fragment) {
        const childNodes = Array.from(fragment.childNodes); // 将类数组对象转化为数组
        // 另外说明： 去掉换行符节点的方式有手动打包压缩（webpack、gzip）、font-size设置为0 避免对样式的影响
        childNodes.forEach(childNode => {
            // console.log(childNode, childNode.nodeType);
            if (this.isElementNode(childNode)) {
                // 标签节点 h1 / input，读取属性，查看是否有 v- 开头的内容
                // console.log('标签节点', childNode);
                this.compileElement(childNode);
            } else if (this.isTextNode(childNode)) {
                // 内容文本节点 {{ msg }} 是否有双括号语法
                // console.log('文本节点', childNode);
                this.compileText(childNode);
            }
            if (childNode.childNodes && childNode.childNodes.length) {
                // 有子节点， dfs 递归处理
                this.compile(childNode);
            }
        })
    }

    // 判断属性 v- 和 @
    compileElement(node) {
        const attributes = Array.from(node.attributes);
        attributes.forEach(attr => {
            const { name, value } = attr;
            // console.log("attr::", name, value);
            if (this.isDirector(name)) {
                // v-model v-text v-bind 指令 v-on:click 方法
                const [, directive] = name.split('-');  // v-后面那部分
                const [compileKey, eventName] = directive.split(':');   // 事件部分
                // console.log(directive, value);
                utils[compileKey](node, value, this.vm, eventName);
            } else if (this.isEventName(name)) {
                const [, eventName] = name.split('@');
                utils['on'](node, value, this.vm, eventName);
            }
        }
        )
    }

    // 判断双括号 {{}}
    compileText(node) {
        const content = node.textContent;
        if (/\{\{(.+)\}\}/.test(content)) {
            // console.log("content::", content);
            utils['text'](node, content, this.vm);
        }
    }

    isEventName(name) {
        return name.startsWith('@');
    }

    isDirector(name) {
        return name.startsWith('v-');
    }

    // 判断文本节点
    isTextNode(el) {
        return el.nodeType === 3;
    }

    // 判断element节点
    isElementNode(el) {
        return el.nodeType === 1;
    }
}

// 与node节点绑定
// 一个 DOM 节点的依赖及更新
// 观察者
class Watcher {
    // 收集dom依赖
    constructor(expr, vm, cb) {
        this.expr = expr;
        this.vm = vm;
        this.cb = cb;
        // 通过 getter 对数据进行绑定，标记当前watcher
        this.oldValue = this.getOldValue();
    }

    getOldValue() {
        // this指向当前watcher实例
        Dep.target = this;
        // 触发getter，通过getter获取当前依赖（addWatcher）
        const oldValue = utils.getValue(this.expr, this.vm);
        // 释放target，防止重复添加watcher
        Dep.target = null;
        return oldValue;
    }

    update() {
        const newValue = utils.getValue(this.expr, this.vm);
        if (newValue !== this.oldValue) {
            this.cb(newValue);
        }
    }
}

// 被观察者
class Dep {
    // 一个数据 -> 多个watcher
    constructor() {
        this.collect = [];
    }

    addWatcher(watcher) {
        this.collect.push(watcher);
    }

    notify() {
        console.log('notify');
        this.collect.forEach(w => w.update());
    }
}

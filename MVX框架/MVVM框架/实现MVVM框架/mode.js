/**
 * 发布-订阅
 *
 * @class Dep
 */
class Dep {
    constructor() {
        this.subs = [];
    }

    // 添加订阅者，（订阅者都有update属性）
    addSub(sub) {
        this.subs.push(sub);
    }

    // 发布，通知每一个订阅者，执行update函数
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}

/**
 *Watcher的实例都拥有update方法
 *
 * @class Watcher
 */
class Watcher {
    constructor(fn) {
        this.fn = fn;
    }

    // 执行fn
    update() {
        this.fn();
    }
}

// const watcher = new Watcher(() => {
//     console.log(1);
// });

// const dep = new Dep();
// dep.addSub(watcher);
// dep.addSub(watcher);
// dep.notify();


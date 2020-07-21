const PENDING = 'pending';
const RESOLVED = 'fulfilled';
const REJECTED = 'rejected';

// x可能是普通值或promise
// 因为所有的promise都遵循这个规范，这个写法应该兼容所有的promise
const resolvePromise = (promise2, x, resolve, reject) => {
    // x与promise2不能相同，否则会造成循环引用
    if (x === promise2) {
        return reject(new TypeError('Chain cycle detected for promise #<Promise>'));
    }
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        let called = false; // 防止多次调用成功或失败
        try {
            let then = x.then;
            if (typeof then === 'function') {
                // 当前有then方法，认为他是promise
                then.call(x, y => { // 能保证不用再次取then的值
                    if (called) return;
                    called = true;
                    // y可能还是一个promise，因此要用递归，直接解析出来的结果是一个普通值
                    resolvePromise(promise2, y, resolve, reject); // 采用promise的成功结果将值向下传递
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);  // 采用promise的失败结果
                });
            } else {
                // x是普通对象
                resolve(x);
            }
        } catch (e) {
            // 取返回结果then时报错
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        // x 是一个普通值，直接让promise2成功
        resolve(x);
    }
}

class miniPromise {
    constructor(executor) {
        this.status = PENDING;    // 默认为等待态
        this.value = undefined;     // 成功值
        this.reason = undefined;    // 失败原因

        this.onResolvedCallbacks = [];  // 成功回调的数组
        this.onRejectedCallbacks = [];   // 失败回调的数组

        // 成功函数
        let resolve = (value) => {
            // resolve和reject只能调一个
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn => fn());   // 发布
            }
        }
        // 失败函数
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            // 执行器立刻执行
            executor(resolve, reject);
        } catch (e) {
            console.log(e);
            reject(e);  // 执行时发生错误等价于调用reject方法
        }
    }

    // 每个promise实例上都有
    // then方法是异步的
    then(onfulfilled, onrejected) {
        // onfulfilled 和 onrejected 是可选参数
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data;
        onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err };

        let promise2 = new miniPromise((resolve, reject) => {
            // 加定时器是为了让代码正常执行，保证promise2已经new完
            // 加try catch是为了正常捕获异步错误
            const handleRes = (fn, type) => {
                setTimeout(() => {
                    try {
                        let val = type ? this.value : this.reason;  // 辨别成功回调和失败回调
                        let x = fn(val);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            // 同步情况
            if (this.status === RESOLVED) {
                handleRes(onfulfilled, 1);
            } else if (this.status === REJECTED) {
                handleRes(onrejected, 0);
            }
            // 异步情况 
            else if (this.status === PENDING) {
                // 将回调函数都存起来，等状态改变后依次执行
                // 如果是异步，先订阅
                this.onResolvedCallbacks.push(() => {
                    // todo...
                    handleRes(onfulfilled, 1);
                });
                this.onRejectedCallbacks.push(() => {
                    handleRes(onrejected, 0);
                })
            };
        })

        return promise2; // 返回一个promise，实现链式调用
    }

}

// 测试
miniPromise.defer = miniPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new miniPromise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = miniPromise

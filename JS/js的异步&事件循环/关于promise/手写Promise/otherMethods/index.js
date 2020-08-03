let miniPromise = require('../promise');

const isPromise = (value) => {
    if (value && typeof value === 'object' && value !== null || typeof value === 'function') {
        if (value.then && typeof value.then === 'function') {
            return true
        }
    }
    return false
}

//resolve方法
miniPromise.resolve = function (val) {
    return new miniPromise((resolve, reject) => {
        resolve(val)
    });
}

//reject方法
miniPromise.reject = function (val) {
    return new miniPromise((resolve, reject) => {
        reject(val)
    });
}

//race方法 
miniPromise.race = function (promises) {
    return new miniPromise((resolve, reject) => {
        for (let i = 0, len = promises.length; i < len; i++) {
            let current = promises[i];
            if (isPromise(current)) {
                current.then(data => {
                    resolve(data);
                }, reject);
            } else {
                resolve(current);
            }
        };
    })
}

// Promise.all 全部 等待所有异步执行完后，拿到统一的结果
// 解决异步并发，同步处理结果
// 静态方法，全部成功即成功，有任何一个失败即失败
miniPromise.all = function (promises) {
    let arr = [];
    let index = 0;  // 解决多个异步并发问题，使用计数器

    function processData(key, value) {
        arr[key] = value;
        if (++index === promises.length) {
            // 函数全部执行完成
            resolve(arr);
        }
    }

    return new miniPromise((resolve, reject) => {
        for (let i = 0, len = promises.length; i < len; i++) {
            let current = promises[i];
            if (isPromise(current)) {
                current.then(data => {
                    processData(i, data);
                }, reject)
            } else {
                processData(i, current);
            }
        }
    })
}

// finally函数供实例调用
miniPromise.prototype.finally = function (callback) {
    return this.then(data => {
        // finally传入的函数 无论成功或失败都会执行
        // 如果成功，将成功结果传给下一个promise
        return miniPromise.resolve(callback()).then(() => data);
    }, err => {
        return miniPromise.resolve(callback()).then(() => {
            throw err;  // 如果失败，将失败结果传给下一个promise
        });
    })
}

module.exports = miniPromise

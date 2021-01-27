/*
 * @Author       : BigDgreen
 * @Date         : 2020-08-04 11:03:38
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-09 15:10:28
 * @FilePath     : \前端知识点总结\手写系列\节流和防抖\throttle.js
 */
/**
 * 函数节流
 * 用户触发事件后，开始计时，之后每隔一段固定的时间，执行一次程序
 * @param {function} fn
 * @param {number} interval
 */
const throttle = function (fn, interval = 17) {
    let timer,  // 计时器
        firstTime = true;   // 是否是第一次调用

    return (...args) => {
        if (firstTime) {
            // 第一次调用，不用延迟执行
            // 直接执行fn
            fn.apply(this, args);
            return firstTime = false;   // 赋值操作符返回被赋的值，在这里返回false
        }
        if (timer) { // 定时器还在，说明上一次延迟还没有执行完成
            return false;
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(this, args);
        }, interval);
    }
}

// 测试
window.onresize = (throttle(function () {
    console.log(new Date());
}, 1000));

async function call() {
    return 1;
}
async function fn() {
    let a = call();
    let b = await call();
    console.log(a, b)
}
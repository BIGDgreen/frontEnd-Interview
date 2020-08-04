/*
 * @Author       : BigDgreen
 * @Date         : 2020-08-04 11:03:38
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-04 11:42:40
 * @FilePath     : \前端知识点总结\手写系列\节流和防抖\throttle.js
 */
/**
 * 函数节流
 * @param {function} fn 
 * @param {number} interval 
 */
const throttle = function (fn, interval = 17) {
    const _self = fn;   // 保存要调用的函数的引用
    let timer,  // 计时器
        firstTime = true;   // 是否是第一次调用

    return (...args) => {
        if (firstTime) {
            // 第一次调用，不用延迟执行
            // 直接执行fn
            _self.apply(this, args);
            return firstTime = false;   // 赋值操作符返回被赋的值，在这里返回false
        }
        if (timer) { // 定时器还在，说明上一次延迟还没有执行完成
            return false;
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            _self.apply(this, args);
        }, interval);
    }
}

// 测试
window.onresize = (throttle(function () {
    console.log(new Date());
}, 1000));
/*
 * @Author       : BigDgreen
 * @Date         : 2020-08-04 11:31:12
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-04 11:48:24
 * @FilePath     : \前端知识点总结\手写系列\节流和防抖\debounce.js
 */
/**
 * 函数防抖
 * 利用定时器，如果在规定时间内再次触发事件会将上次的定时器清除，即不会执行函数并重新设置一个新的定时器，直到超过规定时间自动触发定时器中的函数
 * @param {function} fn 
 * @param {number} interval 
 * @param {boolean} immediate 是否立即执行
 */
const debounce = function (fn, interval = 17, immediate = true) {
    let timer;
    return (...args) => {
        timer && clearTimeout(timer);    // 先清除计时器
        const callNow = immediate && !timer;    // 立即调用，且计时器不存在，说明是第一次调用
        if (callNow) fn.apply(this, args);  // 第一次触发，且immediate为true
        timer = setTimeout(() => {
            timer = null;   // 成功调用后清除计时器
            if (!immediate) fn.apply(this, args);   // 不立即执行时调用
        }, interval);
    }
}

// 测试
window.onresize = (debounce(function () {
    console.log(new Date());
}, 1000));
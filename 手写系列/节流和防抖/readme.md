<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-21 09:50:44
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-04 11:42:18
 * @FilePath     : \前端知识点总结\手写系列\节流和防抖\readme.md
-->
[一个合格的中级前端工程师需要掌握的 28 个 JavaScript 技巧](https://juejin.im/post/5cef46226fb9a07eaf2b7516#heading-0)

节流和单例模式：https://juejin.im/post/6844903775329583112#heading-29
# 函数的节流和防抖
## 使用场景
某个事件频繁发生。例如：
- 频繁向后台发送数据
- 浏览器事件：`window.onresize`、`mousemove`等

## 函数节流和防抖的区别
防抖：用户触发事件后，程序在一段固定的时间之后执行。这时，如果用户又触发了一次事件，则重新计时。

节流：用户触发事件后，开始计时，之后每隔一段固定的时间，执行一次程序

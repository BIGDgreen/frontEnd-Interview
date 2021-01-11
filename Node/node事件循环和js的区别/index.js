/*
 * @Author       : BigDgreen
 * @Date         : 2021-01-08 16:39:09
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2021-01-08 16:39:09
 * @FilePath     : \前端知识点总结\Node\node事件循环和js的区别\index.js
 */
setTimeout(() => {
 console.log('timer1')

 Promise.resolve().then(function() {
   console.log('promise1')
 })
}, 0)

process.nextTick(() => {
 console.log('nextTick')
 process.nextTick(() => {
   console.log('nextTick')
   process.nextTick(() => {
     console.log('nextTick')
     process.nextTick(() => {
       console.log('nextTick')
     })
   })
 })
})
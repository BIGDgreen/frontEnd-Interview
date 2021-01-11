<!--
 * @Author       : BigDgreen
 * @Date         : 2020-07-13 20:44:02
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2021-01-08 16:42:39
 * @FilePath     : \前端知识点总结\Node\node事件循环和js的区别\readme.md
-->
# js事件循环
这里推荐b站上的一个两分钟视频：[2分钟了解 JavaScript Event Loop | 面试必备](https://www.bilibili.com/video/BV1kf4y1U7Ln)。UP主语速较快，如果没看懂可以多看两遍。

另外要补充的是，对于ES8的语法`async`/`await`，`await`创建一个`Promise`，`async`函数中剩下的内容进入`Promise`的`then`回调中。

## 在73以下版本和73版本的区别
谷歌（金丝雀）73版本中

使用对PromiseResolve的调用来更改await的语义，以减少在公共awaitPromise情况下的转换次数。

如果传递给 await 的值已经是一个 Promise，那么这种优化避免了再次创建 Promise 包装器，在这种情况下，我们从最少三个 microtick 到只有一个 microtick。

![](https://s1.ax1x.com/2020/07/18/U2d2Oe.png)

从任务调度的角度讲，node更省时


Node 11.x + 有变化

Node的Event loop一共分为6个阶段，每个细节具体如下：

1. `timers`: 执行setTimeout和setInterval中到期的callback。
2. `pending callback (I/O)`: 上一轮循环中少数的callback会放在这一阶段执行。
3. `idle, prepare`: 仅在内部使用。
4. `poll`: 最重要的阶段，执行pending callback，在适当的情况下回阻塞在这个阶段。
    这一阶段中，系统会做两件事情

    - 回到 timer 阶段执行回调
    - 执行 I/O 回调

    并且在进入该阶段时如果没有设定了 timer 的话，会发生以下两件事情

    - 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者达到系统限制
    - 如果 poll 队列为空时，会有两件事发生
        - 如果有 setImmediate 回调需要执行，poll 阶段会停止并且进入到 check 阶段执行回调
        - 如果没有 setImmediate 回调需要执行，会等待回调被加入到队列中并立即执行回调，这里同样会有个超时时间设置防止一直等待下去

    当然设定了 timer 的话且 poll 队列为空，则会判断是否有 timer 超时，如果有的话会回到 timer 阶段执行回调。

5. `check`: 执行setImmediate(setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行setImmediate指定的回调函数)的callback。
6. `close callbacks`: 执行close事件的callback，例如socket.on('close'[,fn])或者http.server.on('close, fn)。

## process.nextTick
Node 中的 `process.nextTick` 是独立于 `Event Loop` 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 `nextTick` 队列，就会清空队列中的所有回调函数，并且优先于其他 `microtask` 执行。

```js
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
```

执行结果：先打印全部的 `nextTick` 。
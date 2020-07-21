## async、await的四个要点
1. `await`后面可以追加`promise`对象，获得`promise`中`resolve`的值
2. `await`必须包裹在`async`函数里
3. `async`函数执行返回的结果也是一个`promise`对象
4. `try-catch`截获`promise`中`reject`的值

# js事件循环
这里推荐b站上的一个两分钟视频：[2分钟了解 JavaScript Event Loop | 面试必备](https://www.bilibili.com/video/BV1kf4y1U7Ln)。UP主语速较快，如果没看懂可以多看两遍。

另外要补充的是，对于ES8的语法`async`/`await`，`await`创建一个`Promise`，`async`函数中剩下的内容进入`Promise`的`then`回调中。

## 在73以下版本和73版本的区别
谷歌（金丝雀）73版本中

使用对PromiseResolve的调用来更改await的语义，以减少在公共awaitPromise情况下的转换次数。

如果传递给 await 的值已经是一个 Promise，那么这种优化避免了再次创建 Promise 包装器，在这种情况下，我们从最少三个 microtick 到只有一个 microtick。

# 如何识别微任务和宏任务
微任务：Promise > MutationObserver

宏任务：MessageChannel > setTimeout


setTimeout 最小延时 >= 4ms
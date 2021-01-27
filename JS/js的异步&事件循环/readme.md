# Ajax（Asynchronous JavaScript +  XML）
ajax通过使用`XMLHttpRequest`来与服务端通信，通信内容的格式可以是`JSON`、`XML`、`HTML`和文本文件。

ajax带来的最大的好处：网页应用能够快速地将增量更新呈现在用户界面上，而 **不需要重载（刷新）** 整个页面。这使得程序能够更快地回应用户的操作。

## 原生Ajax
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState == 4) {
    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304>) {
      console.log(xhr.responseText);    // 文本字符
      console.log(xhr.responseXML);    // XMLDocument对象
    } else {
      console.error('error:::', xhr.status);
    }
  }
};
xhr.open("get", "demo.txt", true);  // 遵循同源策略，第三个参数表示是否异步，默认为true
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
```

**注意点：**
1. `send()`方法接收一个参数，作为请求主体发送的数据。如果不需要发送数据最好传入`null`，因为参数对有些浏览器来说是必须的
2. 必须在调用`open()`之前指定`onreadystatechange`事件处理程序才能确保跨浏览器 兼容性
3. 要成功发送请求头部信息，必须在调用`open()`方法之后且调用`send()`方法之前调用`setRequestHeader()`
4. 如果不设置响应头 `Cache-Control: no-cache` 浏览器将会把响应缓存下来而且再也无法重新提交请求。可以添加一个总是不同的 GET 参数，比如时间戳或者随机数
5. 使用 POST 时，需要设置请求的MIME类型，如
   ```js
   httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   ```
   除此，`Content-Type`还可以设置为`multipart/form-data`、`application/json`、`text/xml`。

**四种`readyState`：**
- 0 (uninitialized)：请求还没有初始化
- 1 (loading): 服务端连接已建立
- 2 (loaded)： 请求已成功被服务端接收
- 3 (interactive)： 请求正在被处理
- 4 (complete)：请求完成，响应就绪

## 使用回调函数存在的问题
1. 回调地狱

缺点：本身无法终止异步。

回调地狱的缺点：
- 代码臃肿。
- 可读性差。
- 耦合度过高，可维护性差。
- 代码复用性差。
- 容易滋生 bug。
- 只能在回调里处理异常。

另外，回调函数还存在几个缺点：
2. 不能使用 `try catch` 捕获错误
3. 不能直接 `return`

回调地狱可以通过 `Generator` 或 `Promise` 解决。
# Generator
`Generator` 函数返回一个迭代器。

解决回调地狱：
```js
function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```
# Promise
Promise 是一个对象，它代表了一个异步操作的最终完成或者失败，以及它的返回结果。
## promise的特点
- 有三种状态：`pending`、`fulfilled`、`rejected`，通过`resolve`和`reject`更改，另外，如果`executor`中出现错误，`promise`状态会直接变为`rejected`
- 传递到 `then()` 中的函数被置入了一个微任务队列，而不是立即执行，这意味着它是在 JavaScript 事件队列的所有运行时结束了，事件队列被清空之后，才开始执行。
- 即使异步操作已经完成（成功或失败），在这之后通过 `then()` 添加的回调函数也会被调用。
- 通过多次调用 `then()` 可以添加多个回调函数，它们会按照插入顺序执行，及链式调用。
- `then()`和`catch`函数会返回一个新的Promise，因此可以链式调用。
- 使用`catch()`捕捉上一个Promise的错误，对接下来的`then()`操作无影响。
- 错误传递：一遇到异常抛出，浏览器就会顺着`promise`链寻找下一个 `onRejected` 失败回调函数或者由 `.catch()` 指定的回调函数。

## Promise上挂载的方法
以下函数中的`iterable`通常为一个`promise`数组。
1. `Promise.all(iterable)`

   这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合。
2. `Promise.allSettled(iterable)`

   等到所有promises都完成（每个promise返回成功或失败）。
   
   返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。
3. `Promise.any(iterable)`

   接收一个Promise对象的集合，当其中的一个promise 成功，就返回那个成功的promise的值。
4. `Promise.race(iterable)`

   当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。
6. `Promise.reject(reason)`
   
   返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法
7. `Promise.resolve(value)`
   
   返回一个状态由给定value决定的Promise对象。如果该值是thenable(即，带有then方法的对象)，返回的Promise对象的最终状态由then方法执行决定；否则的话(该value为空，基本类型或者不带then方法的对象),返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。通常而言，如果你不知道一个值是否是Promise对象，使用Promise.resolve(value) 来返回一个Promise对象,这样就能将该value以Promise对象形式使用。

## Promise.prototype上挂载的方法
原型上挂载的方法可以供实例调用，在这里就是`new Promise`。 
1. `Promise.prototype.catch(onRejected)`
   
   添加一个拒绝(rejection) 回调到当前 promise, 返回一个新的promise。当这个回调函数被调用，新 promise 将以它的返回值来resolve，否则如果当前promise 进入fulfilled状态，则以当前promise的完成结果作为新promise的完成结果。
2. `Promise.prototype.then(onFulfilled, onRejected)`
   
   添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来resolve。
3. `Promise.prototype.finally(onFinally)`
   
   添加一个事件处理回调于当前promise对象，并且在原promise对象解析完毕后，返回一个新的promise对象。回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成(fulfilled)还是失败(rejected)。

关于 Promise 的实现，可以在这里看代码：[手写一个简单的Promise](https://github.com/BIGDgreen/frontEnd-Interview/tree/master/%E6%89%8B%E5%86%99%E7%B3%BB%E5%88%97/Promise)

# async、await
## 特点
1. `await`后面可以追加`promise`对象，获得`promise`中`resolve`的值，如果等待的不是 `Promise` 对象，则返回该值本身
2. `await`必须包裹在`async`函数里，如果在异步函数外使用它，会抛出语法错误
3. `async`函数执行返回的结果也是一个`Promise`对象，如果`async`函数的返回值不是一个标准意义上的`promise`对象，那它（该返回）一定是包裹在了一个`promise`对象里面
4. `async` 函数的返回值将被隐式地传递给 `Promise.resolve`
5. `try-catch`可以截获`promise`中`reject`的值
6. 在`async`函数中有多个`await`时，`await`中的函数顺序执行，上一个执行完毕后，下一个才会执行。如果想要并行执行，可以使用`await Promise.all([job1(), job2()])`，例如：
   ```js
    var parallel = async function() {
        console.log('==PARALLEL with await Promise.all==');
        
        // Start 2 "jobs" in parallel and wait for both of them to complete
        await Promise.all([
            (async()=>console.log(await job1()))(),
            (async()=>console.log(await job2()))()
        ]);
    }
   ```
   
## async、await和promise的对比
- 在错误处理方面，async函数更容易捕获异常错误
- `async/await`能够使得代码调试更简单，`async/await`中的错误栈会指向错误所在的函数
- `async/await`让异步代码的写法更接近与同步写法，使代码结构更清晰

# js事件循环 —— js异步运行机制
异步函数是指通过事件循环异步执行的函数。

这里推荐b站上的一个两分钟视频：[2分钟了解 JavaScript Event Loop](https://www.bilibili.com/video/BV1kf4y1U7Ln)。UP主语速较快，如果没看懂可以多看两遍。

另外要补充的是，对于ES8的语法`async`/`await`，`await`创建一个`Promise`，`async`函数中剩下的内容进入`Promise`的`then`回调中。

## 常见微任务
- promise
- process.nextTick（node中使用）
- MutationObserver

## 常见宏任务
- script
- setTimeout/setInterval
- setImmediate
- I/O
- UI rendering

顺便提一下，`setTimeout 最小延时 >= 4ms`。

## 在73以下版本和73版本的区别
谷歌（金丝雀）73版本中

使用对`PromiseResolve`的调用来更改`await`的语义，以减少在公共`awaitPromise`情况下的转换次数。

如果传递给 `await` 的值已经是一个 `Promise`，那么这种优化避免了再次创建 `Promise` 包装器，在这种情况下，我们从最少三个 `microtick` 到只有一个 `microtick`。


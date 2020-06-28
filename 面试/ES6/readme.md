# es6新特性
let、const 块作用域 箭头函数、参数展开、剩余参数、Promise、解构赋值、Set和Map、weakSet和weakMap、Symbol（唯一）
async、await（ES8）
# 箭头函数与普通函数的区别
箭头函数：
1. 更简洁的语法
2. 没有this
3. 不能使用new构造函数，无法调用call、apply绑定this，没有原型属性
4. 不绑定arguments，用rest参数...解决
5. 捕获其所在上下文的 this 值，作为自己的 this 值
6. 不能简单返回对象字面量，需要用小括号包起来
7. 箭头函数不能当做Generator函数,不能使用yield关键字

## 关于箭头函数中的this
箭头函数本身没有this，箭头函数中的this取决于包裹箭头函数的第一个普通函数的this。

# Map、Set、weakMap、weakSet与垃圾回收机制
Set：类似数组，成员值唯一，常用于数组去重

weakSet：成员只能是对象，对象都是弱引用（垃圾回收机制不考虑 WeakSet 对该对象的引用），不可遍历

Map：类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

weakMap：只接受对象作为键名（不接受null），WeakMap的键名所指向的对象，不计入垃圾回收机制
# 关于异步
## 什么是Promise
Promise 是异步编程的一种解决方案：从语法上讲，promise是一个对象，从它可以获取异步操作的消息；从本意上讲，它是承诺，承诺它过一段时间会给你一个结果。promise有三种状态：pending(等待态)，fulfiled(成功态)，rejected(失败态)；状态一旦改变，就不会再变。创造promise实例后，它会立即执行。

Promise可以解决回调地狱，支持并发请求。
## 手写promise实现思路
1. 写一个Promise类，构造函数接受一个executor参数，在构造函数里面添加属性status(状态pending、resolved、rejected)、onResolvedCallBacks(存放成功回调的数组)、onRejectedCallBacks（存放失败回调的数组）、data（成功得到的数据），reason（失败的原因）。定义成功函数和失败函数，在对应的函数中判断status并给其他属性赋值。最后使用try catch立即执行函数executor，try中将成功函数和失败函数作为参数传入executor，catch中就直接reject。

2. 在类中添加then函数，接受成功回调和失败回调两个参数，利用setTimeout创建异步，如果then是一个Promise，则继续递归Promise，否则直接成功，如果捕捉到错误，就reject失败。

代码太长了，感兴趣的可以去[github](https://github.com/BIGDgreen/frontEnd-Interview/blob/master/%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81/%E5%AE%9E%E7%8E%B0promise/promise.js)上看看。

## 如何中断一个promise
抛出异常、Promise.reject()、返回“pending”状态的Promise对象、写一个立即结束的函数然后利用race

## async、await
将异步代码真正变成同步的样子。

async 函数返回一个 Promise 对象，如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。如果没有返回值，就返回 Promise.resolve(undefined)。

await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）

要捕捉错误，用try catch，要请求并发，用Promise.all

想具体了解，可以查看这篇文章：[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

# Proxy

# ES7和ES8的新特性
ES7：ES7在ES6的基础上添加三项内容：求幂运算符（**）、Array.prototype.includes()方法、函数作用域中严格模式的变更。

ES8：async、await、Object.values()、字符串填充padStart()、padEnd()

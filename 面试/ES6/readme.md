<!--
 * @Author       : BigDgreen
 * @Date         : 2020-06-28 17:27:19
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-12 08:47:06
 * @FilePath     : \前端知识点总结\面试\ES6\readme.md
--> 
# es6新特性
- let、const 块作用域

- 箭头函数

- 参数展开展开、剩余参数、解构赋值、函数默认值

- Promise、async、await（ES8）

- Set和Map、weakSet和weakMap

- Symbol（唯一）

- 方法简写：es6允许当一个对象的属性的值是一个函数（即是一个方法）

- for ... of循环

- ES6 Module

- Proxy：可以在目标对象前架设一个拦截器,他人访问对象,必须先经过这层拦截器。Proxy一般和Reflect配套使用,前者拦截对象,后者返回拦截的结果,Proxy上有的的拦截方法Reflect都有。
  
# let var const的区别
`var`声明的变量存在声明提升，一开始被赋值为`undefined`。
`let`和`const`：有块级作用域，存在暂时性死区。
- `let/const`在进入块级作用域后，会因为提升的原因先创建，但不会被初始化（不能访问），直到声明语句执行的时候才被初始化，初始化的时候如果使用`let`声明的变量没有赋值，则会默认赋值为`undefined`，而`const`必须在初始化的时候赋值。而创建到初始化之间的代码片段就形成了暂时性死区。
- `const`声明变量时必须赋值，否则会报错，同样使用const声明的变量被修改了也会报错。
- `const`声明变量不能改变，如果声明的是一个引用类型，则不能改变它的**内存地址**

# iterator迭代器
对于可迭代的数据解构，ES6在内部部署了一个`[Symbol.iterator]`属性，它是一个函数，执行后会返回`iterator`对象（也叫迭代器对象），而生成iterator对象`[Symbol.iterator]`属性叫`iterator`接口,有这个接口的数据结构即被视为可迭代的。

`iterator`迭代器是一个对象，它具有一个`next`方法。

next方法返回又会返回一个对象，有`value`和`done`两个属性，value即每次迭代之后返回的值，而done表示是否还需要再次循环，可以看到当value为undefined时，done为true表示循环终止。

默认部署iterator接口的数据结构有以下几个，注意普通对象默认是没有iterator接口的（可以自己创建iterator接口让普通对象也可以迭代）

- Array
- Map
- Set
- String
- TypedArray（类数组）
- 函数的 arguments 对象
- NodeList 对象

# 解构
数组解构的原理其实是消耗数组的迭代器，把生成对象的value属性的值赋值给对应的变量。

# 箭头函数与普通函数的区别
箭头函数：
1. 更简洁的语法
2. 没有自己的this，无法调用call、apply绑定this。它的this是词法的，引用的是上下文的this
3. 没有prototype，不能使用 new 当成构造函数调用
4. 不绑定arguments，用rest参数...解决
5. 不能简单返回对象字面量，需要用小括号包起来
6. 箭头函数不能当做 Generator 函数,不能使用 yield 关键字

# Map和Object的区别
1. Object对象有原型， 也就是说他有默认的key值在对象上面， 除非我们使用Object.create(null)创建一个没有原型的对象；
2. 在Object对象中， 只能把String和Symbol作为key值， 但是在Map中，key值可以是任何基本类型(String, Number, Boolean, undefined, NaN….)，或者对象(Map, Set, Object, Function , Symbol , null….);
3. 通过Map中的size属性， 可以很方便地获取到Map长度， 要获取Object的长度， 只能用别的方法；
4. Map对象实例中数据的排序是根据用户push的顺序进行排序的， 而Object实例中key,value的顺序就是有些规律了，他们会先排数字开头的key值，然后才是字符串开头的key值。

# Map、Set、weakMap、weakSet与垃圾回收机制
Set：类似数组，成员值唯一，常用于数组去重

weakSet：成员只能是对象，对象都是弱引用（垃圾回收机制不考虑 WeakSet 对该对象的引用），不可遍历

Map：类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键

weakMap：只接受对象作为键名（不接受null），WeakMap的键名所指向的对象，不计入垃圾回收机制

# 关于异步
这部分内容在[js的异步&事件循环](https://github.com/BIGDgreen/frontEnd-Interview/tree/master/JS/js%E7%9A%84%E5%BC%82%E6%AD%A5%26%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF)中有详细介绍。
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


# ES7和ES8的新特性
ES7：ES7在ES6的基础上添加三项内容：求幂运算符（**）、Array.prototype.includes()方法、函数作用域中严格模式的变更。

ES8：async、await、Object.values()、字符串填充padStart()、padEnd()

# Proxy
`Proxy` 对象用于定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。

```js
const p = new Proxy(target, handler)
```
`target`：要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
`handler`：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。
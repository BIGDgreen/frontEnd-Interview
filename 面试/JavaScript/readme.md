# js为什么是单线程，有什么好处？
js最初被设计用在浏览器中，假如js是多线程的，当第一个线程上的js与第二个线程上的js同时对一个dom进行操作时，这个dom就不知道该执行哪个线程上的指令。
# js异步加载的方式
1.	使用async属性
2.	使用defer属性
3.	onload时动态添加script标签
# 执行上下文和调用栈

# Microtasks、Macrotasks（事件循环event loop、任务队列task queues）
常见macro-task：整体的script、setTimeout、setInterval

常见micro-task：promise、process.nextTick

js通过事件循环实现异步，具体过程为：
执行一个宏任务,过程中如果遇到微任务,就将其放到微任务的`事件队列`里，当前宏任务执行完成后,会查看微任务的`事件队列`,并将里面全部的微任务依次执行完。然后在执行一个宏任务，这样一直循环下去。
# 原型和原型链
![原型链](https://s1.ax1x.com/2020/07/12/U8S7P1.jpg)

函数的显式原型等于对象的隐式原型。

## 构造函数、原型、实例的关系
构造函数中有一个prototype指针指向原型，原型中也有一个constructor指针指向构造函数。实例中有一个内部属性__proto__指向原型。构造函数和实例间通过原型产生联系，他们本身没有直接的关联。

# prototype和__proto__的关系
所有的对象都拥有__proto__属性，它指向构造函数的prototype原型对象，最后指向Object.prototype(Object是一个原生函数，所有的对象都是Object的实例)。

所有的函数都同时拥有__proto__和prototype属性，函数的__proto__指向自己的函数实现，函数的prototype是一个对象，所以函数的prototype也有__proto__属性，指向Object.prototype。

Object.prototype.__proto__指向null（原型链的终点指向null）。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404201754207.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
## new的基本原理（当let fun = new Fun（）时发生了什么？）
1.	在构造函数内部声明了一个对象
2.	将构造函数的作用域赋给这个对象（`obj.__proto__ = Fun.prototype`）
3.	执行构造函数（给对象添加属性）
4.	返回这个对象

这里同时附上实现new的代码：

```js
// new的内部机制
 function Person() {
    this.name = "I'm from Person!"
  }
  let person = new Person()
  console.log(person);
  // new
  function myNew(Constructor) {
    let obj = {};
    obj.__proto__ = Constructor.prototype;
    obj.name = "I'm new!";
    return obj;
  }
  console.log(myNew(Person));
```

# 继承
知道了构造函数、原型、实例三者之间的关系后，可以试想一下，当一个构造函数的原型等于另一个对象实例时，会发生什么？对，此时就形成了一个链式连接，原型链。

可以结合这个图理解一下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404201440393.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
我们在查找一个对象的属性时，如果在对象本身身上没有找到，js就会沿着这个对象的原型链继续向上查找，直到找到这个属性。那如果一直查到了最顶部（最顶部对象的原型为null）都没有找到，就说明这个对象上没有这个属性。因此我们可以用继承来实现属性和函数的共享。 

继承也就是用原型链实现的，关于继承，常考es5和es6的继承（es5中组合继承，es6中extends）。具体在代码中的实现如下：

ES5：
```js
/**
 *es5继承 Student继承Person 组合继承
 */
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
Person.prototype.sayName = function() {
  console.log(this.name)
}
function Student(name, gender, grade) {
  Person.call(this, name, gender);
  this.grade = grade;
}
Student.prototype = new Person();
Student.prototype.constructor = Student;
const student = new Student('张三', '男', '大三');
student.sayName();
console.log(student);
```
ES6:
```js
/**
 * es6继承 Student继承Person
 */ 
class Person {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }
  sayName() {
    console.log(this.name);
  }
}
class Student extends Person {
  constructor(name, gender, grade) {
    super(name, gender);
    this.grade = grade;
  }
}
const student = new Student('张三', '男', '大三');
student.sayName();
console.log(student);
```


# js的8种数据类型
- Boolean
- Null
- Undefined
- Number
- String
- Symbol
- Object
- BigInt

# 基本类型和引用类型
基本类型：string、number、undefined、boolean、null、symbol

引用类型：Object、Array、Function、Date、RegExp、包装类型（Boolean、Number、String）

## 关于基本类型和引用类型的说明
基本类型：
1. 基本类型的访问是按值访问
2. 值不可变，只能通过新值接收
3. 基本类型的比较是值的比较
4. 基本类型存放在栈内存
  
引用类型：
1. 引用类型的访问是按引用访问
2. 引用类型值可变
3. 引用类型的比较是引用的比较
4. 引用类型的值是同时保存在占内存和堆内存中的对象
   引用类型的存储同时需要栈内存和堆内存。
   栈内存中存放变量的标识符和指向堆内存中该对象的地址，堆内存中存放实际对象

# 三种判断类型的方式
## typeof
用`typeof`会得到以下结果：
`bigint、undefined、number、string、object、function、boolean、symbol`

当他检测引用类型`array`和`object`时，得到的都是`object`。

**注意点：** `typeof null`会得到`object`，但`null`实际上是个基本类型。这是js遗留的一个bug。早期的js使用低位存储变量的类型信息，`000`开头表示对象，而`null`是全零，所以被错误地判断为`object`。

暂时性死区

## instanceof
`instanceof`用于检测引用类型，它可以区分出`array`和`object`。

其内部是通过原型链来实现的，右边变量的`prototype`在左边变量的原型链上即可。比如 `arr1 instanceof Array` ，他会在arr1的原型链上查找，这里只查找一层，`arr1.__proto__ == Array.prototype`，返回`true`。`instanceof`的具体实现机制见手写代码部分。

## Object.prototype.toString.call()
引擎内部

会得到以下结果：
- `[object Undefined]`
- `[object Null]`

- `[object Map]`
- `[object Set]`
- `[object Array]`
- `[object Object]`
- `[object Arguments]`
  
- `[object Boolean]`
- `[object Date]`
- `[object Number]`
- `[object String]`
- `[object Symbol]`
- `[object Error]`
- `[object RegExp]`
- `[object Function]`

# 深拷贝和浅拷贝，实现深拷贝
浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，所以当一个对象发生变化时，另一个对象随之改变；

深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象；

区别：浅拷贝只复制对象的第一层属性、深拷贝可以对对象的属性进行递归复制；

浅拷贝：
**1.普通版**：`Object.assign()`，只能拷贝原对象的可枚举的自身属性
**2.进阶版**：`Object.create(Object.getProtypeOf(obj), Object.getOwnPropertyDescriptors(obj))`，可以拷贝原对象上所有的特性，包括不可枚举的属性和原型

具体的实现：
**1. 简陋版：用json的内置方法：**
这种方法在业务中最常见。
```js
/**
 *json实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}
```
缺点：无法深拷贝正则、拷贝函数和循环引用

**2. 普通版：递归实现：**
```js
/**
 *递归实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(source) {
  if(typeof source !== "object") return source; // 浅拷贝
  let target = source instanceof Array ? [] : {};
  for(let key in source) {
    // 数组索引，对象键值
    target[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key];
  }
  return target;
}
```
**3. 终极版**

## Object.assign是深拷贝还是浅拷贝
浅拷贝

# 什么是事件委托（事件代理），事件委托有哪些优点？
事件委托就是将事件绑定到父元素上，根据事件的冒泡，当子元素处理事件时会自动触发父元素的事件。通过判断事件对象event的target可以找到时间实际发生的子元素。

优点：提高性能、动态监听。提高性能是因为减少了事件监听的数量，动态监听是指当增加一个子元素时，该子元素自动拥有父级元素上绑定的事件。

举例：最经典的就是ul和li标签的事件监听，比如我们在添加事件时候，采用事件委托机制，不会在li标签上直接添加，而是在ul父元素上添加。 

# 作用域、作用域链
js没有块作用域，只有函数作用域。函数内部的函数可以访问到外函数中的变量，他们都可以访问到全局作用域中的变量，全局执行环境的变量对象始终是作用域链中的最后一个对象。es6中的let、const可以达到块级作用域的效果。

# 提升
js存在变量提升。变量提升包括函数声明提升和变量声明提升，函数声明提升优先于变量声明提升，函数表达式不提升。要点就这些，具体的可以看我的博客：[关于JavaScript中的声明提升](https://blog.csdn.net/qq_42532128/article/details/104391734)

# 闭包
## 什么是闭包
一个持有外部环境变量的函数就是闭包
## 哪些地方用到了闭包
setTimeout、回调函数、封装私有变量、柯里化
## 闭包的缺陷
内存泄漏，博客：[关于JavaScript的内存泄漏](https://blog.csdn.net/qq_42532128/article/details/105019459)
# this指向
普通函数，this指向调用它的对象
普通函数改变this指向：bind、apply、call

箭头函数，this指向函数本身
# bind、call和apply
相同点：都可以改变this指向

区别：

 1. bind不调用函数，返回一个新的函数，只有一个参数，指明this的指向
 2. call会直接调用函数，call只有一个参数，指明this的指向
 3. apply有两个参数，第二个参数一般为数组，apply将数组展开传给函数

# 用apply实现一个bind


# 函数的防抖和节流
目的：防止在事件持续触发的过程中频繁执行函数。

防抖，指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。防抖函数分为非立即执行版和立即执行版。
```js
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) {
  let timeout;
  return function () {
      let context = this;
      let args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
          var callNow = !timeout;
          timeout = setTimeout(() => {
              timeout = null;
          }, wait)
          if (callNow) func.apply(context, args)
      }
      else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
  }
}
```

节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。
对于节流，一般有两种方式可以实现，分别是时间戳版和定时器版。

```js
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait ,type) {
    if(type===1){
        let previous = 0;
    }else if(type===2){
        let timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();
            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
            }
        }
    }
}
```
# 冒泡和捕获
冒泡是从内向外，捕获是从外向内。具体的可以看我博客：[关于事件冒泡和事件捕获](https://blog.csdn.net/qq_42532128/article/details/104123847)
# 原生Ajax
```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState == 4) {
    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304>) {
      console.log(xhr.responseText);
    } else {
      console.error('error:::', xhr.status);
    }
  }
};
xhr.open("get", "demo.txt", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
```
注意点：
1. send()方法接收一个参数，作为请求主体发送的数据。如果不需要发送数据最好传入null，因为参数对有些浏览器来说是必须的
2. 必须在调用open()之前指定onreadystatechange事件处理程序才能确保跨浏览器 兼容性
3. 要成功发送请求头部信息，必须在调用open()方法之后且调用send()方法之前调用setRequestHeader()
# 模块化
## CommonJs
用于后端node和前端webpack

接口：module.exports和require

特点：
1. 模块输出的是一个值的拷贝，模块是运行时加载，同步加载
2. CommonJS 模块的顶层this指向当前模块
AMD（Asynchronous  Module  Definition，异步模块定义）
浏览器端模块化开发的规范，require.js为AMD规范的实现
接口：define、require、config
特点：异步加载，不阻塞页面的加载，能并行加载多个模块，但是不能按需加载，必须提前加载所需依赖
## ES6 module
接口：import、export、export default
内嵌在网页中的用法：
```js
<script type="module">
  import utils from "./utils.js";
  // other code
</script>
```
此时不能用file协议，否则会报跨域的错误
特点：
1. ES6 模块之中，顶层的this指向undefined，即不应该在顶层代码使用this
2. 自动采用严格模式"use strict"。须遵循严格模式的要求
3. ES6 模块的设计思想是尽量的静态化，编译时加载”或者静态加载，编译时输出接口
4. ES6 模块export、import命令可以出现在模块的任何位置，但是必须处于模块顶层。如果处于块级作用域内，就会报错
5. ES6模块输出的是值的引用
### Tree-Shaking
介绍：消除无用的代码，减少js包的大小，从而减少页面的加载时间。

原理：找到有用的代码打包进去。依赖es6的module模块，tree shaking会分析文件项目里具体哪些代码被引入了，哪些没有引入，然后将真正引入的代码打包进去，最后没有使用到的代码自然就不会存在了。

# onLoad事件
使用对象：`Window`、`XMLHttpRequest`、`<img>`。

**注意：**
`load`事件发生在文档加载进程的最后，这时，所有的文档对象都放在了DOM中。所有的图片、脚本、外部链接和`sub-frames`也都已加载完成。

## 与DOMContentLoaded和DOMFrameContentLoaded的区别
这两个事件在页面的DOM被构建后触发，不会等待其他资源加载完毕。

# requestAnimationFrame
## 使用循环间隔更新动画的问题
1. `setInterval`里的回调函数是在指定的时间后加入事件队列，而不是立即执行。这会导致实际的动画间隔>=设置的时间。（在事件循环中为宏任务）
2. 浏览器使用的计时器精度各不相同。浏览器使用的计时器并不是请确到毫秒级别的。
   - IE8 及更早版本的计时器精度为`15.625ms`。
   - IE9 及更晚版本的计时器精度为`4ms`。
   - Firefox和Safari的计时器精度大约为`10ms`。
   - Chrome的计时器精度为`4ms`。
3. 浏览器开始限制后台标签页或不活动标签页的计时器。
   
## requestAnimationFrame
`window.requestAnimationFrame()`告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

如果想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用`window.requestAnimationFrame()`。

该函数一个 `long` 整数，即请求 ID ，是回调列表中唯一的标识，是个非零值，没别的意义。可以传这个值给 `window.cancelAnimationFrame()` 以取消回调函数。

回调函数执行次数通常与浏览器屏幕刷新次数相匹配。大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次，因此回调函数执行频率大概是`1000ms/60`，约等于`16.7ms`。

为了提高性能和电池寿命，因此在大多数浏览器里，当`requestAnimationFrame()` 运行在后台标签页或者隐藏的`<iframe>` 里时，`requestAnimationFrame()` 会被暂停调用以提升性能和电池寿命。

使用：
```js
window.requestAnimationFrame(callback);
```

# WebWorker
- 在浏览器的另一个线程中执行
- 拥有自己的全局作用域，与当前作用域不共享`window`
- 通过`postMessage()`传递消息，通信内容是拷贝关系，即传值而不是传址，浏览器先将通信内容串行化，然后把串行化后的字符串发给 `Worker`，后者再将它还原
- 同源限制：分配给 `Worker` 线程运行的脚本文件，必须与主线程的脚本文件同源
- `Worker` 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络
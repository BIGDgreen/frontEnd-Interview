# 什么是内存泄漏
js具有垃圾自动回收机制（GC）的语言。应用程序不再需要占用内存的时候，由于某些原因，本应被回收的内存没有被操作系统或可用的回收池回收，这时就发生了内存泄漏。
# 导致内存泄漏的原因
## 一、意外地创建全局变量
我们知道，全局变量属于根，它们始终被存储在内存中，不会被回收。因此，当因为代码书写不规范导致意外地创建全局变量时，内存中就会存储我们不希望存储的值。
### 例子1：没有使用var
```js
function f() {
	a = 1;
	console.log(window.a == a);	//true
}
```
在这里，函数内部的变量a没有使用var声明，因此即使在函数作用域中，它依然属于全局变量。此时我们就存储了我们并不希望存储的值a。
### 例子2：this指向问题
```js
(function f() {
	this.a = "value";	// this -> window
	console.log(window.a == a);		// true
})();
```
我们知道，在这个函数中，this指向调用 f 的对象，在这里是全局对象，因此a成为了全局变量而无法被回收。
## 二、垃圾回收机制：引用计数法的循环引用限制
IE9之前的版本中，其DOM和BOM对象是使用C++以COM（Component Object Model）对象的形式实现的，而COM对象的垃圾收集机制采用的是引用计数策略。因此，只要在IE中涉及COM对象，就会出现循环引用的问题。循环引用会导致内存无法被回收，因而出现内存泄漏。（具体参考[关于js的垃圾回收机制](https://blog.csdn.net/qq_42532128/article/details/104941682#_31)）

下面看几个特殊场景下例子：
### 闭包
在IE9之前的版本中，如果闭包的作用域链中保存着一个DOM元素，那么该元素就无法被销毁。
#### 例子1：一个简单的闭包
```js
function createClosure() {
	var ele = document.getElementById("myDiv");
	var innerFun = function() {
		console.log(ele.id);
	}
}
setInterval(createClosure, 1000);
```
在本例中，由于内部函数`innerFun`中包含对父级作用域中ele的引用，ele的引用次数始终不为0，因此始终留在内存中而无法被回收。而当这段代码反复执行时，内存占用会不断上升，造成严重的内存泄漏。
##### 解决方案
把`ele.id`的一个副本保存在变量中，消除循环引用，最后添加`ele=null`解除对DOM对象的引用。

这里要注意的是，闭包会引用包含函数的整个活动对象，即使闭包不直接引用包含函数的对象，包含函数的活动对象中也依然会保存一个引用。因此将ele置为null是必要的。
```js
function createClosure() {
	var ele = document.getElementById("myDiv");
	var id = ele.id;
	var innerFun = function() {
		console.log(id);
	}
	ele = null;
}
setInterval(createClosure, 1000);
```
#### 例子2：包含事件处理程序的闭包
此例来自《高程3》。

```html
<div id="myDiv">
  <input type="button" value="Click Me" id="myBtn">
</div>
<script type="text/javascript">
  var btn = document.getElementById("myBtn");
  btn.onclick = function() {
    document.getElementById("myDiv").innerHTML = "Processing...";
  }
</script>
```
这段代码是为了防止用户双击按钮，在用户点击一次后移除按钮，原来按钮的位置变成`Processing...`文本。
但问题是，当按钮被从页面中移除时，它依然带着一个事件处理程序`onclick`。即使按钮从页面中被移除了，但它与事件处理程序之间的引用依然存在。因此在某些浏览器（比如IE），它们很可能将元素和对事件处理程序的引用都保存在内存中。此时就发生了内存泄漏。
##### 解决方案
针对上面的问题，有两种解决方案：

 1. 手动移除事件处理程序
```js
btn.onclick = function() {
	btn.onclick = null; // 移除事件处理程序
	document.getElementById("myDiv").innerHTML = "Processing...";
  }
```
 2. 使用事件委托，将事件处理程序直接加在div上面。在点击按钮时，由于冒泡，依然会执行事件处理程序。（关于事件冒泡可以看[关于事件冒泡与捕获](https://blog.csdn.net/qq_42532128/article/details/104123847)）
 
```js

var myDiv = document.getElementById("myDiv");
myDiv.onclick = function() {
    document.getElementById("myDiv").innerHTML = "Processing...";
  }
```
# 如何实时查看内存占用
## Chrome开发工具查看
以下面这段代码为例：
```html
<!DOCTYPE html>
<html>
<head>
    <title>js内存泄漏</title>
</head>
<body>
    <div id="myDiv"></div>
    <script type="text/javascript">
        function createClosure() {
            var ele = document.getElementById("myDiv");
            var innerFun = function() {
                console.log(ele.id);
            }
        }
        setInterval(createClosure, 1000);
    </script>
</body>
</html>
```
在Chrome中打开网页，f12打开开发者工具，选择`Performance > Memory`，开始录制，6秒后停止录制，得到下面这幅图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032312592350.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
可以看到，js的内存占用稳定上升，很明显发生了内存泄漏。
然后再看我们优化后的代码：

```html
<!DOCTYPE html>
<html>
<head>
    <title>js内存泄漏</title>
</head>
<body>
    <div id="myDiv"></div>
    <script type="text/javascript">
        function createClosure() {
            var ele = document.getElementById("myDiv");
            var id = ele.id;
            var innerFun = function() {
                console.log(id);
            }
            ele = null;
        }
        setInterval(createClosure, 1000);
    </script>
</body>
</html>
```
同样录制6s，得到下面这幅图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200323130225678.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
可以看到，js heap从高处下降，因为我们在代码的最后解除了对ele的引用。内存泄漏解决。
# 一、移动端点击产生300 ms的延迟
300ms延迟是指当我们点击页面的时候移动端浏览器并不是立即作出反应，而是会等上300ms才会出现点击的效果。

而设置这300ms的意义在于判断用户的双击行为。移动端浏览器会有一些默认的行为，比如双击缩放、双击滚动。这些行为，尤其是双击缩放，主要是为桌面网站在移动端的浏览体验设计的。

在移动web的兴起初期，人们对这个问题的感知并不明显，但随着用户对交互体验的要求越来越高，现今，移动端300ms的点击延迟逐渐变得明显而无法忍受。

## 解决方案
### 方案一：禁用缩放（HTML文档头部设置meta标签）
```html
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">
```
这种方法的缺点显而易见，我们牺牲了缩放的功能。但实际需求中，我们还是希望能通过**双指**还实现缩放的。我们不想要的只是**双击**缩放行为。
### 方案二：更改默认的视口宽度
设置视口宽度为设备宽度：
```html
<meta name="viewport" content="width=device-width">
```
如果设置了上述meta标签，那浏览器就可以认为该网站已经对移动端做过了适配和优化，就无需双击缩放操作了。
这个方案相比方案一的好处在于，它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。
### 方案三：CSS touch-action
CSS属性`touch-action`用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。

如果将该属性值设置为`touch-action: none`，那么表示在该元素上的操作不会触发用户代理的任何默认行为，就无需进行300ms的延迟判断。

由于除了IE之外的大部分浏览器都不支持这个新的CSS属性，所以指针事件的polyfill必须通过某种方式去模拟支持这个属性。一种方案是JS去请求解析所有的样式表，另一种方案是将`touch-action`作为html标签的属性。

> Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。

### 方案四：FastClick
[FastClick](https://github.com/ftlabs/fastclick) 是 FT Labs 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库。

FastClick的实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。
```js
//引入fastclick
<script src="js/fastclick.min.js"></script>

// 原生js初始化
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
```
### 方案五：使用touchstart替代click
可能有人会想，既然click点击有300ms的延迟，那对于触摸屏，我们直接监听touchstart事件不就好了吗？

事实上，使用touchstart去代替click事件有两个不好的地方。

第一：touchstart是手指触摸屏幕就触发，有时候用户只是想滑动屏幕，却触发了touchstart事件，这不是我们想要的结果；

第二：使用touchstart事件在某些场景下可能会出现点击穿透的现象。下面讲一讲点击穿透。

# 二、点击穿透
## 什么是点击穿透，点击穿透为什么会发生
假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的`touchstart`事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了`click`事件。当然前提是A元素上绑定了`click`事件，或者说，A元素是个链接`<a>`、输入框`<input>`等。

这是因为在移动端浏览器，事件执行的顺序是`touchstart > touchend > click`。而click事件有300ms的延迟，当`touchstart`事件把B元素隐藏之后，隔了300ms，浏览器触发了`click`事件，但是此时B元素不见了，所以该事件被派发到了A元素身上。如果A元素是一个链接，那此时页面就会意外地跳转。

## 什么时候会触发点击穿透
click只是在移动端有300ms的延迟，因此，在移动端开发时，混用click和touch会导致穿透事件。
## 解决方案
### 延迟蒙层的消失时间
对于设置蒙层的穿透，可以将这个蒙层消失的时间后移350ms，当然为了不让用户感觉到卡顿，可以先设置这个蒙层的`opacity`透明度为0，然后等350ms后，再设置`display:none`。
### CSS touch-action
和之前说到的一样，将`touch-action`设置为`none`，使被覆盖元素的click事件无法发生。当然我们需要在350ms之后解除这个锁定，将`touch-action`恢复为`auto`。

这种方法的缺点就在于兼容性问题。

### 使用FastClick
使用fastclick库，从此所有的点击事件都使用click，而且不存在300ms延迟。当然也就没有了点击穿透问题。

fastclick的用法上面也有谈到。

# 参考链接
[移动端点击300ms延迟问题和解决](https://blog.csdn.net/qq_34986769/article/details/62046696)

[点击穿透事件原因及解决办法](https://www.cnblogs.com/leftJS/p/11095226.html)

[Polyfill](https://www.jianshu.com/p/b3eb2aa4c6f7)
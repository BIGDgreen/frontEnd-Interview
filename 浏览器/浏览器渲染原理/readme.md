# 浏览器渲染过程
## 图示
浏览器的渲染过程（因为我用的是谷歌浏览器，这里以Webkit内核为例）
![浏览器渲染原理](https://img-blog.csdnimg.cn/20191109191441714.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

## 图解

 1. 在地址栏输入URL并按下回车后，浏览器开始请求HTML资源（不一定是HTML类型，这里以HTML为例），之后开始HTML的解析，解析完后生成DOM树。
 2. 与此同时，浏览器也请求了CSS资源，解析完后生成CSSOM。
 3. DOM树与CSSOM树结合生成渲染树（Render Tree）。
 4. layout：回流，获得节点的几何信息。通过构造渲染树，我们将可见DOM节点以及它对应的样式结合起来，可是我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流。
 5. Painting：重绘，获得节点的像素信息。将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘节点。
### Parser（解析器）工作机制
#### 解析的概念
解析一个文档通常意味着将他转化为有意义的结构，也就是代码能理解和使用的结构。*解析的结果* 通常是被解析文档的结点树，这个树被叫做 *解析树或语法树*。
#### 可解析条件
事实上，只有具有特定语法、句法的文档能被解析。那么，我们平时说话讲的口语是不可能被解析的，于是，写代码就变得十分必要。
#### 解析树的构成
如图，文档解析分为词法解析和句法解析两个部分。文档经词法解释器解析生成合法词，这些词在经过句法解析生成解析树。
官方图（来自 [how browsers work](http://taligarsiel.com/Projects/howbrowserswork1.htm#Parsing_general)）：
![图片来自how browsers work](https://img-blog.csdnimg.cn/20200116131307986.png)
手（xia）绘（hua）版：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020011622045092.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
### HTML解析
HTML解析器的工作就是将HTML解析成DOM树。
#### DOM的概念
DOM，Document  Object  Model，文档对象化模型，顾名思义，是HTML文档的对象化呈现。同时，它也是HTML元素的对外接口，因此，它使JavaScript操作HTML成为可能。而解析树实际上由DOM元素以及属性节点构成。

值得一提的是，HTML解析是可折返的，当JS中出现有关DOM的操作而使HTML结构发生改变时，HTML解析会出现折返（重新解析DOM结构）。
#### HTML解析过程
HTML解析包括标记化和构建树两个过程。以下是HTML解析流程图。解析的最终结果是生成DOM树。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117111047817.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
##### 标记化（tokenization）
标记化是词法解析，他将文档转化为合法词（token）。HTML的合法词包含开始标签（start tags）、结束标签（end tags）、属性名称（attribute names）和属性值（attribute values）。标记化算法通常被描述为一个状态机。
对于这个简单的输入来说，

```html
<html>
	<body>
		Hello world
	</body>
</html>
```
状态机解析过程如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117111411311.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
当遇到字母`a-z`时，进入data状态。当遇到开始标签`<`时，进入Tag open状态，紧接着，遇到字母`a-z`，进入Tag name状态。遇到`/`时，进入Tag close状态，紧接着，遇到字母`a-z`，进入Tag name状态。遇到`>`后，返回到data状态。如此下去直到整个文档读取结束。
##### 构建树（tree constructor）
构建树流程图及图解如下所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117130116895.gif)![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117125152505.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70) 
### CSS解析

以Webkit内核为例，解析过程如下所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117131058516.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

### JS阻塞

html/text被解析完生成DOM树后，也为JavaScript操作HTML提供了接口(DOM)。JavaScript改变DOM结构会引起HTML解析的折返，因此为了减少折回，HTML解析过程中，在js执行时会暂停解析（也就是减少回流，提高性能）。

JavaScript阻塞HTML时机如下图所示
![js阻塞HTML解析图示](https://img-blog.csdnimg.cn/20191110135042408.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
关于浏览器的优化：
Webkit和FireFox都做了这种优化，在js解析的同时，另一个进程解析剩余文档，找到需要加载的资源并下载。
### CSS阻塞
按理来说，CSS并不会影响DOM树的结构，因此没有理由暂停HTML解析来等待CSS解析。但是，JS在解析时可能会请求样式资源，因此，我们必须保证样式表在JS解析之前完成解析。对此，FireFox和Webkit提出了不同的解决方案。FireFox在样式表加载和解析时会阻塞所有的scripts；而webkit只在scripts尝试获取特定的样式属性时才会阻塞scripts。
### 更改后的浏览器渲染图示（加上阻塞）
（自己瞎琢磨着改的，有错误欢迎提出~）
当同时存在JavaScript、CSS和HTML时：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191110145116646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
# 几个问题

## 为什么操作DOM会很消耗性能

因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了**两个线程之间的通信**，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来**重绘回流**的情况，所以也就导致了性能上的问题。
## 插入几万个 DOM，如何实现页面不卡顿
1. 通过 `requestAnimationFrame` 循环插入DOM
2. 虚拟滚动：只渲染可视区域内的内容，非可见区域的就完全不渲染了，当用户在滚动的时候就实时去替换渲染的内容

# 重绘和回流
- 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 。
- 回流是布局或者几何属性需要改变。

回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。

重绘和回流其实也和 Eventloop 有关。
1. 当 Eventloop 执行完 Microtasks 后，会判断 document 是否需要更新，因为浏览器是 60Hz 的刷新率，每 16.6ms 才会更新一次。
2. 然后判断是否有 resize 或者 scroll 事件，有的话会去触发事件，所以 resize 和 scroll 事件也是至少 16ms 才会触发一次，并且自带节流功能。
3. 判断是否触发了 media query
4. 更新动画并且发送事件
5. 判断是否有全屏操作事件
6. 执行 requestAnimationFrame 回调
7. 执行 IntersectionObserver 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
8. 更新界面
9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback 回调。

# Chrome Performan 分析
对于以下html文档进行分析。首先进入匿名模式（windows 快捷键`ctrl+shift+N`），并确保Performance中screenshots是选中的，在Performance中进行记录，得到的记录结果可以在[链接](https://pan.baidu.com/s/1WxVwaBbMJ_SziyEds97RRg)中下载。
```html
<!DOCTYPE html>
<html>
<head>
	<title>js阻塞</title>
</head>
<body>
	<div class="wrapper">
		<script>alert("第一个inline js")</script>
		<p>line1</p>
		<script>alert("第二个inline js")</script>
		<p>line2</p>
		<script src="app1.js"></script>
		<p>line3</p>
		<script src="app2.js"></script>
		<p>line4</p>
		<script>alert("第三个inline js")</script>
		<p>line5</p>
	</div>
</body>
</html>
```
app1.js
```javascript
	alert("第一个外部js");
```
app2.js
```javascript
	alert("第二个外部js");
```
分析一下html文档，可以发现，html在解析过程中会遇到5个js，其中有三个内联js，两个外部js。内联js直接执行，而外部js则需要先请求js资源，经历如下过程：request→response→receive data→execute。
## Performance > NetWork
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200117134312194.png)
从图中可以看到，浏览器首先请求html资源，然后请求第一个外部js，它并不会等待第一个外部js获得响应，而是另开一个线程继续请求第二个外部js。
## Performance > Main+Event Log
整体过程：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020011714073269.png)
     
      蓝色(Loading)：网络通信和HTML解析
       
      黄色(Scripting)：JavaScript执行

      紫色(Rendering)：样式计算和布局，即重排

      绿色(Painting)：重绘

      灰色(other)：其它事件花费的时间

      白色(Idle)：空闲时间
从图中可以看到FP（First Paint）和DCL（DOM Content Loaded）的时机。
下图为HTML解析被第一个内联js阻塞的图例
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191110195738842.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)         
从图中可以看到，在执行第一个内联js之前就已经请求了app1.js和app2.js资源。
# 注意点
 1. 为了提升用户体验（使用户觉得速度快），浏览器不会等到所有HTML都解析之后才开始构建和布局渲染树，部分内容会先被解析和显示，这时其他的请求依然在进行中（First Paint）。
 2. 请求是异步的，执行是同步的。

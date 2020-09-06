# 语义化标签
让标签具有自己的含义。

常见语义化标签：`title` / `header` / `footer` / `article` / `hn(h1~h6)` / `main` / `nav` / `strong` / `code` 等。

好处：
1. 代码结构清晰，方便阅读，有利于团队合作开发。
2. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页。
3. 即使在没有CSS样式情况下也以一种文档格式显示，并且是容易阅读的。
4. 有利于搜索引擎优化（SEO）。
   
# `<meta>`标签
meta标签：提供给页面的一些元信息（名称/值对）， 比如针对搜索引擎和更新频度的描述和关键词。

- `name`：名称/值对中的名称。常用的有author、description、keywords、generator、revised、others。 把 content 属性关联到一个名称。
- `http-equiv`：没有name时，会采用这个属性的值。常用的有content-type、expires、refresh、set-cookie。把 content 属性关联到 http 头部。
- `content`：名称/值对中的值， 可以是任何有效的字符串。 始终要和 name 属性或 http-equiv 属性一起使用。
- `scheme`：用于指定要用来翻译属性值的方案。

# @import @media @charset 等 @ 规则
`@` 规则（at-rule）是一个CSS语句，以 at 符号开头，`@` 后面跟一个标识符，并包括直到下一个分号的所有内容，或是下一个CSS代码块，就近原则，先到的为准。

# 页面导入样式时，使用link和@import的区别
- link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用，@import是CSS提供的，只能用于加载CSS
- 页面被加载的同时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载
- import 是 CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题
  
# css中有哪些单位
`px`、`em`、`rem`、`%`、`vh`、`vw`、`vmin`、`vmax`、`ex`、`ch`

# px、em、rem的区别
`px`：绝对单位，页面按精确像素展示。

`em`：相对单位，基准点为父节点字体的大小，如果自身定义了font-size，按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。

`rem`：相对单位，可理解为 `root em`，相对根节点 html 的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持。

然后可以提一下他们在移动端适配上的应用。

# rem为什么能够实现自适应布局，在不同的手机端表现是什么
`rem`是相对根元素的大小。

根据屏幕宽度设置根元素的字体大小。这样一来其他基于根元素的大小会自动缩放。
```js
<script type="text/javascript">
　　document.documentElement.style.fontSize = document.documentElement.clientWidth / 640*100 + 'px';
</script>
```

# static、fixed、relative、absolute的区别
| 定位模式 | 是否脱离文档流 | 是否可用边偏移（left/right/top/bottom） | 移动位置基准                       | 是否可以转换display        |
| -------- | -------------- | --------------------------------------- | ---------------------------------- | -------------------------- |
| static   | 否             | 否                                      | 正常模式                           | 否                         |
| relative | 否             | 是                                      | 元素自身                           | 否                         |
| absolute | 是             | 是                                      | 相对于最近的定位为除static的父元素 | 是，可以转换为行内块级元素 |
| fixed    | 是             | 是                                      | 相对于浏览器                       | 是，可以转换为行内块级元素 |


- 浮动半脱离文档流，还会占据原来的位置

- `absolute`和`fixed`定位会脱离文档流，不占据原来的位置

# display可以取哪些值
inline、block、inline-block、list-item、run-in、none、table、table-row、table-column、table-cell、inherit、table-row-group、table-column-group

# href和src的区别
href：超文本引用。link、a。浏览器会识别href引用的文档并行下载该文档，并且不会停止对当前文档的处理。

src：引入。img、script、iframe。src指向的内容会嵌入到文档中当前标签所在的位置。当浏览器解析到src引用时，会暂停浏览器的渲染，直到该资源加载完毕。这也是将js脚本放在底部而不是头部的原因。


# 三栏布局
## 横向三栏
两端宽度固定，中间宽度自适应布局
三种方式实现：

 1. flex布局
 2. float
 3. position: absolute

具体代码：[github](https://github.com/BIGDgreen/frontEnd-Interview/tree/master/%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81/%E4%B8%89%E6%A0%8F%E5%B8%83%E5%B1%80)
## 竖向三栏


# css3动画 transition和animation
Transition：对元素某个属性或多个属性的变化，进行控制(时间等)，类似flash的补间动画。但只有两个关键帧。开始，结束。

Animation：对元素某个属性或多个属性的变化，进行控制(时间等)，类似flash的补间动画。可以设置多个关键帧。

Transition与Animation区别: transition需要触发一个事件，而animation在不需要触发任何事件的情况下也可以显式地随着时间变化来改变元素css的属性值，从而达到一种动画的效果。Transition: transition属性是一个简单的动画属性，非常简单非常容易用。可以说它是animation的简化版本，是给普通做简单网页特效用的。

# flex的使用方法，flex:1代表了什么

` flex：1 `为3个属性的简写。这三个属性分别为
1. `flex-grow`，项目的放大比例，默认值为0
2. `flex-shrink`，项目的缩小比例，默认值为1
3. `flex-basis`，给上面两个属性分配多余空间之前，计算项目是否有多余空间，默认值为 auto， 即项目本身的大小

`flex: 1`就相当于`flex: 1 1 0`。

# bfc的作用，触发条件
`bfc：block formatting context` 块级格式化上下文

BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

**触发条件：**
1.	float不是none
2.	position不是static或relative（absolute、fixed）
3.	display是inline-block、table-cell、flex、table-caption或inline-flex
4.	overflow不是visible（hidden、auto、scroll）
5.	body根元素

**作用：**
1.	避免margin重叠
   
属于同一个BFC的相邻box会发生margin重叠，所以可以设置两个不同的bfc（包裹div）

2.	自适应两栏布局

每个盒子的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。可以给一个块添加 `overflow:hidden`，使其成为BFC。

3.	清除浮动

不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷（父节点的高度为border和）。根据计算BFC的高度时，浮动元素也参与计算，激活父节点的BFC。

# 清除浮动的方式（解决高度坍塌）
清除浮动主要是为了解决，父元素因为子级元素浮动引起的内部高度为0的问题（高度坍塌）。

清除浮动：
1. 在最后一个浮动标签后添加一个标签，给其设置为`clear: both`。
   - 缺点：添加无意义的标签，语义化差
2. 给父元素添加`overflow: auto`，触发BFC
   - 缺点：当内部元素宽度超出父元素宽度时，会出现滚动条
   - 当设置`overflow: hidden`时，超出部分会被隐藏
   - 通过设置`*zoom: 1;`兼容IE6、7
3. 使用after伪元素清除浮动
   - 主流方法，推荐使用
   - 通过设置`*zoom: 1;`兼容IE6、7
   ```js
   选择符:after{
      content:"";
      clear:both;
      display:block;
      height:0;
      overflow:hidden;
      visibility:hidden;
   }
   ```
4. 给父元素设置高度
   - 浮动元素高度不确定时不适用
5. 给父元素设置`float`
   - 同样是通过触发BFC，这样设置会使父元素半脱离文档流，后面的元素与该父元素同行显示

# css水平垂直居中
以下所有方法的前提都是父元素`width`，`height`都有值。
1. 父元素`display: flex` + 要居中的子元素 `margin:auto`
2. 父元素flex(四个属性设置全)
3. 子元素`position:relative;top:50%;left:50%;transform:translate(-50%,-50%);`
4. 父元素`position:relative` + 子元素`position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;`
   这里设置`margin-top: -50px;margin-left: -50px;`与上面设置`transform:translate(-50%,-50%);`效果相同
5. 父元素 `position:relative` + 子元素 `position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;`
   
具体的可以参考我之前写的博客：[div+css实现水平/垂直/水平垂直居中超详解](https://blog.csdn.net/qq_42532128/article/details/102526334)

# 伪类、伪元素的区别
举几个例子：

伪类：`:link`,`:visited`,`:hove`,`:active`,`:focus`,`:disable`,`:first-child`,`:last-child`,`:nth-child(n)`

伪元素：`::after`,`::before`,`::first-letter`,`first-line`,`selection`

1. 写法区别。双冒号代表伪元素，单冒号代表伪类。
2. 概念区别。伪类侧重丰富选择器的选择语法范围内元素的选择能力，伪元素侧重表达或者定义不在语法定义范围内的抽象元素。

# css选择器优先级（权重问题）
> !important > 行内样式 > ID选择器 > Class选择器 > 标签 > 通配符 > 继承 > 浏览器默认样式

# css标准盒子和怪异盒子
W3C标准盒模型  IE怪异盒模型

标准盒模型下：`盒子实际内容（content）的width/height=我们设置的width/height;盒子总宽度/高度=width/height+padding+border+margin`。也就相当于css3中设置属性`box-sizing:content-box`。

怪异盒模型下：`设置的width/height=盒子（content）的width/height+内边距padding+边框border宽度，盒子总宽度/高度=width/height + margin = 内容区宽度/高度 + padding + border + margin`。也就相当于css3中设置属性`box-sizing:border-box`。

# css提升性能的方式
1. 合并css文件
2. 减少css嵌套层级
3. 建立公共样式类，把相同样式提取出来
4. 减少通配符的使用
5. 用雪碧图
6. gzip压缩（关于gzip的原理：[简单聊聊 GZIP 的压缩原理与日常应用](https://zhuanlan.zhihu.com/p/42418273)）
7. 开启硬件加速，transform、opacity、filters等动画效果不会引起回流重绘
8. 使用文档片段`DocumentFragment`存储变化的元素，然后依次添加

# 可继承属性
可继承属性：颜色，文字，字体间距行高对齐方式，和列表的样式。

- 所有元素可继承：visibility和cursor。
- 内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
- 终端块状元素可继承：text-indent和text-align。
- 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。

继承让开发更容易，大大减小了CSS文件的体积。

注意：`font-size`是继承计算后的值。

# visibility: hidden和display: none有什么区别？在render tree 和 dom tree里面呢?
`visibility: hidden`：
- 将元素隐藏，但是在网页中该占的位置还是占着
- 在`render tree`里存在，在`dom tree`里也存在

`display: none`：
- 将元素的显示设为无，即在网页中不占任何的位置。
- 在`render tree`里不存在，在`dom tree`里存在

display：none会发生reflow（回流）；而visibility：hidden只会触发repaint（重绘）

# window和document的区别  window.onload和document.ready的区别
- `window`对象表示浏览器中打开的窗口
- `document`对象代表整个 HTML 文档,可用来访问页面中的所有元素
- `document`对象是`window`对象的一部分，可通过`window.document`属性对其进行访问

- `document.ready`：文档结构加载完成。
- `window.onload`: 不仅仅要在结构和样式加载完，还要执行完所有的样式，图片这些资源文件，完全加载完才会触发Window.onload事件。
- `document.ready`在`window.onload`之前执行

# h5新增结构元素和属性
- 语义化标签。如`<header>`、`<footer>`、`<section>`、`<nav>`、`<article>`、`<aside>`
- 增强型表单。
  - 给`input`添加了多个输入类型，这些特性提供了更好的表单控制和验证。如`color`、`url`、`time`、`date`、`datetime`、`email`、`tel`、`number`、`range`、`week`
  - 新增表单属性：`placeholder`、`pattern`、`required`、`min`、`max`、`step`、`autofocus`、`multiple`、`height`、`width`
- 视频和音频。新增`<audio>`、`<video>`
- 新增`<canvas>`和`svg`
  
  两者区别：
  - SVG 是一种使用 XML 描述 2D 图形的语言。
  - Canvas 通过 JavaScript 来绘制 2D 图形。
  - SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。您可以为某个元素附加 JavaScript 事件处理器。
  - 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。
  - Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

- 拖放API
- `Web Worker`、`Web Storage`、`WebSocket`、

# 如何开启硬件加速
硬件加速就是将浏览器的渲染过程交给GPU处理，而不是使用自带的比较慢的渲染器。这样就可以使得`animation`与`transition`更加顺畅。

一般使用3d效果来开启硬件加速，如添加`transform`：

```css
.speed-up{
   -webkit-transform: translateZ(0);
   -moz-transform: translateZ(0);
   -ms-transform: translateZ(0);
   -o-transform: translateZ(0);
   transform: translateZ(0);
}
```

对于safari以及chrome，可能会在使用animation或者transition时出现闪烁的问题，可以使用以下的解决方法:

```css
   -webkit-backface-visibility: hidden;
   -moz-backface-visibility: hidden;
   -ms-backface-visibility: hidden;
   backface-visibility: hidden;

   -webkit-perspective: 1000;
   -moz-perspective: 1000;
   -ms-perspective: 1000;
   perspective: 1000;

/**webkit上也可以用以下语句  **/
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
```

**注意事项：** 硬件加速最好只用在 `animation` 或者 `transform` 上。不要滥用硬件加速，因为这样会增加性能的消耗，如果滥用反而会使动画变得更加卡，这样就得不偿失了。

# transform会引起回流吗
不会，`transform` 引起的变化会交给GPU处理，开启硬件加速。

此外，`opacity`、`filter`这些动画也不会引起回流重绘。

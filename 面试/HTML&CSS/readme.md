# 语义化标签
让标签具有自己的含义。
常见语义化标签：`title` `header` `footer` `article` `hn(h1~h6)` `main` `nav` `strong` `code`等
好处：
1. 代码结构清晰，方便阅读，有利于团队合作开发。
2. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页。
3. 有利于搜索引擎优化（SEO）。
# @import @media @charset 等 @ 规则
`@`规则（at-rule）是一个CSS语句，以 at符号开头，`@`后面跟一个标识符，并包括直到下一个分号的所有内容，或是下一个CSS代码块，就近原则，先到的为准。

# css中有哪些单位
px、em、rem、%、vh、vw、vmin、vmax、ex、ch
# px、em、rem的区别
px是绝对单位，页面按精确像素展示。

em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。

rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持。

然后可以提一下他们在移动端适配上的应用。

# rem为什么能够实现自适应布局，在不同的手机端表现是什么

# fixed relative absolute的区别

# display可以取哪些值
inline、block、inline-block、list-item、run-in、none、table、table-row、table-column、table-cell、inherit、table-row-group、table-column-group
# href和src的区别
href：超文本引用。link、a。浏览器会识别href引用的文档并行下载该文档，并且不会停止对当前文档的处理。

src：引入。img、script、iframe。src指向的内容会嵌入到文档中当前标签所在的位置。当浏览器解析到src引用时，会暂停浏览器的渲染，直到该资源加载完毕。这也是将js脚本放在底部而不是头部的原因。
# 三栏布局
两端宽度固定，中间宽度自适应布局
三种方式实现：

 1. flex布局
 2. float
 3. position: absolute

具体代码：[github](https://github.com/BIGDgreen/frontEnd-Interview/tree/master/%E6%89%8B%E5%86%99%E4%BB%A3%E7%A0%81/%E4%B8%89%E6%A0%8F%E5%B8%83%E5%B1%80)

# css3动画 transition和animation
Transition：对元素某个属性或多个属性的变化，进行控制(时间等)，类似flash的补间动画。但只有两个关键帧。开始，结束。

Animation：对元素某个属性或多个属性的变化，进行控制(时间等)，类似flash的补间动画。可以设置多个关键帧。

Transition与Animation区别: transition需要触发一个事件,而animation在不需要触发任何事件的情况下也可以显式的随着时间变化来改变元素css的属性值，从而达到一种动画的效果。Transition: transition属性是一个简单的动画属性，非常简单非常容易用。可以说它是animation的简化版本，是给普通做简单网页特效用的。


# flex的使用方法，flex：1代表了什么

` flex：1 `为3个属性的简写。这三个属性分别为
1. `flex-grow`，项目的放大比例，默认值为0
2. `flex-shrink`，项目的缩小比例，默认值为1
3. `flex-basis`，给上面两个属性分配多余空间之前, 计算项目是否有多余空间, 默认值为 auto, 即项目本身的大小

`flex: 1`就相当于`flex: 1 1 0`。

# bfc的作用，触发条件
bfc：block formatting context 块级格式化上下文

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

**触发条件：**
1.	float不是none
2.	position不是static或relative（absolute、fixed）
3.	display是inline-block、table-cell、flex、table-caption或inline-flex
4.	overflow不是visible（hidden、auto、scroll）
5.	body根元素

**作用：**
1.	避免margin重叠（高度坍塌）

属于同一个BFC的相邻box会发生margin重叠，所以可以设置两个不同的bfc（包裹div）
2.	自适应两栏布局

每个盒子的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。可以给一个块添加overflow:hidden，使其成为BFC。
3.	清除浮动

不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷（父节点的高度为border和）。根据计算BFC的高度时，浮动元素也参与计算，激活父节点的BFC。

# 高度坍塌及解决


# 清除浮动的方式

# css水平垂直居中
以下所有方法的前提都是父元素`width`，`height`都有值。
1. 父元素`display: flex;` + 要居中的子元素`margin:auto`
2. 父元素flex(四个属性设置全！)
3. 子元素`position:relative;top:50%;left:50%;transform:translate(-50%,-50%);`
4. 父元素`position:relative` + 子元素`position: absolute;top: 50%;left: 50%;margin-top: -50px;margin-left: -50px;`
   这里设置`margin-top: -50px;margin-left: -50px;`与上面设置`transform:translate(-50%,-50%);`效果相同
5. 父元素`position:relative` + 子元素`position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;`
   
具体的可以参考我之前写的博客：[div+css实现水平/垂直/水平垂直居中超详解](https://blog.csdn.net/qq_42532128/article/details/102526334)

# 伪类、伪元素的区别
举几个例子：

伪类：`:link`,`:visited`,`:hove`,`:active`,`:focus`,`:disable`,`:first-child`,`:last-child`,`:nth-child(n)`

伪元素：`::after`,`::before`,`::first-letter`,`first-line`,`selection`

1. 写法区别。双冒号代表伪元素，单冒号代表伪类。
2. 概念区别。伪类侧重丰富选择器的选择语法范围内元素的选择能力，伪元素侧重表达或者定义不在语法定义范围内的抽象元素。

# css选择器优先级（权重问题）
> ！important > 行内样式 > ID选择器 > Class选择器 > 标签 > 通配符 > 继承 > 浏览器默认样式

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

# 可继承属性
# h5新增结构元素和属性
# animation-fill-mode
# href和src的区别

# visible:hidden和display:none有什么区别？在render dom 和 tree dom里面呢?

# window和document的区别  window.onload和document.onload的区别
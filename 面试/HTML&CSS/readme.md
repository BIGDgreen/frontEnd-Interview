感觉这块面试的时候还是比较少问的，我在面试时被问到过css的单位和px与rem的区别。另外常见的可能就是垂直居中和移动端适配了。
# 语义化标签
让标签具有自己的含义。
常见语义化标签：`title` `header` `footer` `article` `hn(h1~h6)` `main` `nav` `strong` `code`等
好处：
1. 代码结构清晰，方便阅读，有利于团队合作开发。
2. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页。
3. 有利于搜索引擎优化（SEO）。
# @import @media @charset 等 @ 规则
`@`规则（at-rule）是一个CSS语句，以 at符号开头，`@`后面跟一个标识符，并包括直到下一个分号的所有内容，或是下一个CSS代码块，就近原则，先到的为准。
# css水平垂直居中
利用css的transform、absolute、margin还有flex以及行内标签的一些属性。
具体的可以参考博客：[div+css实现水平/垂直/水平垂直居中超详解](https://blog.csdn.net/qq_42532128/article/details/102526334)
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

# transition和animation
Transition：对元素某个属性或多个属性的变化，进行控制(时间等)，类似flash的补间动画。但只有两个关键帧。开始，结束。

Animation：对元素某个属性或多个属性的变化，进行控制(时间等)，类似flash的补间动画。可以设置多个关键帧。

Transition与Animation区别: transition需要触发一个事件,而animation在不需要触发任何事件的情况下也可以显式的随着时间变化来改变元素css的属性值，从而达到一种动画的效果。Transition: transition属性是一个简单的动画属性，非常简单非常容易用。可以说它是animation的简化版本，是给普通做简单网页特效用的。

# flex的使用方法，flex：1代表了什么

flex：1为3个属性的简写
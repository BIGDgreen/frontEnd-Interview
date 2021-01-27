# Doctype
`<!DOCTYPE>`声明位于HTML文档中的第一行，处于 `<html>` 标签之前。

`<!DOCTYPE>` 声明不是 HTML 标签；它是指示 web 浏览器关于页面 **使用哪个 HTML 版本** 进行编写的指令。

在 HTML 4.01 中，`<!DOCTYPE>` 声明引用 DTD，因为 HTML 4.01 基于 SGML。DTD 规定了标记语言的规则，这样浏览器才能正确地呈现内容。

HTML5 不基于 SGML，所以不需要引用 DTD。

## HTML5 为什么只需要写 <!DOCTYPE HTML>
HTML5 不基于SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）；

而 HTML4.01 基于 SGML, 所以需要对 DTD 进行引用，才能告知浏览器文档所使用的文档类型。

## 你知道多少种Doctype文档类型？
该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。

- Strict：该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。
- Transitional：该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。
- Frameset：该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。允许框架集（Framesets）。

HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。

XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。必须以格式正确的 XML 来编写标记。

XHTML 1.1 该 DTD 等同于 XHTML 1.0 Strict，但允许添加模型。

# 行内元素和块级元素
## 块级元素
- 总是在新行上开始
- 高度，行高以及外边距和内边距都可控制
- 宽度默认是它的容器的100%，除非设定一个宽度
- margin和padding上下左右都有效
- 它可以容纳内联元素和其他块元素

常用的块级元素：
- `<div>`
- `<h1>~<hn>`、`<p>`、`<pre>`、`<article>`、`<address>`
- `<form>`、`<footer>`、`<header>`、`<aside>`、`<nav>`
- `<hr>`
- `<table>`、`<th>`、`<tr>`、`<td>`、`<caption>`
- `<ul>`、`<ol>`、`<li>`
- `<dl>`、`<dt>`、`<dd>`

## 行内元素

- 不自动换行
- 高，行高及外边距和内边距不可改变
- 宽度就是它的文字或图片的宽度，不可改变
- 内联元素只能容纳文本或者其他内联元素

对行内元素，需要注意：

- 设置宽度width 无效。
- 设置高度height 无效，可以通过line-height来设置。
- 设置margin 只有左右margin有效，上下无效。
- 设置padding 上下左右都有效，会撑大空间。

常用的行内元素：
- `<span>`
- `<b>`、`<small>`、`<big>`、`<strong>`、`<em>`、`<code>`、`<abbr>`、`<cite>`、`<i>`、`<q>`、`<sub>`、`<sup>`、`<time>`
- `<img>`、`<video>`
- `<input>`、`<textarea>`
- `<br>`


另外，常见的空元素：`<img>`、`<input>`、`<link>`、`<meta>`、`<br>`、`<hr>`

## 行内块级元素

- 不自动换行（排列方式从左到右）
- 可以指定宽高
- margin和padding上下左右都有效

## 让块级元素一行显示的方法
1. 每个元素：`float: left`
2. 每个元素：`display: inline-block`
3. 父元素：`display: flex`

# HTML5 表单验证
设置`<input>`的`type`。

`email`、`url`、`number`、`range`、`Date pickers`、`search`、`color`。

# 全局监听错误的方法
**同步：**`window.onerror`

该方法能拦截到大部分的详细报错信息，但是也有例外：

- 对于跨域的代码运行错误会显示 Script error. 对于这种情况我们需要给 script 标签添加 crossorigin 属性
- 对于某些浏览器可能不会显示调用栈信息，这种情况可以通过 arguments.callee.caller 来做栈递归

DOM0 级事件：
```js
window.onerror = function(message, source, lineno, colno, error) { ... }
```

- `message`：错误信息（字符串）。可用于HTML `onerror=""` 处理程序中的event。
- `source`：发生错误的脚本URL（字符串）
- `lineno`：发生错误的行号（数字）
- `colno`：发生错误的列号（数字）
- `error`：Error对象（对象

若该函数返回false，则阻止浏览器报告错误的默认行为。

**异步：**`window.onunhandledrejection`
当Promise 被 reject 且 **没有 reject 处理器** 的时候，会触发 `unhandledrejection` 事件(通常是发生在window下，但是也可能发生在Worker中)。

```js
window.addEventListener("unhandledrejection", event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});

window.onunhandledrejection = event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
};
```

当Promise被rejected且**有rejection处理器**时会在全局触发`rejectionhandled`事件(通常是发生在window下，但是也可能发生在Worker中)。

```js
window.addEventListener("unhandledrejection ", function(event) { ... });

window.unhandledrejection  = function(event) { ...};
```

# document.write和innerHTML的区别

`document.write`是直接写入到页面的内容流，如果在写之前没有调用`document.open`, 浏览器会自动调用open。每次写完关闭之后重新调用该函数，会导致页面被重写。

`innerHTML`则是DOM页面元素的一个属性，代表该元素的html内容。你可以精确到某一个具体的元素来进行更改。如果想修改document的内容，则需要修改`document.documentElement.innerElement`。

innerHTML将内容写入某个DOM节点，不会导致页面全部重绘。

innerHTML很多情况下都优于document.write，其原因在于其允许更精确的控制要刷新页面的那一个部分。

# DOM属性dataset
`data-*`

一类自定义数据属性，它赋予我们在所有 HTML 元素上嵌入自定义数据属性的能力，并可以通过脚本(一般指JavaScript) 与 HTML 之间进行专有数据的交换。所有这些自定义数据属性都可以通过所属元素的 HTMLElement 接口来访问。 `HTMLElement.dataset`属性可以访问它们。

`HTMLElement.dataset`属性允许无论是在读取模式和写入模式下访问在 HTML或 DOM中的元素上设置的所有自定义数据属性(data-*)集。

它是一个DOMString的映射，每个自定义数据属性的一个条目。

请注意，`dataset` 属性本身可以被读取，但不能直接写入。相反，所有的写入必须是它的“属性”，这反过来表示数据属性。

还要注意，一个HTML` data-attribute `及其对应的DOM` dataset.property `不共享相同的名称，但它们总是相似的。(横杠转驼峰)

```html
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe
</div>
<script>
    var el = document.querySelector('#user');

    // el.id == 'user'
    // el.dataset.id === '1234567890'
    // el.dataset.user === 'johndoe'
    // el.dataset.dateOfBirth === ''

    el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

    // 'someDataAttr' in el.dataset === false

    el.dataset.someDataAttr = 'mydata';
    // 'someDataAttr' in el.dataset === true
</script>
```

# HTML5的离线缓存
## 离线检测
1. 通过HTML5的`navigator.onLine`进行离线检测，为true表示有网。
2. `online`事件和`offline`事件

为了检测应用是否离线,在页面加载后,最好先通过`navigator.onLine`取得初始的状态。然后, 就是通过上述两个事件来确定网络连接状态是否变化。当上述事件触发时，`navigator.onLine` 属性的值也会改变,不过必须要手工轮询这个属性才能检测到网络状态的变化。

在用户没有联网时，可以正常访问站点或应用，在用户与网络连接时更新用户机器上的缓存文件。

优势：
1. 离线浏览 – 用户可在应用离线时使用它们
2. 速度 – 已缓存资源加载得更快
3. 减少服务器负载 – 浏览器将只从服务器下载更新过或更改过的资源。

原理：HTML5的离线存储是基于一个新建的`.appcache`文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

就像cookie一样，html5的离线存储也需要服务器环境。

# iframe的缺点
- 会增加请求数；
- iframe会阻塞主页面的onload事件
- 搜索引擎的检索程序无法解读这种页面，不利于SEO
- iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
- 页面上的每个`<iframe>`都需要增加内存和其它计算资源，这是因为每个浏览上下文都拥有完整的文档环境，因此当`iframe`数量过多时会带来性能问题
- 使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题

## 与iframe有关的小知识
1. `iframe`会干扰`instanceof`对数据类型的检测，因为此时存在多个`window`
2. `window.length` 返回在当前窗口中frames的数量（包括`IFRAMES`）
3. 在 HTML 4.1 Strict DTD 和 XHTML 1.0 Strict DTD 中，不支持 `iframe` 元素
4. `X-Frame-Options`是一个HTTP响应头，指示浏览器是否应该加载一个iframe中的页面，可以有效地避免`点击劫持`
   - `deny`：表示该页面不允许在 frame 中展示，即便是在相同域名的页面中嵌套也不允许。
   - `sameorigin`：表示该页面可以在相同域名页面的 frame 中展示。
   - `allow-from uri`：表示该页面可以在指定来源的 frame 中展示。

# `<title>`与`<h1>`的区别、`<b>`与`<strong>`的区别、`<i>`与`<em>`的区别？

- `<title>`表示当前网站的标题，`<h1>`表示`<body>`内的标题
- `<b>`和`<strong>`都会使字体加粗，但`<b>`只是单纯地将字体加粗；而`<strong>`表示强调，利于SEO
- `<i>`和`<em>`都会使字体倾斜，但`<i>`只是单纯地改变字体样式；而`<em>`表示强调，也利于SEO


# `<img>`的title和alt有什么区别？
`title`是对图片进行描述的主题，无论图片是否显示，只要有`<img>`标签存在，当鼠标指到`<img>`所在位置时，`title`内容就会浮现

`alt`是`<img>`的特有属性，是图片内容的等价描述，用于图片无法加载时显示，图片显示时不表现。可提高图片可访问性，除了纯装饰图片外都必须设置有意义的值，搜索引擎会重点分析。

# 层叠上下文
文档中的层叠上下文由满足以下任意一个条件的元素形成：

- 文档根元素（`<html>`）；
- position 值为 absolute（绝对定位）或  relative（相对定位）且 z-index 值不为 auto 的元素；
- position 值为 fixed（固定定位）或 sticky（粘滞定位）的元素（沾滞定位适配所有移动设备上的浏览器，但老的桌面浏览器不支持）；
- flex (flexbox) 容器的子元素，且 z-index 值不为 auto；
- grid (grid) 容器的子元素，且 z-index 值不为 auto；
- opacity 属性值小于 1 的元素（参见 the specification for opacity）；
- mix-blend-mode 属性值不为 normal 的元素；
- 以下任意属性值不为 none 的元素：
  - transform
  - filter
  - perspective
  - clip-path
  - mask / mask-image / mask-border
- isolation 属性值为 isolate 的元素；
- -webkit-overflow-scrolling 属性值为 touch 的元素；
- will-change 值设定了任一属性而该属性在 non-initial 值时会创建层叠上下文的元素（参考这篇文章）；
- contain 属性值为 layout、paint 或包含它们其中之一的合成值（比如 contain: strict、contain: content）的元素。
- 在层叠上下文中，子元素同样也按照上面解释的规则进行层叠。 重要的是，其子级层叠上下文的 z-index 值只在父级中才有意义。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。

在层叠上下文中，子元素同样也按照上面解释的规则进行层叠。 重要的是，其子级层叠上下文的 z-index 值只在父级中才有意义。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。

**注意：** 没有创建自己的层叠上下文的元素会被父层叠上下文同化。

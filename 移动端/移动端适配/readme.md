# 关于像素，括号中为别名
## 设备像素（物理像素）
DP（Device Pixel），显示屏上的像素点，出厂即确定。

## 设备无关像素（设备独立像素）
DIP（Device Independent Pixel），缩放比为1时，设备独立像素也等于CSS像素（逻辑像素）。我们通过CSS和javascript代码设置的像素都是逻辑像素。在CSS规范中，长度单位可以分为两类，绝对(absolute)单位以及相对(relative)单位，px是一个相对单位，相对的是设备像素(device pixel)。显示器上的小色框就是像素。

## 设备无关像素与CSS像素之间的关系 —— 页面缩放比

    页面缩放比 = CSS像素/设备无关像素

## 设备像素与设备无关像素之间的关系 —— DPR
**一般情况下，**

    设备像素比DPR = 设备像素/设备无关像素(在某一方向上，x方向或者y方向)

**缩放比为1时，** 设备无关像素等于CSS像素，因此

    设备像素比DPR = 设备像素/CSS像素(在某一方向上，x方向或者y方向)

缩放比为1时，iphone4下dpr=2，iphone6 plus及以后dpr=3。
以iphone6为例，iphone6的CSS像素为`375px*677px`，DPR是2，所以其设备像素为`750px*1354px`（x和y方向都乘了2）。

## 设备像素与CSS像素之间的关系
在PC端，CSS的1px往往等于一个设备像素。而在移动端，在不同的设备或不同的环境中，css中的1px所代表的设备物理像素是不同的。以iPhone为例，iPhone4之前的手机，屏幕像素密度都较低，CSS的1px等于一个设备像素。但从iPhone4开始，乔布斯提出了Retina视网膜屏的概念。此时一个CSS像素等于`（dpr*页面缩放比）`个设备像素。

## 获取DPR的方法
1. js获取：`window.devicePixelRatio`。

   打开控制台，输入`window.devicePixelRatio`。就可以看到当前设备的DPR。切换手机视图，再次输入，可以看到模拟的手机视图的DPR。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051223342343.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
上图中，第一个是PC端dpr，第二个是iPhoneX的dpr。
1. css媒体查询：`min-device-pixel-ratio`

# 关于视口
这部分内容中的图借用一下思否中的一篇文章：[关于移动端适配，你必须知道的](https://segmentfault.com/a/1190000019207842#item-5-10)
## 布局视口（layout viewport）
布局视口就是DOM的宽度。各浏览器默认的 layout viewport宽度一般都是800，980，1024等值。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200513000734627.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
### js获取
`document.documentElement.clientWidth`

`document.documentElement.clientHeight`
## 视觉视口(visual viewport)
视觉视口是可见视口，在PC端，浏览器窗口可以调整，视觉窗口等于整个浏览器的宽度，而在移动端，浏览器不能缩放，因此视觉视口即为屏幕的宽度。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200513000751297.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
### js获取
`window. innerWidth`

`window.innerHeight`

## 理想视口(ideal viewport)
理想视口的概念常用于移动端，使用户不需要缩放，也不需要出现横向滚动条，便可以正常看到网站的所有内容。

理想视口下，布局视口宽度 = 视觉视口宽度 = 设备宽度


由此也可以得到，

    当前缩放值 = ideal viewport宽度  / visual viewport宽度
### js获取
`screen.width`

`screen.height`

### 设置理想视口
```html
<meta name="viewport" content="width=device-width; initial-scale=1;">
```
关于initial-scale的默认值，安卓设备上没有明确的定义。在iphone和ipad上，无论你给viewport设的宽度是多少，如果没有指定默认的缩放值，则iphone和ipad会自动计算这个缩放值，以达到当前页面不会出现横向滚动条(或者说viewport的宽度就是屏幕的宽度)的目的。

比如在iPhone5下，不设置任何的viewport meta标签时，layout viewport的默认宽度为980px，但浏览器的visual viewport宽度为320px，因此`initial-scale = 320/890`，约为0.327。

# 移动端适配解决方案
## 1. viewport（scale=1/dpr）
```html
<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">
```
各个属性的含义：

![  ](https://img-blog.csdnimg.cn/20200513152156754.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

`device-width`等于理想视口的宽度，设置`width=device-width`就相当于让布局视口等于理想视口。

`initial-scale = 理想视口宽度 / 视觉视口宽度`，设置`initial-scale=1`就相当于让视觉视口等于理想视口。

这时，1个CSS像素就等于1个设备独立像素，而且我们也是基于理想视口来进行布局的，所以呈现出来的页面布局在各种设备上都能大致相似。

## 2. rem
rem是css3新增的一个相对单位。rem为相对HTML根元素的大小，除了IE8及更早的版本外，其他浏览器都支持rem。

阿里早期开源了一个移动端适配解决方案 —— flexible。通过这种方案，我们在页面上统一使用rem布局。

核心代码：
```js
// set 1rem = viewWidth / 10
function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
}
setRemUnit();
```

上面的代码中，将html节点的font-size设置为页面clientWidth(布局视口)的1/10，即1rem就等于页面布局视口的1/10，这就意味着我们后面使用的rem都是按照页面比例来计算的。

这样我们只需要将设计稿的px转成对应的rem即可。

在viewport和vw、vh存在兼容性问题的时候，阿里提出了这种解决方案。但是这种方案实际上是根据屏幕大小百分百还原设计稿，也就是说在屏幕大的设备上看到的元素会大一些，但是这个显然不符合我们的需求。用户使用更大的屏幕并不是为了看到更大的字，而更多地是为了看到更多的内容。

因此，这种方案最后被淘汰掉。

## 3. vm/vh
vh、vw方案即将视觉视口宽度 window.innerWidth 和视觉视口高度 window.innerHeight 等分为 100 份。

这种方案和上面的方案解决问题的思路一样。这个是需要将设计稿的px转成对应的vw，当然这种比例关系我们不用手动计算，webpack解析css时有个`postcss-px-to-viewport`插件，可以实现px到vw的自动转化。

这种方案同样存在上面提到的无法看更多内容的问题。另外，px转换成vw不一定能完全整除，因此有一定的像素差。

## 4. flex
关于flex弹性布局的用法可以参考阮一峰老师的这篇文章[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。在更大的屏幕上，flex布局可以完美地为用户呈现更多内容。

## 移动端适配整体流程
1. 在 head 设置 width=device-width 的 viewport‘
2. 在 css 中使用 px
3. 在适当的场景使用 flex 布局，或者配合 vw 进行自适应
4. 在跨设备类型的时候（pc <-> 手机 <-> 平板）使用媒体查询
5. 在跨设备类型如果交互差异太大的情况，考虑分开项目开发

# 1px问题及解决方案
## 1px问题
这里的1像素指的是CSS像素。因此我们可以发现，在写1px的时候，在不同dpr的物理设备上映射的设备像素是不同的。dpr为2时，映射的像素为2px；dpr3时就映射成3px。这样的话，如果在屏幕尺寸比较大的设备上（准确来说时设备像素比较大），1px渲染出来就样子就会有些粗。
## 解决方案
### 利用媒体查询 + css3的transform
利用媒体查询区分二倍屏和三倍屏，利用`transform:scale(xx)`对高度进行缩放。代码如下：
```css
/*二倍屏*/
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .my-border::after {
        transform: scaleY(0.5);
        webkit-transform: scaleY(0.5);
    }
}
/*三倍屏*/
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .my-border::after {
        transform: scaleY(0.33);
        webkit-transform: scaleY(0.33);
    }
}
```
### 小数写px(如0.5px)
IOS8下已经支持带小数的px值，安卓与低版本IOS不适用。另外，各个浏览器对小数px的实现方式也不相同。

# 小知识
浏览器默认字体为16px

浏览器最小字号12px

p代表的是纵向的像素数，1080p是指纵向有1080个像素

k代表的是横向的像素数，2k屏是指横向超过2048个像素的屏

# 参考链接

[https://juejin.im/post/5e6caf55e51d4526ff026a71](https://juejin.im/post/5e6caf55e51d4526ff026a71)

[https://segmentfault.com/a/1190000019207842#item-7-22](https://segmentfault.com/a/1190000019207842#item-7-22)

[http://html-js.com/article/MobileWeb](http://html-js.com/article/MobileWeb)

[https://www.jianshu.com/p/b13d811a6a76](https://www.jianshu.com/p/b13d811a6a76)
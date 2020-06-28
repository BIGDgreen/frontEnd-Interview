在此之前，清除一下浏览器的默认样式

```css
html,body {
	margin: 0;
	padding: 0;
}
```
ok，开始正文~

#  一、水平居中
## 1.块级元素水平居中
*注意点：需要设置父元素的width*
例：wrapper相对屏幕居中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191101142925133.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
html代码：
```html
<div class="wrapper">
	<div class="box"></div>
</div>
```
### 方法一:设置margin:0 auto

只要水平居中时，推荐使用！

```css
.wrapper {
	width: 100%;	/*默认也为100%*/
}
.box {
	margin: 0 auto;
	width: 100px;
	height: 100px;
	background-color: red;
}
```

### 方法二:设置flex布局
*注意点：需要设置父元素的width*
```css
.wrapper {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.box {
	width: 100px;
	height: 100px;
	background-color: red;
}
```
### 方法三:设置css3的transform

> 默认情况下，position的值为static（静止的、不可以移动的），元素在文档流里是从上往下、从左到右紧密的布局的，我们不可以直接通过top、left等属性改变它的偏移。所以，想要移动元素的位置，就要把position设置为不是static的其他值，如relative,absolute,fixed等。然后，就可以通过top、bottom、right、left等属性使它在文档中发生位置偏移（注意，relative是不会使元素脱离文档流的，absolute和fixed则会！也就是说，relative会占据着移动之前的位置，但是absolute和fixed就不会）。

设置了position: relative后的代码如下:
```css
.wrapper {
	width: 100%;
}
.box {
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	width: 100px;
	height: 100px;
	background-color: red;
}
```
## 2.行内元素水平居中
> 行内元素（内联元素）
>  (1) 不占据一整行，随内容而定
> 	(2) 不可以设置宽高，也不可以设置行高，其宽度随着内容增加，高度随字体大小而改变
> (3) 内联元素可以设置外边界，但是外边界不对上下起作用，只能对左右起作用
> (4) 也可以设置内边界，但是内边界在ie6中不对上下起作用，只能对左右起作用


为了确保行内元素`span`的长宽不为0，我们在元素中写入一些文字，使元素长宽即为文字长宽。
ps：要想达到空行内元素的居中效果，需要先将行内元素设置为块级元素，然后按块级元素的居中方法设置。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191106130405324.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
html代码：

```html
<div class="wrapper">
	<span class="box">aaa</div>
</div>
```

### 行内元素在块级元素中水平居中
#### 方法一：将外层块级元素设置为text-align：center
```css
.wrapper {
	text-align: center;
}
.box {
	background-color: red;
}
```
#### 方法二：将行内元素设置为块级元素
```css
.wrapper {
}
.box {
	width: 20%;		/*这时如果不设置width，则默认为100%*/
	display: block;
	margin: o auto;
	background-color: red;
}
```

## 3.元素内部文字水平居中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191101152455938.png)
### 1）块内文字水平居中
#### 方法：text-align：center
html代码：

```html
<div class="wrapper">
	<div class="box">水平居中</div>
</div>
```

```css
.box {
	width: 100px;
	height: 100px;
	background-color: red;
	text-align: center;
}
```
### 2）行内文字水平居中
行内元素不存在宽度这一概念，它的宽度即为内部元素宽度，因此他内部的元素一定是居中的。
当然，如果一定要设置，可以将行内元素转化为块级元素，达到内部文字居中效果（不过没有什么必要）。

```html
<div class="wrapper">
	<span class="box">水平居中</div>
</div>
```
```css
.box {
	width: 100px;
	height: 100px;
	background-color: red;
	display: block;
	text-align: center;
}
```
#  二、垂直居中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191101153537508.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
## 1）块级元素的内部元素垂直居中
行内元素本身不存在高度，所以也不会也内部元素居中的概念。
*注意点：需要设置父元素的height，这里为了方便设置为100vh*
html:
```html
<div class="wrapper">
	<div class="box"></div>
</div>
```
### 方法一：flex布局（块级元素、行内元素都可）
```css
.wrapper {
	height: 100vh;     /*将高度设置为屏幕高，默认height随内部元素高度变化而变化*/
	display: flex; 		/*行内元素为inline-flex*/
	flex-direction: column;
	justify-content: center;
}
.box {
	width: 50px;
	height: 50px;
	background-color: red;
}
```
据我观察，`div`和`span`元素的`display`属性均可以设置为`flex`或`inline-flex`。也就是说，当使用flex时，是不看元素为`div`还是`span`的，但是，`flex`和`inline-flex`却有着明显的区别：
`display:inline-flex;`时
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191102173706750.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
`display:flex;`时
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191102173716899.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
以上蓝色部分均为div.wrapper。
可以看到，**flex时，wrapper宽度为整个屏幕宽；inline-flex时，wrapper宽度仅为内部元素的宽度。**
### 方法二：css3 transform属性（对行内元素无效）
```css
body {
	margin: 0;
	padding: 0;
}
.wrapper {
	height: 100vh;     /*将高度设置为屏幕高，默认height随内部元素高度变化而变化*/
}
.box {
	position: relative;   /*脱离文档流*/
	top: 50%;
	transform: translateY(-50%); 
	width: 50px;
	height: 50px;
	background-color: red;
}
```
## 2）元素内文字垂直居中
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019110219513512.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
```html
<div class="wrapper">
	<div class="box">aaa</div>
</div>
```
### 1.设置line-height和height相同（仅在容器宽高固定时有效，那么当宽高为百分比时无效）

```css
.wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;	/*以上的flex是为了使wrapper在屏幕中水平垂直居中*/
	width: 100%;
	height: 100vh;
}
.box{
	width: 50px;
	height: 50px;
	background-color: red;
	line-height: 50px;
}
```
### 2.flex布局
```css
.wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;	/*以上的flex是为了使wrapper在屏幕中水平垂直居中*/
	width: 100%;
	height: 100vh;
}
.box{
	display: flex;
	flex-direction: row;
	align-items: center;  /*以上的flex是为了使文字在box中垂直居中*/
	width: 50px;
	height: 50px;
	background-color: red;
}
```

## 附：css2的vertical-align属性（对块级元素无效）
首先要说明的是，该属性不适用于将元素相对屏幕垂直居中，一般用于指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式

> 该属性定义**行内元素**的基线相对于该元素所在行的基线的垂直对齐。允许指定负长度值和百分比值。这会使元素降低而不是升高。在表单元格中，这个属性会设置单元格框中的单元格内容的对齐方式。
> 因此，对于块级元素，该属性不起作用。

网上也有很多关于这个属性的说明，这里不再多说。详细可以参看这篇文章：[https://segmentfault.com/a/1190000015366749](https://segmentfault.com/a/1190000015366749)
不过我更倾向于使用flex
# 三、水平垂直居中
## 1.块级元素水平垂直居中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191102192155583.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
```html
<div class="wrapper">
	<div class="box"></div>
</div>
```
其实也就是将上面的写法结合一下，这里列出两种方法：
同样，我们需要设置父元素的宽、高。其中，width默认为100%；height默认为内部元素高度，这里依然以100vh也就是整个屏幕高度为例。
### 1）flex布局：设置父元素flex属性
```css
.wrapper {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.box{
	width: 50px;
	height: 50px;
	background-color: red;
}
```
### 2）flex布局：设置子元素margin:auto
```css
.wrapper {
	width: 100%;
	height: 100vh;
	display: flex;
}
.box{
	margin: auto
	width: 50px;
	height: 50px;
	background-color: red;
}
```
### 3）使用css3 transform属性
```css
.wrapper {
	width: 100%;
	height: 100vh;
}
.box{
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 50px;
	height: 50px;
	background-color: red;
}
```
### 4）使用absolute定位

```css
.wrapper {
	width: 100%;
	height: 100vh;
	position: relative;
}
.box{
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -50px; /*height的一半*/
	margin-left: -50px; /*width的一半*/
	width: 100px;
	height: 100px;
	background-color: red;
}
```
### 5）absolute定位+margin:auto

```css
.wrapper {
	width: 100%;
	height: 100vh;
	background-color: #666;
	position: relative;	/*由于这里wrapper为整个屏幕，所以不加也可以，但当父容器为其他宽高时，这一项必须加上*/
}
.box{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	width: 100px;
	height: 100px;
	background-color: red;
}
```

## 2.元素内文字水平垂直居中
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191102192920601.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
html：

```html
<div class="wrapper">
	<div class="box">aaa</div>
</div>
```

### 方法一：设置text-align和line-height
```css
.wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;	/*以上的flex是为了使wrapper在屏幕中水平垂直居中*/
	width: 100%;
	height: 100vh;
}
.box{
	width: 50px;
	height: 50px;
	background-color: red;
	text-align: center;
	line-height: 50px;  /*与height值相同*/
}
```

### 方法二：flex布局(都可)
```css
.wrapper {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;   /*以上的flex是为了使wrapper在屏幕中水平垂直居中*/
	width: 100%;
	height: 100vh;
}
.box{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;		/*以上的flex是为了使box内的文字相对box水平垂直居中*/
	width: 50px;
	height: 50px;
	background-color: red;
}
```



# 综上所述，flex布局近乎全能，要好好掌握！！
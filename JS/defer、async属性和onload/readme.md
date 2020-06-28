首先看一下defer和async属性与html解析的时间关系
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191107112804564.png) 
在这里，可以看到，

 1. 浏览器解析HTML时，如果遇到不带任何属性的script脚本，HTML解析会被阻塞，直到script执行完成，才继续解析
 2. 浏览器解析HTML时，如果遇到带defer属性的script脚本，HTML解析与script加载并行发生，但script的执行要等到所有的HTML解析完成后才会发生
 3. 浏览器解析HTML时，如果遇到带async属性的script脚本，HTML解析与script加载并行发生，但在script执行时，HTML解析被阻塞，script执行结束后，继续HTML解析

## 一、延迟执行脚本
<font color="purple">defer属性</font>
设置这个属性相当于告诉浏览器：可以立即下载JS代码，但不要立即执行！
即使把< script >标签放在< head >标签中，其中的脚本也将延迟到浏览器遇到< /html >标签后再执行。
<font color="red"><b>注：defer属性只适用于外部脚本。</b></font>
<b>使用方法：</b>
```html
<!doctype html>
<html>
<script type="text/javascript defer src="test1.js"></script>
</head>
<body>
<!-- balbalbalbal~ -->
</body>
</html>
```
但其实，这个并不建议被使用。最好的选择还是将延迟脚本放在页面底部。
## 二、异步响应脚本
<font color="purple">async属性</font>（async adj.异步的）
与defer类似，<font color="red">只适用于外部脚本文件</font>,并告诉浏览器立即下载文件。
与defer**不同**的是，标记为async的脚本并不保证按照指定它们的先后顺序执行。（也就是说，谁在上面谁在下面都没有关系~ 所以，你必须要确保两个文件是独立的，它们没有逻辑顺序的关联。）
<b>使用目的</b>：不让页面等待所有的脚本文件下载完后再执行，从而异步加载页面的其他内容。（也就是告诉用户我们的进程正在进行中，不要万念俱灰地离开~）

## 三、页面初始化事件函数window.onload
一般来说，用了没有定义的变量，系统会报错，比如：
```html
//第一个代码块
<script>
alert(a);
f();
</script>
//第二个代码块
<script>
var a=1;
function f(){}
alert(1);
</script>
```
由于程序是从上往下执行的，这个是无法运行的。
但是！Javascript响应操作是通过事件驱动的模式实现的。

> 事件驱动就是指在持续事务管理过程中，进行决策的一种策略，即跟随当前时间点上出现的事件，调动可用资源，执行相关任务，使不断出现的问题得以解决，防止事务堆积。<b>简单地说就是你点什么按钮（即产生什么事件），电脑执行什么操作（即调用什么函数）</b>——百度百科

由于事件发生的不确定性，Javascript事件响应的顺序也是不确定的。但有的时候，要先读一个文档才能让脚本执行。这时候，我们有两种方法解决这个问题：
 1. 将脚本代码放在网页的底端，运行脚本代码的时候，可以确保要操作的对象已经加载完成。
 2. 通过window.onload来执行脚本代码。

这里就用一下下第二种方案。将上面那个错误代码改成：

```html
//第一个代码块
<script>
window.onload=function(){
alert(a);
f();
}
</script>
//第二个代码块
<script>
var a=1;
function f(){
alert(1);
}
</script>
```

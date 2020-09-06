<!--
 * @Author       : BigDgreen
 * @Date         : 2020-06-28 17:27:19
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-22 17:27:18
 * @FilePath     : \前端知识点总结\面试\性能优化\readme.md
-->
# 图片的懒加载和预加载
## 预加载
预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。常用于hover时的图片交替，这样可以防止图片闪烁。
## 懒加载
懒加载就是当图片出现在可视区域范围内时再请求图片资源，而不是一开始就请求。

懒加载的实现原理主要是先将所有图片的src设置为一个内存比较小的占位图，等图片到可视区时，将图片的src替换为他真正的链接。
# 页面白屏如何排错
1. 先确保网络连接通畅。
2. 查看网络url地址是否输入有误。
3. 打开控制台查看报错信息。
4. 查看接口访问是否有请求。
5. 查看路由是否有path或者name的错误，导致加载了不存在的页面。
# 如何减少白屏时间和首屏时间
## FP和FCP
可以在控制台输入`window.performance.getEntriesByType('paint')`来获取`First Paint`（FP：文档中任意元素首次渲染时间，首屏时间）和`First Contentful Paint`（FCP：第一次有内容的渲染，白屏时间）。

FP(First Paint)：页面在导航后首次呈现出不同于导航前内容的时间点。
FCP(First Contentful Paint)：首次绘制任何文本，图像，非空白canvas或SVG的时间点。
## 减少白屏时间和首屏时间的方式
1. 将script放在body后面（原因可以看这篇文章[将script放在body中内容的最后的原因详解](https://blog.csdn.net/qq_42532128/article/details/102979020)）
2. 减少head里的css资源，图片gzip
3. 资源动态加载（路由、组件、图片）
4. 做一些缓存
5. 在首屏加载完成之前，通过渲染一些简单元素进行占位（骨架屏）
6. 引入http2.0
7. 选择先进的图片格式，使用 JPEG 2000, JPEG XR, and WebP 的图片格式来代替现有的jpeg和png
8. 做一些http压缩。http压缩通常是通过在`reponse header`指定`Content-Encoding`首部，告诉客户端`response`的压缩格式，这样客户端才能正确解压。最常用gzip（压缩率和兼容性都较好），新出来br（压缩率很高，兼容性不是很好）

代码优化：HTML不要嵌套太多层（否则会加重页面layout的压力），css选择器别写的太复杂（不然计算量会很大），js不要滥用闭包（闭包会加深作用域链，加长变量查找时间）

# 浏览器卸载旧页面到新页面加载完成的整个过程（window.performance.timing） 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200406194556618.png)
# 总结一下性能优化方式
**除了**上面提到的图片懒加载和减少白屏时间和首屏时间的方式以外，在补充下面几点：
1. js尽可能少的操作DOM，减少回流，适当地使用事件委托
2. 注意手动释放不需要再使用的对象，防止内存泄漏（关于内存泄漏，可以看一下这篇文章：[关于JavaScript的内存泄漏](https://blog.csdn.net/qq_42532128/article/details/105019459)）
3. 减少http请求数，这个可以通过设置http缓存、资源合并来实现
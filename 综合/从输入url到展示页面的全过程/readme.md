## DNS解析
解析过程：

可能经过CDN调度

考虑 dns-prefetch 优化

## TCP三次握手 四次挥手
tcp将http长报文划分为短报文，通过三次握手与服务端建立连接，进行可靠传输。

### tcp/ip的并发限制
浏览器对同一域名下并发的tcp连接是有限制的（2-10个不等）。

而且在http1.0中往往一个资源下载就需要对应一个tcp/ip请求。

所以针对这个瓶颈，又出现了很多的资源优化方案。


## get和post的区别

get和post虽然本质都是tcp/ip，但两者除了在http层面外，在tcp/ip层面也有区别。

get会产生一个tcp数据包，post两个。

具体就是：

- get请求时，浏览器会把 headers和 data一起发送出去，服务器响应200（返回数据），

- post请求时，浏览器先发送 headers，服务器响应 100continue，浏览器再发送 data，服务器响应200（返回数据）。

再说一点，这里的区别是 specification（规范）层面，而不是 implementation（对规范的实现）


cookie rsa非对称加密


浏览器输入url，浏览器主进程接管，开一个下载线程，
然后进行 http请求（略去DNS查询，IP寻址等等操作），然后等待响应，获取内容，
随后将内容通过RendererHost接口转交给Renderer进程

- 浏览器渲染流程开始

解析html建立dom树
解析css构建render树（将CSS代码解析成树形的数据结构，然后结合DOM合并成render树）
布局render树（Layout/reflow），负责各元素尺寸、位置的计算
绘制render树（paint），绘制页面像素信息
浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上。


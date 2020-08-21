# cookie有哪些字段
`name`：名称

`value`：值

`domain`：可以访问此cookie的域名

`path`：可以访问此cookie的页面路径

`expires/Max-Age`：此cookie超时时间。不设置的话默认值是Session，意思是cookie会和Session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。

`Size`：此cookie大小

`http字段`：cookie的httponly属性。若为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie（可以一定程度上地防止信息盗取）。

`secure`字段：设置是否只能通过https来传递此条cookie

# http和https的区别，TLS握手的过程
这个是高频考点。

`http+加密+认证+完整性保护` 就得到https，而这些是通过`SSL/TLS`层实现的。

避免中间人攻击。

![整体流程](https://user-gold-cdn.xitu.io/2018/5/21/1638197d98cf3281?imageslim)

下面这个图是我在《图解HTTP》中截取的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404220534558.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

# http2
目标：改善用户在使用Web时的速度体验。

主要基于SPDY协议。它是Google开发的基于TCP协议的应用层协议。目标是优化HTTP协议的性能，通过压缩、多路复用和优先级 等技术，缩短网页的加载时间并提高安全性。SPDY协议的核心思想是尽量减少TCP连接数。SPDY并不是一种用于替代HTTP的协议，而是对HTTP协议的增强。

特点：
1. 二进制传输：二进制帧层，指HTTP消息在客户端和服务端如何封装和传输。与HTTP1.x的采用的换行符分隔文本不同，HTTP/2 消息被分成很小的消息和frame,然后每个消息和frame用二进制编码。
   
2. 多路复用：所谓多路复用，即在一个TCP连接中存在多个流，即可以同时发送多个请求。在客户端帧乱序发送，到对端后再根据每个帧首部的流标识符重新组装。
3. Header压缩：使用 HPACK（HTTP2头部压缩算法）压缩格式对传输的header进行编码。并在两端维护了索引表，用于记录出现过的header，后面在传输过程中就可以传输已经记录过的header的键名，对端收到数据后就可以通过键名找到对应的值。
4. 服务器推送：在 HTTP2.0 中，服务端可以在客户端某个请求后，主动推送其他资源。
   
# DNS（域名）解析步骤与原理
域名 -> IP地址

TTL：域名解析信息在DNS中的存在时间

1. 浏览器自身缓存查找，域名被缓存的时间也可通过TTL属性来设置
   
2. 操作系统缓存查找（C盘hosts 只读）
3. 请求本地域名服务器Local DNS Server（80%找到）
4. 请求Root DNS，返回gTLD Server（国际顶尖域名服务器）给LDNS，LDNS请求gTLD，gTLD查找并返回域名对应的Name Server地址（网站注册的域名服务器）
5. Name Server根据映射关系表找到目标ip，返回给LDNS
6. LDNS缓存这个域名和对应的ip
7. LDNS把解析的结果返回给用户，用户根据TTL值缓存到本地系统缓存中，域名解析过程至此结束

# 域名发散和域名收敛
域名发散：PC 时代对静态资源优化时，通常将静态资源分布在几个不同域，保证资源最完美地分域名存储，以提供最大并行度，让客户端加载静态资源更为迅速。

域名收敛：移动端减少DNS解析时间

# 跨域问题
基于同源策略。当协议、域名、端口至少有一个不一致时就会发生跨域。

同源策略限制的内容有：
- cookie、localStorage、sessionStorage、indexedDB等存储型内容
- DOM节点
- ajax请求

允许跨域加载资源的标签：
- `<img src=xxx>`
- `<script src=xxx>`
- `<link href=xxx>`
  
跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是**结果被浏览器拦截了**。这也说明了跨域并不能完全阻止 `CSRF`，因为请求毕竟是发出去了。

## 解决跨域的方案
1.	JSONP。利用`<script>`标签不发生跨域的特点，在服务器链接的参数中加入`callback`回调函数，通过这个回调函数获取服务端要传来的值。只能用于GET请求。
2.	CORS，跨域资源共享。在服务端设置响应头`Access-Control-Allow-Origin`为客户端的地址。表示对这个连接放行。如果要传递cookie的话，需要在客户端设置`xhr.withCredentials = true`，在服务端设置响应报文`Access-Control-Allow-Credentials`为true。

    通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为**简单请求**和**复杂请求**。

3.	设置代理服务器转发。这种方式实际上还是同源。因此服务器之间的通信不存在跨域的问题，所以可以设置一个与客户端同源的代理服务器作为中间人。（代理是设置哪一项）
4. websocket
5. postMessage，`postMessage()`方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。
   ```js
   otherWindow.postMessage(message, targetOrigin, [transfer]);
   ```

## 简单请求和复杂请求

简单请求需要同时满足以下条件：
1. 使用的方法为`GET`/`HEAD`/`POST`
2. `Content-Type`为`text/plain`/`multipart/form-data`/`application/x-www-form-urlencoded`

不符合以上条件的请求就肯定是复杂请求了。 复杂请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。

## 优化OPTIONS请求
设置`Access-Control-Max-Age`字段，那么当第一次请求该URL时会发出 `OPTIONS` 请求，浏览器会根据返回的 `Access-Control-Max-Age` 字段缓存该请求的`OPTIONS`预检请求的响应结果（具体缓存时间还取决于浏览器的支持的默认最大值，取两者最小值，一般为 10分钟）。在缓存有效期内，该资源的请求（ **URL和header字段都相同的情况下** ）不会再触发预检。（chrome 打开控制台可以看到，当服务器响应 `Access-Control-Max-Age` 时只有第一次请求会有预检，后面不会了。注意要开启缓存，去掉 `disable cache` 勾选。）

## postMessage可以解决的问题
- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
- 页面与嵌套的iframe消息传递
- 上面三个场景的跨域数据传递

# XSS和CSRF攻击
## XSS
跨域脚本攻击，指的是攻击者将攻击脚本代码恶意注入传给服务器，就比如填写表单时，填入一段script代码盗用cookie。

可以通过设置一个过滤器避免、采用含有HttpOnly标志的Cookie在HTTP响应头Set-Cookie。
## CSRF
跨域请求伪造，一般通过钓鱼链接。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404221134630.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
防范CSRF可遵循以下几种规则:
1.	Get 请求不对数据进行修改
2.	不让第三方网站访问到用户Cookie
3.	阻止第三方网站请求接口
4.	请求时附带验证信息，如验证码或Token(这种情况下会发送预检请求)
## XSS攻击，Cookie相关的字段，HttpOnly
cookie中设置HttpOnly属性，那么通过js脚本将无法读取到cookie信息，这样能有效的防止XSS攻击。

## CSRF攻击，Cookie的SameSite字段
Chrome 51 开始，浏览器的 Cookie 新增加了一个SameSite属性，用来防止 CSRF 攻击和用户追踪。Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险。

可以设置三个值：
1. Strict：完全禁止第三方Cookie
2. Lax（Chrome默认）：只有导航到目标网址的 GET 请求才发送Cookie，这只包括三种情况：链接，预加载请求，GET 表单
3. None：关闭该属性。不过，前提是必须同时设置Secure属性（Cookie 只能通过 HTTPS 协议发送），否则无效。
   
# 常见状态码及含义
1xx 信息性状态码，表示接收的请求正在处理
  - 100（请求以被部分处理）、101（切换协议）

2xx 成功状态码，表示请求正常处理完毕
  - 200（请求成功）、204（请求处理成功，但没有内容返回）、206（返回指定范围的内容）

3xx 重定向状态码，表示需要进行附加操作以完成请求
   - 301（永久重定向）、302（临时重定向）、303（临时重定向，但要求使用GET方法）、304（请求资源未更改，直接使用缓存）

4xx 客户端错误状态码，表示服务器无法处理请求
   - 400（请求出错）、401（未授权）、403（被服务器拒绝访问）、404（服务器上没有请求的资源）

5xx 服务器错误状态码，表示服务器请求出错
   - 500（服务器内部错误）、503（服务器暂时无法处理请求）

这里需要注意一下200和304在浏览器协商缓存下的作用。

# fetch和ajax的区别
fetch是xhr的替代品。
ajax利用XMLHttpRequest对象来请求数据。ajax代码就不再贴出了，想看的可以去这里[前端面试之JavaScript篇](https://blog.csdn.net/qq_42532128/article/details/105316034)。（日常打广告哈哈）
fetch 是全局量 window 的一个方法。特点：
1. fetch是基于promise实现的，也可以结合async/await。
2. fetch请求默认是不带cookie的，需要设置fetch（URL，{credentials:’include’})
Credentials的三种参数：omit（从不发送cookie），same-origin（同源发送），include（始终发送）
3. 服务器返回400、500 状态码时并不会reject，只有网络出错导致请求不能完成时，fetch才会被reject
4. 所有版本的 IE 均不支持原生 Fetch

下面看一下fetch的用法：
```js
// 链式处理,将异步变为类似单线程的写法
fetch('/example').then(function(response) {
    return . //... 执行成功, 第1步...
}).then(function(returnedValue) {
    // ... 执行成功, 第2步...
}).catch(function(err) {
    // 中途任何地方出错...在此处理 :( 
});
```

# TCP三次握手/四次挥手
## 三次握手
发送端首先发送一个带SYN标志的数据包给对方。接收端收到后，回传一个带有SYN/ACK标志的数据包以示传达确认信息。最后，发送端再回传一个带ACK标志的数据包，代表握手结束。

若在握手过程中某个阶段莫名中断，TCP协议会再次以相同的顺序发送相同的数据包。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200405111702906.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)
以上信息来自《图解HTTP》。

“三次握手”的目的是“为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误”。
## 四次挥手
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200405112909886.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

想了解更多可以看一下这篇博客：[通俗大白话来理解TCP协议的三次握手和四次分手](https://github.com/jawil/blog/issues/14)。

![](https://camo.githubusercontent.com/92800a8405ffab35ba53a6fc2aa664385be4ab24/687474703a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f323434383735322d363030663232613930323432623536652e6a70673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

# TCP的流量控制和拥塞控制
## 流量控制
流量控制就是让发送方的发送速率不要太快，要让接收方来的及接收。

原理是通过确认报文中窗口字段来控制发送方的发送速率，发送方的发送窗口大小不能超过接收方给出窗口大小。
## 拥塞控制
拥塞控制就是防止发送方发的太快，使得网络来不及处理，从而导致网络拥塞

# TCP和UDP
TCP：面向连接、面向字节流、可靠传输、提供拥塞控制、仅支持单播传输、提供全双工通信

UDP：无连接、可单播多播和广播、面向报文、不可靠性、头部开销小

# WebSocket
WebSocket是一种在单个TCP连接上进行全双工通信的协议。主要是实现了服务器主动向客户端推送信息的功能。

想要具体了解可以看看阮一峰老师的这篇文章：[WebSocket 教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)。


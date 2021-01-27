<!--
 * @Author       : BigDgreen
 * @Date         : 2020-06-30 19:53:37
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2021-01-08 21:17:24
 * @FilePath     : \前端知识点总结\浏览器\浏览器缓存\readme.md
-->
DNS缓存和页面资源缓存

# cookie
## cookie的特点

- cookie是存储在浏览器的一段 **字符串**，最大为4kb。
- 跨域不共享。浏览器为每个 **域名** 都存储了cookie，不同域名中存储的cookie是互相隔离的。
- 格式如 `key=value;` 可以存储结构化数据。
- 每次发送http请求，都会将本次请求的`请求域`的cookie一起发送给server端。
- 同域名，cookie可以共享
- server 端可以修改cookie并返回给浏览器。
- 浏览器中也可以通过js修改cookie（有限制）

## 浏览器查看cookie的三种方式

1. Network 里面请求头 `Cookie`
   Network里面响应头 `Set-Cookie`
2. application 中 Cookies
3. 控制台`document.cookie`

## 修改cookie（有限制）

追加值：控制台输入 `document.cookie = 'k1=val1';`

限制：设置`httpOnly`

# Service Worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。

Service Worker 实现缓存功能一般分为三个步骤：
1. 注册 Service Worker
2. 监听到 `install` 事件，缓存需要的文件
3. 用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据

   以下是这个步骤的实现：
   ```js
      // index.js
      if (navigator.serviceWorker) {
      navigator.serviceWorker
         .register('sw.js')
         .then(function(registration) {
            console.log('service worker 注册成功')
         })
         .catch(function(err) {
            console.log('servcie worker 注册失败')
         })
      }
      // sw.js
      // 监听 `install` 事件，回调中缓存所需文件
      self.addEventListener('install', e => {
      e.waitUntil(
         caches.open('my-cache').then(function(cache) {
            return cache.addAll(['./index.html', './index.js'])
         })
      )
      })

      // 拦截所有请求事件
      // 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
      self.addEventListener('fetch', e => {
      e.respondWith(
         caches.match(e.request).then(function(response) {
            if (response) {
            return response
            }
            console.log('fetch source')
         })
      )
      })
   ```

# server端操作cookie

# redis

redis为内存中的数据库。相比mysql来说，查询速度更快。断电可能会丢失。

- 适合存放访问频率较高
- 数据量小
- 丢失了问题也不大的数据

比如session。

# mysql

- 操作频率不太高
- 断电不丢失
- 数据量大

# 浏览器缓存策略

## 缓存位置

从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络。

1. Service Worker（可以自由控制，缓存是持续性的）
2. Memory Cache（内存，读取速度快，持续性很短，会随着进程的释放而释放，容量小）
3. Disk Cache（磁盘，读取速度较慢，容量大，时效长，即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据）
4. Push Cache（HTTP/2）
5. 网络请求

## 缓存策略

浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 `HTTP Header` 来实现的。

如果什么缓存策略都没有设置，那么浏览器会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。

### 强缓存
强缓存可以通过设置两种 HTTP Header 实现：`Expires` 和 `Cache-Control` 。强缓存表示在缓存期间不需要请求，`state code` 为 200。

`Cache-Control` 与 `Expires` 可以在服务端配置同时启用，同时启用的时候 `Cache-Control` 优先级高。
### Expires
该字段是 http1.0 时的规范，它的值为一个绝对时间的 GMT 格式的时间字符串，比如 `Expires:Mon,18 Oct 2066 23:59:59 GMT`，表示资源在 `Mon,18 Oct 2066 23:59:59 GMT` 后过期。

**缺点：** `Expired` 受限于本地时间，修改本地时间可以导致缓存失效。同样，当服务器与客户端时间偏差较大时，就会导致缓存混乱。
### Cache-Control
`Cache-Control:max-age=3600`，代表着资源在 3600 秒后过期。

### 协商缓存

当强缓存没有命中的时候，浏览器会发送一个请求到服务器，服务器根据 header 中的部分信息来判断是否命中缓存。如果命中，则返回 304，告诉浏览器资源未更新，可使用本地的缓存，并更新浏览器缓存有效期。

这里的 header 中的信息指的是 `Last-Modify/If-Modify-Since` 和 `ETag/If-None-Match`。

ETag 优先级比 Last-Modified 高。

#### Last-Modify/If-Modify-Since

response header: Last-Modify

request header: If-Modify-Since

浏览器第一次请求一个资源的时候，服务器返回的 header 中会加上 `Last-Modify`，`Last-modify` 是一个时间标识该资源的最后修改时间。

当浏览器再次请求该资源时，request 的请求头中会包含 `If-Modify-Since`，该值为缓存之前返回的 Last-Modify。服务器收到 `If-Modify-Since` 后，根据资源的最后修改时间判断是否命中缓存。

如果命中缓存，则返回 304，并且不会返回资源内容，并且不会返回 `Last-Modify`。

但是 Last-Modified 存在一些弊端：

1. 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新get；

2. 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源；

3. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，if-modified-since 能检查到的粒度是秒级的，这种修改无法判断，或者说 UNIX 记录 MTIME 只能精确到秒)；

4. 某些服务器不能精确地得到文件的最后修改时间。

#### ETag/If-None-Match

response header: ETag（文件指纹）

request header: If-None-Match

# 缓存策略实际应用场景
## 频繁变动的资源
对于频繁变动的资源，首先需要使用 `Cache-Control: no-cache` 使浏览器每次都请求服务器，然后配合 `ETag` 或者 `Last-Modified` 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

## 代码文件
这里特指除了 HTML 外的代码文件，因为 HTML 文件一般不缓存或者缓存时间很短。

一般来说，现在都会使用工具来打包代码，那么我们就可以对文件名进行哈希处理，只有当代码修改后才会生成新的文件名。基于此，我们就可以给代码文件设置缓存有效期一年 Cache-Control: max-age=31536000，这样只有当 HTML 文件中引入的文件名发生了改变才会去下载最新的代码文件，否则就一直使用缓存。
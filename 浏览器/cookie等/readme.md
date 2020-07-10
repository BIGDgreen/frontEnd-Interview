# cookie的特点
- cookie是存储在浏览器的一段**字符串**，最大为5kb。
- 跨域不共享。浏览器为每个域名都存储了cookie，不同域名中存储的cookie是互相隔离的。
- 格式如 `key=value;` 可以存储结构化数据。
- 每次发送http请求，都会将本次请求的`请求域`的cookie一起发送给server端。
- 同域名，cookie可以共享
- server端可以修改cookie并返回给浏览器。
- 浏览器中也可以通过js修改cookie（有限制）

# 浏览器查看cookie的三种方式
1. Network里面请求头 `Cookie`
   Network里面响应头 `Set-Cookie`
2. application中Cookies
3. 控制台`document.cookie`


## 修改cookie（有限制）
追加值：控制台输入 `document.cookie = 'k1=val1';`

限制：设置`httpOnly`

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

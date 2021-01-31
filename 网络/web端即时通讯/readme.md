# Web 端即时通讯技术
## 短轮询
```js
var xhr = new XMLHttpRequest();
setInterval(function(){
    xhr.open('GET','/user');
    xhr.onreadystatechange = function(){

    };
    xhr.send();
},1000)
```

## 长轮询

```js
function ajax(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/user');
    xhr.onreadystatechange = function(){
          ajax();
    };
    xhr.send();
}
```

## Comet

## SSE

## Websocket
websocket的最大特点就是：服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

![](https://s1.ax1x.com/2020/07/13/UJ5vFO.png)

特点：
1. 全双工通信
2. 建立在 TCP 协议之上，服务器端的实现比较容易
3. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器
4. 数据格式比较轻量，性能开销小，通信高效
5. 可以发送文本，也可以发送二进制数据
6. 没有同源限制，客户端可以与任意服务器通信
7. 协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

`webSocket.readyState`
```
CONNECTING：值为0，表示正在连接。
OPEN：值为1，表示连接成功，可以通信了。
CLOSING：值为2，表示连接正在关闭。
CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
```

路由懒加载：webpackjsonp
# vue runtime + complier
## runtime 运行时
生命周期

VNode 存在于内存中


```js
patch() {
    document.getElementBy('...').appendChild('');
}
```

diff：两棵树（新树和旧树）对比的过程，有变化就patch

patch：修改真实DOM的动作 VNode到真实DOM

虚拟dom树的递归 慢  缓冲地带

react -> fiber

vue
dom

pull：主动发出的动作 -> dom 修改  -> diff
push； 一个组件对应一个watcher 组件内部用diff
    watcher： 修改、生成dom的操作
    watcher 内存 运行时存在


## compiler 编译时
vue 在线编译

# vue首屏优化
vue如何优化加载速度，白屏如何解决

## 浏览器绘制渲染流程（浏览器一帧渲染）
render Process

栅格化：CPU数据处理成GPU数据的过程

GPU：绘制

requestAnimationFrame（API）：设置动画事件

## 优化页面展示的指标
**FP（First Paint）** 第一个像素点落地的时候（第一帧数据渲染出来）
Parse HTML -> 第一帧数据

`<div id="app"></div>`

HTML页面加载下来

骨架屏

**FCP（First Contentful Paint）** 首次内容绘制（第一次把有内容的东西绘制出来）

css js 静态资源加载下来 

页面大致结构出现
 FCP时间提前 —— 減少白屏

**FMP（First Meaningful Paint）** 首次有效绘制

ajax请求的数据加载下来

内容全部填充完毕

**资源和网络优化**

1. 预加载preload
2. webpack打包方案
   prefetch <link rel='prefetch' href='//...'>
   link prefetch
   dns prefetch
   prerendering <link rel='prerendering' href='//...'>

3. preconnect
   http dns TLS（加密） tcp

webpack 
CommonsChunkPlugin插件 -> splitChunksPlugin插件
dll

worker

- web worker  postMessage算法 结构化克隆算法（序列化和反序列化）
- sharedArrayBuffer
- shared worker
- service worker  实现： PWA 本地缓存
  - service worker声明周期


## vue优化

1. 全部打包到main.js => 动态加载路由，提取公共组件

`plugin-syntax-dynamic-import` => 路由动态加载的库（babel中）

```js
Vue.component('async-component', resolve => {
    import('./AsyncComponent.js')
    .then(AsyncComponent => {
        resolve(AsyncComponent.default);
    });
})
```

`optimization.splitChunks`提取公共组件

2. ssr 预渲染 同构
   
- ssr：服务端渲染（对于php jsp）
  
  vue -> json -> vue-server-renderer -> html

- 同构：一套代码，多端使用（对于vue react nuxt）
  
  请求 -> node(vue项目) -> 解析 -> 转换成html -> 客户端

  扛不住并发

- 预渲染：预先渲染 webpack vue打包出来的项目js放到 **无头游览器** 执行 -> 获取到预渲染的页面html内容 -> index.html -> 放到CDN  FCP/FMP提前到FP

3. 加loading -> 骨架屏 -> 预渲染
4. webpack entry 改为多页应用
5. 资源请求时间片的处理
6. CDN
7. quickLink：在浏览器空闲的时候去解析预加载可能要跳转的页面
   
   > preload
   > 
   > `<link rel="preload">` 
   > 
   > 浏览器预加载是提前加载在html中声明的资源。
   > 
   > `preload` 允许控制浏览器何时加载，可以动态注入，不会阻塞`window.onload`，只专注于当前页面。设定浏览器资源加载的优先级。

   > prefetch
   >
   > 1. `<link rel='prefetch' href='/pic.png' />`
   > 2. DNS预解析 `<link rel='dns-prefetch' href='xxx.com'>` 移动端优化

   > prerender 在后端页面已经渲染完毕
   >
   >  `<link rel='prerender' href='/pic.png' />`
   
   > preconnect 允许一个http请求正式发给服务器前预先执行一些操作
   >
   > DNS解析 TLS协商 TCP握手
   >
   > `<link rel='prerender' href='/pic.png' />`
webpack plugin插件

# vue数据监听
Object.defineProperty() 不止是监听数据变化

vue 浏览器端渲染 CSR

实现一个数据的深拷贝 序列化 反序列化

## 数据双向绑定

```js
new Vue({
    el: '',
    data: {
        text: 1
    }
})
```

Object.defineProperty({
    text: 1
})

{{text}} -> 页面渲染数据 -> getter
this.data.text = 1  -> setter

1. Object.defineProperty()能不能监听数组 有哪些性能问题 怎么重写对数组的监听 怎么避免性能问题
   可以监听数组，不能对没有初始化键值的做监听

2. proxy有没有避免这些问题 proxy自身有哪些bug 怎么修复

vue重写数组：
1. defineProperty可以监听数组的变化
2. 数组连续存储，key会变化，当对象key变化时也不能监听
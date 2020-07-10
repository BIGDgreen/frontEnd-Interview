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
<div id="app"></div>

FCP（First Contentful Paint） 首次内容绘制（第一次把有内容的东西绘制出来）
页面大致结构出现
 FCP时间提前 —— 減少白屏

1. 骨架屏
2. 预渲染（静态渲染）
   静态内容放在本地先渲染，剩下内容留占位

   
FMP（First Mainingful Paint） 首次有效绘制
内容全部填充完毕

资源和网络优化
3. 预加载preload
4. webpack打包方案
   prefetch <link rel='prefetch' href='//...'>
   link prefetch
   dns prefetch
   prerendering <link rel='prerendering' href='//...'>

5. preconnect
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
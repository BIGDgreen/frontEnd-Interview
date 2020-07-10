ps：这一部分最常考的是vue的数据双向绑定原理和虚拟DOM。

# vue的特点
MVVM框架、数据双向绑定、轻量、渐进式框架、易上手、运行速度快。
不支持IE8及以下版本，不利于SEO，不适合大型项目开发。
# vue和react的区别
## 运行时性能
react中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。
vue组件的依赖会在渲染过程中自动追踪。
这使vue的开发者不用在开发时手动避免不必要的子组件的渲染。
## HTML&CSS
在React中，一切都是JavaScript。
而Vue的整体思想是拥抱经典的Web技术，并在其上扩展。
## 写法
react是类式的写法，api很少。与typeScript结合的更好。
vue是声明式写法，通过传入各种options，api和参数都很多。
# computed和watch有什么区别
1. 功能上：computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。
2. 是否调用缓存：computed中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而watch在每次监听的值发生变化的时候都会执行回调。
3. 是否调用return：computed中的函数必须要用return返回，watch中的函数不是必须要用return。

使用场景：
computed：当一个属性受多个属性影响的时候，使用computed，如购物车商品结算。
watch：当一条数据影响多条数据的时候，使用watch，如搜索框。

# vue生命周期
生命周期钩子函数：**beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed**。

这里要注意的是，不要在选项属性或回调上使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

下面是生命周期图示。（这都是搬运官网的~）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200405122033462.png)

# mounted和created的区别
created时节点还没渲染出来

# 组件传值
父传子：v-on props
子传父：$emit()
兄弟之间传值：

# keep-alive的使用和原理


# vue2的数据双向绑定（响应式原理）
vue的数据双向绑定是通过`数据劫持+观察者模式`实现的。

通过重写`Object.defineProperty()`的get和set属性实现数据劫持。当数据发生改变时会触发set方法，只要将一些需要更新的方法放进去就可以实现data更新view。

`Object.defineProperty()`只能将对象的属性改为getter/setter，而无法实现数组的双向绑定。
## 数组的更新方式
vue内部实现了一组观察数组的变异方法，如`push`，`pop`，`shift`，`unshift`，`splice`，`sort`，`reverse`其内部使用了数组的属性来实现数据的双向绑定。

# vue3的数据双向绑定
vue3通过proxy实现响应式。这种方式本身就能对对象和数组的新属性实现监听。
# vue虚拟DOM和diff算法
## 虚拟DOM
js在操作真实DOM时的代价是很大的。每当js操作DOM时，浏览器都会从头开始重新解析HTML文档。而且我们可以从下图中看到每一个DOM对象都是很庞大的（可以自己在控制台试一试）。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200406172533391.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQyNTMyMTI4,size_16,color_FFFFFF,t_70)

为了解决浏览器的性能问题，虚拟DOM就被设计了出来。虚拟DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。

页面的更新先全部反映在js对象（虚拟DOM）上，等更新完成之后，再将最终的虚拟DOM映射成真实的DOM，然后在由浏览器渲染。而操作内存中的js对象会比操作DOM快得多。

可以看到，虚拟DOM其实只是实现了一个中间存储的作用，最终的更新还是要通过真实DOM实现。这样看似麻烦，其实很大程度上提高了运行速度。
## diff算法
当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图。

diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。

diff算法的主要作用就是比较两棵树的结构差异并进行转换。

传统diff算法会循环递归每一个节点，寻找差异并进行转换，最终的算法复杂度为O(n^3)。

vue的diff只进行**同层级比较**，忽略跨级操作，且对比的都是虚拟DOM节点。

我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。

想要了解具体的代码可以看看这篇文章：[解析vue2.0的diff算法](https://segmentfault.com/a/1190000008782928)。

### 设置key和不设置key的区别

key的作用主要是为了高效的更新虚拟DOM

# 虚拟DOM的优缺点

# 模板是怎么解析的
我们知道，模板中有`v-for`、`v-if`、`@click`之类的逻辑，因此模板最终当然会转换成js代码。实际上，模板最终会转换成render函数，这个函数会返回一个vnode对象，之后这个对象在update函数中被渲染成html。
# vue路由的实现原理
本质上是监听URL的变化，然后匹配路由规则显示相应页面，这期间无需刷新。
## hash模式（地址栏带有#）
点击或浏览器历史跳转时，触发`onhashchange`事件,然后根据路由规则匹配显示相应页面(遍历路由表，装载相应组件到`router-link`)。

手动刷新时,不会像服务器发送请求（不会触发`onhashchange`），触发`onload`事件，然后根据路由规则匹配显示相应页面。
## history模式
跳转时会调用`history.pushState`方法,根据`to`属性改变地址，并切换相应组件到`router-link`。

浏览器历史操作（前进，后退）,只会改变地址栏（页面内容不会变）,不会切换组件，需要使用`popstate`方法来切换组件。

手动刷新,需要后端配合重定向，不然404。

# axios的底层实现

# Vue3的新特性

diff不再遍历，采用patch-flag

双向绑定 es6的Proxy:直接监听data的所有域值

添加事件缓存

ssrRender —— push字符串

Tree-shaking 没有使用到的属性会被tree shake掉

composition API （不再使用mixin）

fragments 不需要有一个根节点

静态节点 staticVnode

async setup() 异步组件

Custom Renderer API 自定义渲染组件
# vue的特点
MVVM框架、数据双向绑定、轻量、渐进式框架、易上手、运行速度快。

不支持IE8及以下版本，不利于SEO，不适合大型项目开发。

# vue和react的区别
## 运行时性能
react中，当某个组件的状态发生变化时，它会以该组件为根，重新渲染整个组件子树。
vue组件的依赖会在渲染过程中自动追踪。
这使vue的开发者不用在开发时手动避免不必要的子组件的渲染。
## HTML & CSS
在React中，一切都是JavaScript。
而Vue的整体思想是拥抱经典的Web技术，并在其上扩展。
## 写法
react是类式的写法，api很少。与typeScript结合的更好。
vue是声明式写法，通过传入各种options，api和参数都很多。

# computed和watch有什么区别
1. 功能上：computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。

2. 是否调用缓存：computed中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而watch在每次监听的值发生变化的时候都会执行回调。

3. 是否调用 return：computed中的函数必须要用return返回，watch中的函数不是必须要用return。

**使用场景：**

`computed`：当一个属性受多个属性影响的时候，使用computed，如购物车商品结算。

`watch`：当一条数据影响多条数据的时候，使用watch，如搜索框。

另外 computed 和 watch 还都支持对象的写法：
```js
vm.$watch('obj', {
    // 深度遍历
    deep: true,
    // 立即触发
    immediate: true,
    // 执行的函数
    handler: function(val, oldVal) {}
})
var vm = new Vue({
  data: { a: 1 },
  computed: {
    aPlus: {
      // this.aPlus 时触发
      get: function () {
        return this.a + 1
      },
      // this.aPlus = 1 时触发
      set: function (v) {
        this.a = v - 1
      }
    }
  }
})
```

# vue生命周期
生命周期钩子函数：**beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed**。

这里要注意的是，不要在选项属性或回调上使用箭头函数，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。因为箭头函数并没有 `this`，`this` 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

下面是生命周期图示。（这都是搬运官网的~）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200405122033462.png)

- `beforeCreate`：不能获取到 `props`、`data` 中定义的值，也不能调用 `methods` 中定义的函数。因为该函数在`initState`之前被调用。
- `created`：该阶段还不能访问DOM。但可以访问`props`、`data`等属性。
- `beforeMount`：挂在之前被调用，`render`函数首次被调用，**生成虚拟DOM**。
- `mounted`：挂载完成，DOM 树已经完成渲染到页面，**可进行 DOM 操作**。
- `beforeUpdate`：数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
- `updated`：虚拟DOM重新渲染，补丁以最小的DOM开支重新渲染DOM。
- `beforeDestroy`：实例销毁之前调用，这里还可以访问实例数据。
- `destroyed`：组件已销毁。

## 生命周期描述
在 beforeCreate 钩子函数调用的时候，是获取不到 props 或者 data 中的数据的，因为这些数据的初始化都在 initState 中。

然后会执行 created 钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的。

接下来会先执行 beforeMount 钩子函数，开始创建 VDOM，最后执行 mounted 钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。

接下来是数据更新时会调用的钩子函数 beforeUpdate 和 updated，这两个钩子函数没什么好说的，就是分别在数据更新前和更新后会调用。

另外还有 keep-alive 独有的生命周期，分别为 activated 和 deactivated 。用 keep-alive 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

最后就是销毁组件的钩子函数 beforeDestroy 和 destroyed。前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 destroyed 钩子函数。

# 组件通信
整体分为两类：
1. 父子组件之间通信
   - `props` / `emit`
   - `$children` / `$parent`
   - `provide` / `inject`
   - `ref` / `refs`
   - `eventBus`
   - 属性：`$listeners` / `.sync`（Vue2.3及以上版本）
     - $listeners 属性会将父组件中的 (不含 .native 修饰器的) v-on 事件监听器传递给子组件，子组件可以通过访问 $listeners 来自定义监听器。
2. 兄弟组件通信
   - 可以通过查找父组件中的子组件实现，也就是 `this.$parent.$children`，在 `$children` 中可以通过组件 `name` 查询到需要的组件实例，然后进行通信。
3. 跨级通信
   - `provide / inject`
   - `$attrs / $listeners`

另外，`eventBus`、`Vuex`、`localStorage / sessionStorage`适用于所有组件通信。

## prop / emit
父组件通过`props`的方式向子组件传递数据，子组件通过`$emit`向父组件通信。

`prop` 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。而且 prop 只读，不可被修改，所有修改都会失效并警告。

## children / parent
会直接访问组件实例上绑定的父/子组件，不推荐使用。

**注意**：
- 边界情况，如在`#app`上拿`$parent`得到的是`new Vue()`的实例，在这实例上再拿`$parent`得到的是`undefined`，而在最底层的子组件拿`$children`是个空数组
- 得到`$parent`和`$children`的值不一样，`$children` 的值是数组，而`$parent`是个对象

## provide / inject
简单来说就是父组件中通过`provide`来提供变量, 然后再子组件中通过`inject`来注入变量。这里不论子组件嵌套有多深, 只要调用了`inject` 那么就可以注入`provide`中的数据，而不局限于只能从当前父组件的`props`属性中拿取数据。

## ref / refs
`ref`：如果在普通的 `DOM` 元素上使用，引用指向的就是 `DOM` 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据。

## eventBus
`eventBus` 又称为事件总线，在`vue`中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。`eventBus`也有不方便之处, 当项目较大,就容易造成难以维护的灾难

API：`EventBus.$emit`、`EventBus.$on`、`EventBus.$off`

## Vuex
`Vuex`采用**集中式存储管理**应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。 `Vuex` 解决了多个视图依赖于同一状态和来自不同视图的行为需要变更同一状态的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上

## localStorage / sessionStorage
通过`window.localStorage.getItem(key)`获取数据

通过`window.localStorage.setItem(key,value)`存储数据

## $attrs / $listeners
`$attrs` 包含了父作用域中不作为 `prop` 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 `prop` 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件。

`$listeners`包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件。

# Vuex
## Vuex各个模块
1. `state`：用于数据的存储，是store中的唯一数据源
2. `getters`：如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
3. `mutations`：类似函数，改变state数据的唯一途径，且不能用于处理异步事件
4. `actions`：类似于mutation，用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作
5. `modules`：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

# extend 能做什么
extend 作用是扩展组件生成一个构造器，通常会与 $mount 一起使用。

```js
// 创建组件构造器
let Component = Vue.extend({
  template: '<div>test</div>'
})
// 挂载到 #app 上
new Component().$mount('#app')
// 除了上面的方式，还可以用来扩展已有的组件
let SuperComponent = Vue.extend(Component)
new SuperComponent({
    created() {
        console.log(1)
    }
})
new SuperComponent().$mount('#app')
```

# mixin 和 mixins 区别
mixin 用于**全局**混入，会影响到每个组件实例，通常插件都是这样做初始化的。

```js
Vue.mixin({
    beforeCreate() {
        // ...逻辑
        // 这种方式会影响到每个组件的 beforeCreate 钩子函数
    }
})
```

虽然文档不建议我们在应用中直接使用 mixin，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 ajax 或者一些工具函数等等。

mixins 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。

另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并。
# vue2 的数据双向绑定（响应式原理）
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

## vue的diff算法
1. 概述：diff算法是虚拟DOM技术的必然产物：通过新旧虚拟DOM作对比（即diff），将变化的地方更新在真实DOM上；另外，也需要diff高效的执行对比过程（同层比较），从而降低时间复杂度为O(n)。

2. 必要性：vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，只有引入diff才能精确找到发生变化的地方。

3. 触发点：vue中diff执行的时刻是组件实例执行其更新函数时，它会比对上一次渲染结果oldVnode和新的渲染结果newVnode，此过程称为patch。

   数据响应式 -> 触发setter -> setter触发notify -> notify中会将watcher添加到dep（异步更新队列） ->  事件循环中watcher调用 -> 执行update -> 调用组件渲染函数和组件更新函数 -> 重新渲染最新的虚拟dom ->  执行更新函数 -> **触发diff** ，比较新旧虚拟dom

4. diff 过程：diff过程整体遵循深度优先、同层比较的策略：两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次比对尝试，如果没有找到相同节点才按照通用方式遍历查找，查找结束再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

**对应源码：**
1. 必要性：`lifecycle.js - mountComponent()`
   
   vue中组件与`watcher`一一对应，而组件中可能存在很多个data中key的使用，为了精确地知道在更新过程中谁发生了变化，所以必须使用diff。
   
2. 执行方式：`patch.js - patchVnode()` （ `patchVnode`是diff发生的地方 ）
   
   diff整体策略：**深度优先，同级比较**。

   diff过程：
   - 先判断两个节点是否有孩子（深度优先），如果都有孩子，则比孩子，执行`updateChildren`
   - 另外就是只有一方有孩子，和如果是文本节点会执行的操作

3. 高效性：`patch.js - updateChildren()`
   
    关于`updateChildren`上的操作：
     - 拿到两个节点首尾指针和首尾节点（4个指针，4个节点），依次判断新旧节点的头节点和尾节点（4种情况），根据不同的情况做出不同的处理，在判断过程中，通过`patchVnode`检查孩子节点。
     - 如果四种情况都不满足，则开始遍历查找，根据不同的情况再次进行判断。
     - 处理数组中剩下的元素，多删少补。

# 虚拟DOM的优缺点

# vue中key的作用和工作原理
源码位置：`src\core\vdom\patch.js - updateChildren`
1. `key`的作用主要是为了高效的更新虚拟DOM。
2. 源码层级的解释：在`patch`中，如果新旧节点相同，会执行`patchVnode`，在`patchVnode`中，如果两个节点都有孩子，会执行`updateChildren`，在`updateChildren`中，会通过`key`来判断是不是`sameVnode`，而如果没有设置`key`的话，两个节点的`key`都是`undefined`，再加上两个节点的标签等相同，新老节点的开始节点始终被认为是同一节点。这样一来，两个节点在`patchVnode`中被更新的概率就极大地提高。

![key的作用](https://s1.ax1x.com/2020/07/22/Ubhjrn.jpg)

## 用index设置key会造成问题
1. **会影响性能：** 对于一个列表，如果删除列表中的某一项（非最后一项），index会相应的发生变化，此时，key也发生了变化，就会造成额外的渲染消耗。
2. **会造成状态变化的bug：** 同样是上面那种情况，如果我选中了第三项（`key=2`被选中），然后删除第二项，此时，第三项变成第二项，它的`key`就变成了1，而第四项的`key`等于2，这样就产生了bug。

# 模板是怎么解析的
我们知道，模板中有`v-for`、`v-if`、`@click`之类的逻辑，因此模板最终当然会转换成js代码。实际上，模板最终会转换成 render 函数，这个函数会返回一个 vnode 对象，之后这个对象在 update 函数中被渲染成 html。

模板编译过程分为三个阶段：
1. 将模板解析为 AST
2. 优化 AST
3. 将 AST 转换为 render 函数

在第一个阶段中，最主要的事情是通过各种各样的正则表达式去匹配模板中的内容，然后将内容提取出来做各种逻辑操作，接下来会生成一个最基本的 AST 对象。

```js
{
    // 类型
    type: 1,
    // 标签
    tag,
    // 属性列表
    attrsList: attrs,
    // 属性映射
    attrsMap: makeAttrsMap(attrs),
    // 父节点
    parent,
    // 子节点
    children: []
}
```

然后会根据这个最基本的 AST 对象中的属性，进一步扩展 AST。

接下来就是优化 AST 的阶段。在当前版本下，Vue 进行的优化内容其实还是不多的。只是对节点进行了静态内容提取，也就是将永远不会变动的节点提取了出来，实现复用 Virtual DOM，跳过对比算法的功能。在下一个大版本中，Vue 会在优化 AST 的阶段继续发力，实现更多的优化功能，尽可能的在编译阶段压榨更多的性能，比如说提取静态的属性等等优化行为。

最后一个阶段就是通过 AST 生成 render 函数了。其实这一阶段虽然分支有很多，但是最主要的目的就是遍历整个 AST，根据不同的条件生成不同的代码罢了。

# NextTick 原理分析

`nextTick` 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。

在 Vue 2.4 之前都是使用的 microtasks，但是 microtasks 的优先级过高，在某些情况下可能会出现比事件冒泡更快的情况，但如果都使用 macrotasks 又可能会出现渲染的性能问题。所以在新版本中，会默认使用 microtasks，但在特殊情况下会使用 macrotasks，比如 v-on。

对于实现 macrotasks ，会先判断是否能使用 setImmediate ，不能的话降级为 MessageChannel ，以上都不行的话就使用 setTimeout。

```js
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

# vue路由的实现原理
本质上是监听URL的变化，然后匹配路由规则显示相应页面，这期间无需刷新。

在没有懒加载和SSR的情况下，一开始就会请求所有的js脚本，后期的url变化都会交给js处理，不再向服务端发送请求。

## hash模式（地址栏带有#）
点击或浏览器历史跳转时，触发`onhashchange`事件,然后根据路由规则匹配显示相应页面(遍历路由表，装载相应组件到`router-link`)。

手动刷新时,不会像服务器发送请求（不会触发`onhashchange`），触发`onload`事件，然后根据路由规则匹配显示相应页面。

## history模式
跳转时会调用`history.pushState`方法,根据`to`属性改变地址，并切换相应组件到`router-link`。

浏览器历史操作（前进，后退）,只会改变地址栏（页面内容不会变）,不会切换组件，需要使用`popstate`方法来切换组件。

手动刷新,需要后端配合重定向，不然404。

## 路由守卫
使用场景

## keep-alive的使用和原理
`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。`<keep-alive>` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

它提供了`include`与`exclude`两个属性，允许组件有条件地进行缓存。

当组件在 `<keep-alive>` 内被切换，它的 `activated` 和 `deactivated` 这两个生命周期钩子函数将会被对应执行。因为 keep-alive 会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的 created 等方法。

**源码实现：**

- 获取组件名称，通过`include`和`exclude`属性对组件进行筛选，如果在`exclude`中或者`include`中没有，则直接返回vnode（表示不需要缓存）
- 如果已经做过缓存了则直接从缓存中获取组件实例给vnode
- 否则，将当前vnode加入缓存
- 这里的缓存用一个`cache`对象来表示
- 用`watch`来监听`include`与`exclude`这两个属性的改变，在改变的时候修改`cache`缓存中的缓存数据（`pruneCache`），将不符合规则的组件实例用 `$destroy` 方法销毁

`LRU` 策略：最近最久未使用。

## 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

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

# v-if 和 v-for哪个优先级更高？如果同时出现，可以怎么优化？

1. 同级时，v-for优先级高于v-if（打印render函数试验，看源码`/compiler/codegen/index.js#64`）
2. 这样一来，如果同时出现，就不可避免的触发循环，浪费性能
3. 可以将`v-if`放到`v-for`外层来避免这种情况
4. 如果条件在循环内部，则通过计算属性提前过滤掉不需要显示的项，减少渲染消耗
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js"></script>
</head>
<body>
    <div id="demo">
        <h1>v-for和v-if谁的优先级高？应该如何正确使用避免性能问题？</h1>
        <p v-if="isFolder" v-for="child in children">{{ child.title }}</p>
        <!-- <template v-if="isFolder">
            <p v-for="child in children">{{ child.title }}</p>
        </template> -->
    </div>
    <script>
        // 创建实例
        const app = new Vue({
            el: '#demo',
            data() {
                return {
                    children: [
                        { title: 'foo' },
                        { title: 'bar' },
                    ]
                }
            },
            computed: {
                isFolder() {
                    return this.children && this.children.length > 0
                }
            },
        });
        console.log(app.$options.render);
    </script>
</body>
</html>
```

# vue中组件的data为什么必须是个函数，而vue的根实例没有这个限制？

1. vue组件可能存在多个实例，如果data直接是一个对象，那么组件的所有实例共享一个data，一个实例的状态变更将影响所有组件实例，造成污染
2. 采用函数形式定义，在initData时会将其作为工厂函数返回全新data对象，从而规避多实例之间的状态污染
3. 而在vue根实例创建过程中则不存在这个限制，因为根实例只有一个，不需要担心这种情况

# MVVM 框架的整体流程


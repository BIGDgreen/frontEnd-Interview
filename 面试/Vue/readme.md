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

## vue的diff算法
1. 概述：diff算法是虚拟DOM技术的必然产物：通过新旧虚拟DOM作对比（即diff），将变化的地方更新在真实DOM上；另外，也需要diff高效的执行对比过程（同层比较），从而降低时间复杂度为O(n)。

2. 必要性：vue 2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，只有引入diff才能精确找到发生变化的地方。

3. 触发点：vue中diff执行的时刻是组件实例执行其更新函数时，它会比对上一次渲染结果oldVnode和新的渲染结果newVnode，此过程称为patch。
   
   数据响应式 -> 触发setter -> setter触发notify -> notify中会将watcher添加到dep（异步更新队列） ->  事件循环中watcher调用 -> 执行update -> 调用组件渲染函数和组件更新函数 -> 重新渲染最新的虚拟dom ->  执行更新函数 -> **触发diff** ，比较新旧虚拟dom

4. diff过程：diff过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次比对尝试，如果没有找到相同节点才按照通用方式遍历查找，查找结束再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

**对应源码：**
1. 必要性：`lifecycle.js - mountComponent()`
   
   vue中组件与`watcher`一一对应，而组件中可能存在很多个data中key的使用，为了精确地直到在更新过程中谁发生了变化，所以必须使用diff。
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

# v-if 和 v-for哪个优先级更高？如果同时出现，可以怎么优化？
1. 同级时，v-for优先级高于v-if（打印render函数试验，看源码`/compiler/codegen/index.js#64`）
2. 这样一来，如果同时出现，就不可避免的出发循环，浪费性能
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

# vue中key的作用和工作原理
源码位置：`src\core\vdom\patch.js - updateChildren`
1. `key`的作用主要是为了高效的更新虚拟DOM。
2. 源码层级的解释：在`patch`中，如果新旧节点相同，会执行`patchVnode`，在`patchVnode`中，如果两个节点都有孩子，会执行`updateChildren`，在`updateChildren`中，会通过`key`来判断是不是`sameVnode`，而如果没有设置`key`的话，两个节点的`key`都是`undefined`，再加上两个节点的标签等相同，新老节点的开始节点始终被认为是同一节点。这样一来，两个节点在`patchVnode`中被更新的概率就极大地提高。

![key的作用](https://s1.ax1x.com/2020/07/22/Ubhjrn.jpg)

## 用index设置key会造成问题
1. **会影响性能：** 对于一个列表，如果删除列表中的某一项（非最后一项），index会相应的发生变化，此时，key也发生了变化，就会造成额外的渲染消耗。
2. **会造成状态变化的bug：** 同样是上面那种情况，如果我选中了第三项（`key=2`被选中），然后删除第二项，此时，第三项变成第二项，它的`key`就变成了1，而第四项的`key`等于2，这样就产生了bug。



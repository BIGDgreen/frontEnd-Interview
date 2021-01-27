## 工厂模式

vue

## 单例模式

vuex

## 适配器模式
适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。

```js
class Plug {
  getName() {
    return '港版插头'
  }
}

class Target {
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + ' 适配器转二脚插头'
  }
}

let target = new Target()
target.getName() // 港版插头 适配器转二脚插头
```

## 装饰模式
装饰模式不需要改变已有的接口，作用是给对象添加功能。

```js
function readonly(target, key, descriptor) {
  descriptor.writable = false
  return descriptor
}

class Test {
  @readonly // ES7 装饰器语法
  name = 'yck'
}

let t = new Test()

t.yck = '111' // 不可修改
```

在 React 中，装饰模式其实随处可见

```js
import { connect } from 'react-redux'
class MyComponent extends React.Component {
    // ...
}
export default connect(mapStateToProps)(MyComponent)
```

## 代理模式
代理是为了控制对对象的访问，不让外部直接访问到对象。比如事件代理就用到了代理模式。

## 发布-订阅模式

## 外观模式
外观模式提供了一个接口，隐藏了内部的逻辑，更加方便外部调用。



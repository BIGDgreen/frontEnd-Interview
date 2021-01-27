# defineProperty监听数组时
```js
// 使用 Object.defineProperty 监听数组
function defineReactive(data, key, value) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function defineGet() {
            console.log(`get key: ${key} value: ${value}`);
            return value;
        },
        set: function defineSet(newVal) {
            console.log(`set key: ${key} value: ${value}`);
            value = newVal;
        }
    })
}

function observe(data) {
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    })
}

let arr1 = [1, 2, 3];
observe(arr1);
arr1.unshift(4);
```

删除后又新增的数据需要重新监听

打印出
```js
get key: 2 value: 3
get key: 1 value: 2
set key: 2 value: 3
get key: 0 value: 1
set key: 1 value: 2
set key: 0 value: 1
```

为什么多次执行getter和setter？

数组在内存里是一个连续的内存段


`arr1.push(1)`没有打印任何数据，是因为它对数组不能做监听吗？
它对数组可以做监听，push时产生一个新的key，对于这个新的key没有调用defineReactive，自然不能监听。

vue重写数组监听的原因：

1. 新增的键值key，不能做监听；对象新增的键值，也不能监听
2. 对于数组，会造成频繁移动  引发性能问题

数组是怎么处理的？

对象，对于新增键值，$set，又调用了一次defineProperty。

重写了会增加索引、减少索引、重排索引的方法：

```js
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',   // 操作key，重写，触发修改get和set
  'reverse'
]
```

如果有新增索引，调用observer.observerArray(inserted)

可能新增一个数组/对象/数组对象

可以push多项

let a=[{a: 1},2]
a[0] = 1;   // 按值修改
a[0].a = 2; // 按引用修改，无法监听

生成嵌套数据，一开始就会递归

1. 如果是对象，遍历所有keys，递归
2. 如果是数组，重写
    1. 重写原型链 target.__proto__ = src
    2. 重写所有需要改变数组值和索引的方法 
       - 直接重写原型链上的某一个方法：执行原始方法，拦截新增，遍历递归 代理新增数组（嵌套数组、对象），手动触发一次set要做的事情


Object.defineProperty缺点：
1. 重写数组之后的代理方法，一开始就要递归遍历
2. 性能问题


Vue3 Proxy

Object.defineProperty 对于对象的某个key重写
Proxy 拦截所有操作

```js
new Proxy(data, {
    get(target,key,receiver) {
        // target 为拦截对象 key为本次拦截的key
        console.log('get value', target, key);
        var res = Reflect.get(target,key, receiver);
        return res;
    },
    set(target,key,value,receiver) {
        console.log('set value', key);
        return Reflect.set(target,key,value,receiver);
    }
})
```

代理
Reflect 拦截了之后，又想使用 -> Reflect

对于数组的操作，依然触发多次get和set

依然解决不了深度嵌套的问题，无法触发set

    如果是对象，返回代理对象

懒代理：只有在获取的时候才会递归

```js
function reactive() {
    new Proxy(data, {
        get(target,key,receiver) {
            // target 为拦截对象 key为本次拦截的key
            console.log('get value', target, key);
            var res = Reflect.get(target,key, receiver);
            if(typeof res === 'object') {
                return reactive(res);
            }
            return res;
        },
        set(target,key,value,receiver) {
            console.log('set value', key);
            return Reflect.set(target,key,value,receiver);
        }
    })
}

```

vue3 diff优化

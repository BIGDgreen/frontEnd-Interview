<!--
 * @Author       : BigDgreen
 * @Date         : 2020-08-04 10:13:29
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-04 22:12:51
 * @FilePath     : \前端知识点总结\数据结构和算法\数组\数组去重\readme.md
-->
# 测试
```js
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];

console.log(unique(arr))
```

# 1. ES6 Set
```js
function unique(arr) {
    return Array.from(new Set(arr));
}
```
或者

```js
function unique(arr) {
    return [...new Set(arr)];
}
```

这种方法无法去掉重复的`{}`对象。

# 2. 两层for循环，然后splice
```js
function unique(arr) {
    const length = arr.length;
    for(let i = 0; i < length; i++) {
        for(let j = i + 1; j < length; j++) {
            if(arr[i] === arr[j]) {
                arr.splice(j, 1);   // 删除第二个
                j--;
            }
        }
    }
    return arr;
}
```
`NaN`和`{}`没有去重，两个`null`直接消失了

# 3. 判断引用类型
```js
function unique (arr) {
  let newArr = []
  let obj = {}
  arr.forEach(item => {
    if (typeof item !== 'object') {
      if (newArr.indexOf(item) === -1) {
        newArr.push(item)
      }
    } else {
      let str = JSON.stringify(item)
      if (!obj[str]) {
        newArr.push(item)
        obj[str] = 1
      }
    }
  })
  return newArr
}
```




<!--
 * @Author       : BigDgreen
 * @Date         : 2020-08-05 07:36:28
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-08-05 07:42:05
 * @FilePath     : \前端知识点总结\数据结构和算法\数组\数组扁平化\readme.md
-->



```js
const flat = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
  }, []);
};
```

```js
function flat(arr) {
  const result = []; 
  const stack = [].concat(arr);  // 将数组元素拷贝至栈，直接赋值会改变原数组
  //如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop(); 
    if (Array.isArray(val)) {
      stack.push(...val); //如果是数组再次入栈，并且展开了一层
    } else {
      result.unshift(val); //如果不是数组就将其取出来放入结果数组中
    }
  }
  return result;
}
```
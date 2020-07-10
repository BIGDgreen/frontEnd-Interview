## async、await的四个要点
1. `await`后面可以追加`promise`对象，获得`promise`中`resolve`的值
2. `await`必须包裹在`async`函数里
3. `async`函数执行返回的结果也是一个`promise`对象
4. `try-catch`截获`promise`中`reject`的值

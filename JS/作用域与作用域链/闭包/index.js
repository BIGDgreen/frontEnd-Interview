// 输出6个5，执行顺序如下
console.log('start', new Date); // 1
for (var i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(new Date, i);   // 3: 至少1秒后5个5同时输出
    }, 1000);
}

console.log('end', new Date, i); // 2

// 如果要输出0~4

// 1. 闭包改进
console.log('start', new Date); // 1
for (var i = 0; i < 5; i++) {
    (function (j) {
        setTimeout(function () {
            console.log(new Date, j);   // 3: 至少1秒后同时输出0~4
        }, 1000);
    })(i)
}
console.log('end', new Date, i); // 2

// 2.
console.log('start', new Date); // 1
for (var i = 0; i < 5; i++) {
    setTimeout(function (j) {
        console.log(new Date, j);   // 3: 至少1秒后5个5同时输出
    }, 1000, i);
}

console.log('end', new Date, i); // 2

// 3.
console.log('start', new Date); // 1
var output = function (i) {
    setTimeout(function () {
        console.log(new Date, i);
    }, 1000);
};

for (var i = 0; i < 5; i++) {
    output(i);  // 这里传过去的 i 值被复制了
}

console.log(new Date, i);

// 4. es6写法，运行到最后一句会报错
console.log('start', new Date); // 1

for (let i = 0; i < 5; i++) {
    setTimeout(function () {
        console.log(new Date, i);
    }, 1000);
}

console.log(new Date, i);

// 5. 如果要求输出0~5，并且每次输出间隔1s
// 用ES6 promise
console.log('start', new Date); // 1

var tasks = [];
const output = i => new Promise((resolve) => {
    setTimeout(function () {
        console.log(new Date, i);
        resolve();
    }, 1000 * i);
})

for (var i = 0; i < 5; i++) {
    tasks.push(output(i));
}

Promise.all(tasks).then(() => {
    setTimeout(() => {
        console.log(new Date, i);
    }, 1000);
})

// 6. 用ES8 async await
console.log('start', new Date); // 1

const sleep = timeout => new Promise((resolve) => {
    setTimeout(resolve, timeout);
}); // 后面是个闭包函数，这里分号不能省

(async () => {
    for (var i = 0; i < 5; i++) {
        console.log(new Date, i);
        await sleep(1000);
    }
    console.log(new Date, i);
})();

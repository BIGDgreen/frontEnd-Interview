const miniPromise = require('./promise');

// 同步调用
// let promise = new miniPromise((resolve, reject) => {  // executor执行器
//     // throw new Error('失败');
//     // resolve(4);
//     setTimeout(() => {
//         resolve('成功');
//     }, 1000);
// }).then(data => {
//     console.log(data);
// }, err => {
//     console.log('err', err);
// })


// // 异步调用
// let fs = require('fs');
// function read(url) {
//     return new miniPromise((resolve, reject) => {
//         fs.readFile(url, 'utf-8', function (err, data) {
//             if (err) reject(err);
//             resolve(data);
//         })
//     })
// }

// read('./name.txt').then(data => {
//     console.log(data);
// }, err => {
//     console.log('err', err);
// })


// 链式调用
// let p = new miniPromise((resolve, reject) => {
//     resolve(100);
// });

// let promise2 = p.then(data => {
//     throw new Error('出错');
//     // return 1000;
// });

// promise2.then((data) => {
//     console.log(data);
// }, (err) => {
//     console.log('err', err);
// })

// 错误写法：循环调用
// let p = new miniPromise((resolve, reject) => {
//     resolve();
// });

// let promise2 = p.then(() => {
//     return promise2;
// });

// promise2.then(null, function (err) {
//     console.log(err);
// })


// 当resolve里面又是一个promise
// new miniPromise((resolve, reject) => {
//     resolve(100);
// }).then(data => {
//     return new miniPromise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(new miniPromise((resolve, reject) => {
//                 setTimeout(() => {
//                     resolve(1000);
//                 }, 1000);
//             }))
//         }, 1000);
//     });
// }, err => {
//     console.log('err', err);
// }).then(data => {
//     console.log('data:::', data);
// })

// 通过defer解嵌套
// let fs = require('fs');
// function read(url) {
//     let dfd = miniPromise.defer();
//     fs.readFile(url, 'utf-8', function (err, data) {
//         if (err) dfd.reject(err);
//         dfd.resolve(data);
//     })
//     return dfd.promise;
// }

// read('./name.txt').then(data => {
//     console.log(data);
// }, err => {
//     console.log('err', err);
// })


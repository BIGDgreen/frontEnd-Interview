// function getme() {
//     var mem = process.memoryUsage();
//     var format = function (bytes) {
//         return (bytes / 1024 / 1024).toFixed(2) + "MB";
//     }
//     console.log("heapTotal:" + format(mem.heapTotal) + " heapUsed" + format(mem.heapUsed));
// }

var arr = [];
var size = 30 * 1024 * 1024;
// for (let i = 0; i < 15; i++) {
//     arr.push(new Array(size));
//     getme();
// }


function b() {
    var arr1 = new Array(size);
    var arr2 = new Array(size);
    var arr3 = new Array(size);
    var arr4 = new Array(size);
    var arr5 = new Array(size);
    var arr6 = new Array(size);
    return [arr1, arr2, arr3, arr4, arr5, arr6];
}

var testArr = b();

setInterval(() => {
    arr.push(new Array(size));
}, 1000);

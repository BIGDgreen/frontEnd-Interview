// function fn(a, c) { // 1，2
//     console.log(a); // function a() {}
//     var a = 123;
//     console.log(a); // 123
//     console.log(c); // function c() {}
//     function a() { }
//     if (false) {
//         var d = 678;
//     }
//     console.log(d); // undefined
//     console.log(b); // undefined
//     var b = function () { }
//     console.log(b); // function b() {}
//     function c() { }
//     console.log(c); // function c() {}
// }

// fn(1, 2)

// 1. 创建ao对象
// 2. 找形参和变量声明，将变量和形参名当作ao对象的属性名，其值为undefined
// 3. 实参形参相统一
// 4. 在函数体里找函数声明，值赋予函数体

// AO {
//     a: undefined 1 function a() {}
//     c: undefined 2 function c() {}
//     d: undefined
//     b: undefined
// }

// 预编译结束


console.log(test);  // function test() {}
console.log(b); // undefined
function test(a) {
    console.log(c); // undefined
    var a = b = 345;    // b为全局b
    c = 9;
    if (false) {
        var c = 789;
    }
    console.log(a); // 345
    console.log(c); // 9
}

test(234);
console.log(b); // 345
console.log(test);  // function test() {}
var test = 123;
var b = 456;


// 1. 创建GO对象
// 2. 找变量声明，将变量名作为GO对象的属性名，值为undefined
// 3. 找函数声明，值赋予函数体

// GO {
//     test: undefined function test() { }
//     b: undefined
// }

// AO {
//     a: undefined 234
//     c: undefined
// }

// 预编译结束

/**
 *json实现对象深拷贝
 *
 * @param {Object || Array} source
 * @returns
 */
function deepClone(source) {
  return JSON.parse(JSON.stringify(source));
}
// 对象浅拷贝
let obj1 = {a:1, b:2};
let easyObj = obj1;
easyObj.a = 3;
console.log(obj1, easyObj);
// 对象深拷贝
let obj2 = {a:1, b:2};
let deepObj = deepClone(obj2);
deepObj.a = 3;
console.log(obj2, deepObj);
// 数组浅拷贝
let arr1 = [1, 2, {a: 1}];
let easyArr = arr1;
easyArr[2].a = 2;
console.log(arr1, easyArr);
// 数组深拷贝
let arr2 = [1, 2, {a: 1}];
let deepArr = deepClone(arr2);
deepArr[2].a = 2;
console.log(arr2, deepArr);
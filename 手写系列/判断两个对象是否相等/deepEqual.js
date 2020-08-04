/*
 * @Author       : BigDgreen
 * @Date         : 2020-07-28 20:56:10
 * @LastEditors  : BigDgreen
 * @LastEditTime : 2020-07-28 20:58:40
 * @FilePath     : \前端知识点总结\面试\手写代码\判断两个对象是否相等\deepEqual.js
 */


/**
 * 判断两个对象是否相等
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns
 */
function deepEqual(obj1, obj2) {
    if (obj1.length !== obj2.length) return false;
    if (obj1 === obj2) return true;
}
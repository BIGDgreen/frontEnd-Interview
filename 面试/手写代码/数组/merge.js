/**
 * 将两个有序数组合并为一个有序数组
 * 考虑有序
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
function merge(arr1, arr2) {
  console.log(arr1, arr2);
  if(!(arr1 instanceof Array) || !(arr2 instanceof Array)) return;
  var arr = [];
  while(arr1.length && arr2.length) {
    if(arr1[0] < arr2[0]) {
      // 将小的放入arr
      arr.push(arr1.shift());
    }else {
      arr.push(arr2.shift())
    }
  }
  return arr.concat(arr1 , arr2);
}

module.exports =  merge;

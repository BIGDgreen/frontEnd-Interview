const merge =require('../merge.js');
/**
 * 归并排序
 *
 * @param {Array} arr
 */
function mergeSort(arr) {
  if(!(arr instanceof Array)) return;
  if(arr.length <= 1) return arr;
  let mid = parseInt(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);
  // console.log(left, right);
  return merge(mergeSort(left), mergeSort(right));
}

const arr = [3,4,21,1,4];
console.log(mergeSort(arr));

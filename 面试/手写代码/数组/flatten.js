/**
 *数组扁平化
 *1.利用toString方法( join(',')也可以达到同样的效果 )
 *
 * @param {Array} arr
 * @returns
 */
function flatten1(arr) {
  if(!(arr instanceof Array)) return;
  return arr.toString().split(',').map(item=>Number(item));
}

/**
 *数组扁平化
 *2.遍历数组arr，若arr[i]为数组则递归遍历，直至arr[i]不为数组然后与之前的结果concat
 *
 * @param {*} arr
 */
function flatten2(arr) {
  while(arr.some(item=>Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

const arr = [[1.2,2,3],[4,5],6];
console.log(flatten1(arr));
console.log(flatten2(arr));

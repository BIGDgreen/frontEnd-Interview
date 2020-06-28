/**
 * 快排
 *
 * @param {Array} arr
 */
function quickSort(arr) {
  if(!(arr instanceof Array)) return;
  if(arr.length <= 1) return arr;
  let left = [];
  let right = [];
  let pivotIndex = parseInt(arr.length / 2);
　let pivot = arr.splice(pivotIndex, 1)[0];
  console.log("pivotIndex:::", pivotIndex, "pivot:::", pivot);
  for(let item of arr) {
    if(item < pivot) {
      left.push(item);
    } else {
      right.push(item);
    }
  }

  console.log(left, right);
  return quickSort(left).concat([pivot], quickSort(right));
}

const arr = [3,1,4,6,3,6,2];
console.log(quickSort(arr));

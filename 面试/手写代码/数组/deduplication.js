/**
 *数组去重es6版本
 *
 * @param {Array} arr
 * @returns
 */
function deduplicateEs6(arr) {
  return [...new Set(arr)];
}

/**
 *数组去重es5版本
 *
 * @param {Array} arr
 * @returns
 */
function deduplicateEs5(arr) {
  let tmpObj = {};
  let res = [];
  arr.forEach(item => {
    if(!tmpObj[item]) {
      tmpObj[item] = true;
      res.push(item)
    }
  });
  return res;
}
const arr = [1,2,2,3,4];
console.log(deduplicateEs6(arr));
console.log(deduplicateEs5(arr));
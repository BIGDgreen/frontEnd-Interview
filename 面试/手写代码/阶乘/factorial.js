/**
 * 实现阶乘（采用缓存数组）
 */
let storage = [0];
function factorial(num) {
  if(typeof num !== 'number' || num < 0) return;
  if(num == 0) return 1; 
  while(num > 0) {
    if(storage[num - 1]) return storage[num-1];
    storage[num - 1] = num * factorial(num - 1);
    return num * factorial(num - 1);
  }
}

const num = 3;
console.log(factorial(num));
console.log(storage);
console.log(factorial(num-1))
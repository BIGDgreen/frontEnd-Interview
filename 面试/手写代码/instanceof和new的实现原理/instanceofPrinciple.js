// instanceof的内部机制
function myInstanceof(obj, Constructor) {
  while(obj.__proto__ !== null) {
    if(obj.__proto__ == Constructor.prototype) break;
    obj.__proto__ = obj.__proto__.__proto__;
  }
  if(obj.__proto__ == null) return false;
  return true;
}

const arr = [1,3,2,1,4];
console.log(myInstanceof(arr, Array));
console.log(myInstanceof(arr, Object));
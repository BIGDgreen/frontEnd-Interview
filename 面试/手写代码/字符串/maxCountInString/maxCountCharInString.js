/**
 * 获得字符串中出现次数最多的字符和其出现次数
 * 注：最大次数只有一个值，出现次数最多的字符可能有多个
 * 该函数中将展现三种方法
 * @param {String} string
 * @returns {Object}
 */
function mostAppearCharInString(str) {
  // 判断类型，如果输入不是字符串则结束
  if(typeof(str) !== 'string') return;
  // 字符串为空
  if(str === '') return null;
  const maxByRegExp = _getMaxCountCharByRegExp(str);
  console.log("getByRegExp:::", maxByRegExp);
  const countObj = _getMapObj(str);
  console.log("countObj:::", countObj);
  const maxByArr = _getMaxCountCharByArr(countObj);
  const maxByStr = _getMaxCountCharByString(countObj);
  console.log("getByArr:::", maxByArr);
  console.log("getByStr:::", maxByStr);

  function _getMapObj(str) {
    // 获得每个字符与其出现次数映射的对象
    let arr = str.split('');
    let countObj = {};
    for(item of arr) {
      if(!countObj[item]) {
        // 第一次出现
        countObj[item] = 1;
      } else {
        // 重复出现
        countObj[item] ++;
      }
    }
    return countObj;
  }
  
  function _getMaxCountCharByArr(countObj) {
    // 通过将字符串转为数组获得出现次数最多的字符和其出现次数
    let countArr = []; // 存储次数
    for(let key in countObj) {
      countArr.push(countObj[key]);
    }
    const maxCount = Math.max(...countArr);
    let maxChar = [];
    for(let key in countObj) {
      if(countObj[key] === maxCount) maxChar.push(key); 
    }
    return {maxCount, maxChar};
  }
  
  function _getMaxCountCharByString(countObj) {
    // 通过将字符串原生方法获得出现次数最多的字符和其出现次数
    let maxCount = 0;
    let maxChar = [];
    for(let key in countObj) {
      if(countObj[key] >= maxCount) {
        maxCount = countObj[key];
      }
    }
    for(let key in countObj) {
      if(countObj[key] === maxCount) maxChar.push(key);
    }
    return {maxCount, maxChar};
  }

  function _getMaxCountCharByRegExp(str) {
    // 将相同的字母放在一起并提出来放在数组中，比较数组长度即可
    let arr = str.split('').sort();
    const uniqueArr = new Set(arr);
    let maxChar = [];
    let maxCount = 0;
    for(let item of uniqueArr) {
      // 查找出现次数最多的字符出现的次数
      const reg = new RegExp(item, 'g');
      const currentArr = str.match(reg);
      // console.log(currentArr, maxCount);      
      if(maxCount <= currentArr.length) {
        maxCount = currentArr.length;
      }
    }
    for(let item of uniqueArr) {
      // 查找出现次数最多的字符
      const reg = new RegExp(item, 'g');
      const currentArr = str.match(reg);
      if(maxCount == currentArr.length) {
        maxChar.push(item);
      }
    }    
    return {maxCount, maxChar};
  }
}

const str = 'assfwaasswww';
console.log("要查找的字符串为", str);
mostAppearCharInString(str);

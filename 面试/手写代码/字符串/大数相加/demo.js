function sumBigNumber(a, b) {
  let carry = 0; // 进位标志
  let aArr = a.split('');
  let bArr = b.split('');
  // console.log(aArr, bArr);
  let res = [];
  let distance = aArr.length - bArr.length > 0 ? aArr.length - bArr.length : bArr.length - aArr.length;
  // 使两个数组长度相同，不够的补零
  if(aArr.length < bArr.length) {
    for(let i = 0; i < distance; i++) {
      aArr.unshift('0')
    }
  } else if(aArr.length > bArr.length) {
    let distance = aArr.length - bArr.length;
    for(let i = 0; i < distance; i++) {
      bArr.unshift('0');
    }
  }
  // console.log(aArr, bArr);
  // 从个位开始相加
  for(let i = aArr.length - 1; i >= 0; i--) {
    let sum = Number(aArr[i]) + Number(bArr[i]) + carry;
    carry = sum > 10 ? 1 : 0;
    sum = sum > 10 ? parseInt(sum%10) : sum;
    res.unshift(sum);
  }
  // 去掉前面所有的零
  return res.join('').replace(/^0/, '');
}
console.log(sumBigNumber('222222222222222222222', '11111111111111111'));
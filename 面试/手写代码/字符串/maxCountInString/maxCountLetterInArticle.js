/**
 *查找文章中出现次数最多的单词
 *(正则表达式)
 */
function maxCountLetterInArticle(article){
  // 去掉首尾空格
  article = article.trim().toLowerCase();
  // 拆分每个单词
  var array = article.match(/[A-z]+/g);
  // console.log(array);
  // 重新连成字符串（去掉了所有的标点符号）
  article = " "+array.join("  ")+" ";
  var max = 0,word,num = 0,maxword="";
  for(var i = 0; i < array.length; i++) {        
    word = new RegExp(" "+array[i]+" ",'g');
    num = article.match(word).length;
    if(num>max){
        max=num;
        maxword = array[i];
    }
  }
 console.log(maxword+" "+max);
}
maxCountLetterInArticle("Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;");
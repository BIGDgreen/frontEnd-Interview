// new的内部机制
function Person() {
  this.name = "I'm from Person!"
}
let person = new Person()
console.log(person);
// new
function myNew(Constructor) {
  let obj = {};
  obj.__proto__ = Constructor.prototype;
  obj.name = "I'm new!";
  return obj;
}
console.log(myNew(Person));

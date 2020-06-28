/**
 *es5继承 Student继承Person 组合继承
 */
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
Person.prototype.sayName = function() {
  console.log(this.name)
}
function Student(name, gender, grade) {
  Person.call(this, name, gender);
  this.grade = grade;
}
Student.prototype = new Person();
Student.prototype.constructor = Student;
const student = new Student('张三', '男', '大三');
student.sayName();
console.log(student);
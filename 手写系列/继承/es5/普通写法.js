/**
 * es5继承 Student继承Person 组合继承
 * 父类构造函数会执行两次，如果构造函数比较复杂就造成浪费
 */
function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}
Person.prototype.sayName = function () {
    console.log(this.name)
}
function Student(name, gender, grade) {
    // 执行一次父类
    Person.call(this, name, gender);
    this.grade = grade;
}
Student.prototype = new Person(); // 又执行一次
Student.prototype.constructor = Student;
const student = new Student('张三', '男', '大三');
student.sayName();
console.log(student);

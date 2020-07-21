/**
 * es6继承 Student继承Person
 */
class Person {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
    sayName() {
        console.log(this.name);
    }
}
class Student extends Person {
    constructor(name, gender, grade) {
        super(name, gender);
        super.test = 1; // 当不调用super时，super为this，最终test在Student上
        this.grade = grade;
    }
}
const student = new Student('张三', '男', '大三');
student.sayName();
console.log(student);

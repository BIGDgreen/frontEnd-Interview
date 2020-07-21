function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    console.log(this.name);
}

function Student(name) {
    Person.call(this, name);
}

Student.prototype = Object.create(Person.prototype, {
    constructor: {
        value: Student
    }
})
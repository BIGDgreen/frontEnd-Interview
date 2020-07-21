function* read() {
    yield 1;
    yield 2;
    yield 3;
}

let it = read();
console.log(it.next());

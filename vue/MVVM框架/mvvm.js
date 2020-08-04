class Mvvm {
    constructor(options = {}) {
        this.$options = options;
        let data = this._data = this.$options.data;
        observe(data);
    }
}

function observe(data) {
    Object.keys(data).forEach(key => {

    })
}
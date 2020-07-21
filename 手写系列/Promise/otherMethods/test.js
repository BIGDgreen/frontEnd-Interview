const fs = require('fs');
const miniPromise = require('./index')

function read(url) {
    let dfd = miniPromise.defer();
    fs.readFile(url, 'utf-8', function (err, data) {
        if (err) dfd.reject(err);
        dfd.resolve(data);
    })
    return dfd.promise;
}

miniPromise.all([1, 2, 3, read('../name.txt'), 4, read('../age.txt'), 6])
    .then(data => {
        console.log(data);
    }, err => {
        console.log(err);
    })

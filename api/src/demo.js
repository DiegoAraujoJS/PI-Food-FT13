const fs = require('fs')
const Promise = require('bluebird')

const promise = new Promise (function(resolve, reject){
    resolve (1)
}).then(value => console.log(value))

console.log(promise)
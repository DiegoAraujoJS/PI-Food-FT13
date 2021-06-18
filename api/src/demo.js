const fs = require('fs')

const obj = {
    a:1,
    b:2,
    c:3
}

// var readable = fs.createReadStream(JSON.stringify(obj), {
//     encoding: 'utf8',
//     highWaterMark: 1 * 1024
// })
var writable = fs.createWriteStream(__dirname+'/recipes.txt')

writable.write(JSON.stringify(obj))
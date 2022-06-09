const jwt = require('jsonwebtoken')
let decoded = jwt.decode('alma');
console.log(decoded)
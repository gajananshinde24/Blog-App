const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler');

const generateJWTToken = asyncHandler( async  (payload) => {
   const token =   jwt.sign(payload, "Gajanan@123");
   return token;
});

module.exports = generateJWTToken;
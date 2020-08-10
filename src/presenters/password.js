const crypto = require('crypto')

/**
 * @function
 * @param  {string} password
 * @return {string}
 */
exports.generatePassword = (password) => crypto.createHmac('sha256', process.env.TOKEN_SECRET).update(password).digest('hex')

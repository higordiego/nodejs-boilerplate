
const { body } = require('express-validator')

exports.validateBodyAuthenticate = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

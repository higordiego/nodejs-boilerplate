
const { body } = require('express-validator')

exports.validateBodyExample = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
]

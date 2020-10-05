const { generateToken } = require('../../presenters/jwt')

exports.path = '/authenticate'
exports.method = 'post'
exports.middleware = []
exports.authenticate = false

exports.handler = async (_, res) => {
  return res.status(200).json({ token: generateToken('Testing') })
}

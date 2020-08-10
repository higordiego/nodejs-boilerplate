const { validateBodyExample } = require('./case')
const { validateErrorBody } = require('../../presenters/handle')

exports.path = '/example'
exports.method = 'get'
exports.middleware = [validateBodyExample, validateErrorBody]
exports.authenticate = true

exports.handler = async (req, res) => {
  return res.status(200).json()
}

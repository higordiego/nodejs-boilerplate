const { findOneAuthenticate } = require('../../database/repository/authenticate')
const { validateBodyAuthenticate } = require('./case')
const { validateErrorBody } = require('../../presenters/handle')
const { generatePassword } = require('../../presenters/password')
const { generateToken } = require('../../presenters/jwt')

exports.path = '/authenticate'
exports.method = 'POST'
exports.middleware = [validateBodyAuthenticate, validateErrorBody]
exports.authenticate = false

exports.handler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await findOneAuthenticate({ email: email.toLowerCase().trim(), password: generatePassword(password) })
    if (!user) return res.status(401).json({ errors: [{ title: 'Não autorizado', message: 'Usuário ou senha incorretos!' }] })
    return res.status(200).json({ data: { token: generateToken(user), user } })
  } catch (error) {
    next(error)
  }
}

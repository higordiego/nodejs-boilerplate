
const jwt = require('jsonwebtoken')
const tokenInvalidError = { errors: [{ title: 'Token inválido!', message: 'Token informado é inválido!' }] }

const verifyTokenJWT = (token) => {
  const key = process.env.TOKEN_SECRET
  return jwt.verify(token, key)
}

/**
 * @function
 * @param  {any} req
 * @param  {any} res
 * @param  {any} next
 * @return {next | res}
 */
exports.validateAuthorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).send({ errors: [{ title: 'Token inválido!', message: 'Token não informado!' }] })

    const splitedAuthHeader = authHeader.split(' ')

    if (splitedAuthHeader.length !== 2) return res.status(401).send({ errors: [{ title: 'Token inválido!', message: 'Erro no token!' }] })

    const [prefix, token] = splitedAuthHeader

    if (!/^Bearer$/i.test(prefix)) return res.status(401).send({ errors: [{ title: 'Token inválido!', message: 'Token mal formatado!' }] })

    if (!/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\\+\\/=]*)$/i.test(token)) return res.status(401).send({ errors: [{ title: 'Token inválido!', message: 'Token mal formatado!' }] })

    const userDecoder = await verifyTokenJWT(token)

    req.user = userDecoder

    return next()
  } catch (error) {
    return res.status(401).json(tokenInvalidError)
  }
}

/**
 * @function
 * @param  {any} object
 * @return {string}
 */
exports.generateToken = (object) => {
  return jwt.sign(object, process.env.TOKEN_SECRET)
}


const jwt = require('jsonwebtoken')
const tokenInvalidError = { errors: [{ title: 'Token inválido!', message: 'Token informado é inválido!' }] }

/**
 * @function
 * @param  {string} token
 * @return {Promise}
 */
const decodedTokenJwt = (token) => {
  try {
    const key = process.env.TOKEN_SECRET
    const decoded = jwt.decode(token, key)
    return decoded ? Promise.resolve(decoded) : Promise.reject(tokenInvalidError)
  } catch (err) {
    return Promise.reject(tokenInvalidError)
  }
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

    const parts = authHeader.split(' ')

    if (!parts.length === 2) return res.status(401).send({ errors: [{ title: 'Token inválido!', message: 'Erro no token!' }] })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ errors: [{ title: 'Token inválido!', message: 'Token mal formatado!' }] })

    const userDecoder = await decodedTokenJwt(token)

    req.user = userDecoder

    return next()
  } catch (error) {
    return res.status(401).json(error)
  }
}

/**
 * @function
 * @param  {any} object
 * @return {string}
 */
exports.generateToken = (object) => {
  const key = process.env.TOKEN_SECRET
  const token = jwt.sign(object, key, { algorithm: 'HS256' })
  return token
}

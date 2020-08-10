const Hoek = require('hoek')
const { validationResult } = require('express-validator')

/**
 * @function
 * @param  {Array} error
 * @return {Object}
 */
const parseErrorsExpressValidator = (errors) => errors.reduce((acc, value) => {
  acc.push({
    title: value.param || 'Ocorreu um erro',
    message: value.msg || 'Error não identificado, por favor entre em contato com o administrador!'
  })
  return acc
}, [])

/**
 * @function
 * @param  {any} req
 * @param  {any} res
 * @param  {any} next
 */
exports.validateErrorBody = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: parseErrorsExpressValidator(errors.array()) })
  }
  return next()
}

/**
 * @function
 * @param  {Object} object
 * @param  {Array} ...body
 * @param  {Object}
 * @return {void}
 */
exports.cleanBodyRequest = (object, ...body) => returnObject => {
  object = Hoek.merge({}, object)
  body.map(key => {
    if (object[key] !== undefined) returnObject[key] = object[key]
    return returnObject
  })
}

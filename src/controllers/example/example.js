
exports.path = '/authenticate'
exports.method = 'POST'
exports.middleware = [validateBodyAuthenticate, validateErrorBody]
exports.authenticate = false

exports.handler = async (req, res, next) => {
  try {
    return res.status(200).json({ data: { title: 'vivo' } })
  } catch (error) {
    return next(error)
  }
}

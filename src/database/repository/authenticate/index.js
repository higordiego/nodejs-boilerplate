
const { findOne } = require('../index')

exports.findOneAuthenticate = ({ email, password }) => {
  return findOne('User', {
    attributes: { exclude: ['password', 'forgot'] },
    where: { email, password },
    raw: true
  })
}

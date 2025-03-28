const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../utils/config')

const UnauthorizedError = require('../middlewares/errors/UnauthorizedError')

function auth (req, res, next) {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization required')
  }

  const token = authorization.replace('Bearer ', '')
  let payload

  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    throw new UnauthorizedError('Authorization required')
  }

  req.user = payload

  next()
  return auth
}
module.exports = auth

const jwt = require('jsonwebtoken')
const { JWT_SECRET , JWT_ISSUER } = require('../config')

const JWT_ALGORITHM = 'HS256'

function signToken (payload, expiresIn) {
  return Promise.resolve('dummy.jwt.token')
}

function verifyToken (token) {
  return Promise.resolve({
    userId: 'someuserId'
  })
}

function signAuthToken (user, scopes) {
  return signToken({
    userId: user.id,
    scopes: Array.isArray(scopes) ? scopes : [scopes]
  })
}

module.exports = {
  signAuthToken,
  signToken,
  verifyToken
}

const jwt = require('jsonwebtoken')
const { JWT_SECRET , JWT_ISSUER } = require('../config')

const JWT_ALGORITHM = 'HS256'

function signToken (payload, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      createJwtOptions(expiresIn),
      (err, token) => {
        if (err) reject(err)
        else resolve(token)
      }
    )
  })
}

function verifyToken (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_SECRET,
      {
        algorithms: [JWT_ALGORITHM],
        issuer: [JWT_ISSUER]
      },
      (err, decoded) => {
        if (err) reject(err)
        else resolve(decoded)
      }
    )
  })
}

function signAuthToken (user, scopes) {
  return signToken({
    userId: user.id,
    scopes: Array.isArray(scopes) ? scopes : [scopes]
  })
}

function createJwtOptions (expiresIn) {
  const options = {
    algorithm: JWT_ALGORITHM,
    issuer: JWT_ISSUER
  }
  if (expiresIn) options.expiresIn = expiresIn
  return options
}

module.exports = {
  signAuthToken,
  signToken,
  verifyToken
}

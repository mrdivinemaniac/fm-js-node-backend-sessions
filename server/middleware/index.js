const security = require('../security')

function checkAuth () {
  return async function checkAuthMiddleware (req, res, next) {
    const header = req.headers.authorization
    if (!header) return res.status(401).send({ error: 'No authorization header' })
    const valueIsValid = header.startsWith('Bearer ')
    if (!valueIsValid) return res.status(401).send({ error: 'Please use a bearer token' })
    const [, token] = header.split(' ')
    try {
      const tokenData = await security.verifyToken(token)
      req.authorization = { token, tokenData }
      next()
    } catch (e) {
      res.status(401).send({ error: 'Invalid token' })
    }
  }
}

module.exports = {
  checkAuth
}

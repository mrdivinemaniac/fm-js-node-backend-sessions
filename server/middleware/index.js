const security = require("../security")

function checkAuth () {
  return async function checkAuthMiddleware (req, res, next) {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) return res.status(401).send({ error: 'Authorization Header is not present' })
    const valueIsValid = authorizationHeader.startsWith('Bearer ')
    if (!valueIsValid) return res.status(401).send({ error: 'Please use a Bearer token for authorization' })
    const token = authorizationHeader.split(' ')[1]
    try {
      const tokenData = await security.verifyToken(token)
      req.authoriation = { token, tokenData }
      next()
    } catch (e) {
      res.status(401).send({ error: 'Invalid Authorization Token' })
    }
  }
}

module.exports = {
  checkAuth
}

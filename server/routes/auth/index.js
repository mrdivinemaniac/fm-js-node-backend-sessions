const express = require('express')
const revokedTokens = require('../../models/revoked-tokens')
const users = require('../../models/users')
const security = require('../../security')

const router = express.Router()

router.post('/token', express.json(), async (req, res, next) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const user = await users.findUserByCredentials(username, password)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const token = await security.signAuthToken(user, '*')
    res.json({ token })
  } catch (e) {
    next(e)
  }
})

router.get('/revoke', (req, res) => {
  revokedTokens.revokeToken()
})

module.exports = router
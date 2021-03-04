const express = require('express')
const { checkAuth } = require('../../middleware')
const revokedTokens = require('../../models/revoked-tokens')
const users = require('../../models/users')
const security = require('../../security')
const { createLogger } = require('../../logger')

const logger = createLogger('routes/auth')

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

router.get('/revoke', checkAuth(), async (req, res, next) => {
  try {
    await revokedTokens.revokeToken(req.authorization.token)
    console.log(`Successfully Revoked Token ${req.authorization.token}`)
    res.send()
  } catch (e) {
    next(e)
  }
})

router.post('/signup', express.json(), async (req, res, next) => {
  const { username, email, password } = req.body
  logger.debug('New Signup Request Received', req.body)
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'username, email and password are required' })
  }
  // TODO: Add Validation for fields using something like joi
  try {
    const createdUser = await users.createUser(email, username, password)
    logger.info('Created new user', { id: createdUser.id, username, email })
    const response = { ...createdUser, password: undefined }
    res.json(response)
  } catch (e) {
    if (e instanceof users.UserAlreadyExistsError) {
      res.status(400).send({ error: 'A User with that email or username already exists' })
    } else {
      next(e)
    }
  }
})

module.exports = router

const express = require('express')
const postRouter = require('./posts')
const authRouter = require('./auth')
const { checkAuth } = require('../middleware')

const router = express.Router()

router.use('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: `I'm doing alright! Thanks!`
  })
})

router.use('/posts', checkAuth(), postRouter)
router.use('/auth', authRouter)

router.use('*', (req, res, next) => {
  res.status(404).json({ error: 'Not found!' })
})

module.exports = router

const express = require('express')
const postRouter = require('./posts')
const authRouter = require('./auth')
const { checkAuth } = require('../middleware')

const router = express.Router()

router.use('/posts', checkAuth(), postRouter)
router.use('/auth', authRouter)

module.exports = router

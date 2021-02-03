const express = require('express')
const postRouter = require('./posts')
const authRouter = require('./auth')

const router = express.Router()

router.use('/posts', postRouter)
router.use('/auth', authRouter)

module.exports = router

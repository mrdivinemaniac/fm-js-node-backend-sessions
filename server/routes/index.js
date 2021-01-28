const express = require('express')
const postsRouter = require('./posts')
const devRouter = require('./dev')

const router = express.Router()
// NOTE: Route Middleware
router.use('/posts', postsRouter)
// NOTE: Route Middleware
router.use('/dev', devRouter)

module.exports = router
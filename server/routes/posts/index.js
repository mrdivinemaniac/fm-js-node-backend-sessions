const express = require('express')
const multer = require('multer')
const uuid = require('uuid')
const postsModel = require('../../models/posts')
const likesRouter = require('./likes')
const { createLogger } = require('../../logger')

const logger = createLogger('routes/posts')

const router = express.Router()

class InvalidFileError extends Error {}

const storage = multer.diskStorage({
  destination: './public/upload',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + uuid.v4())
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileIsValid = (
      file.mimetype.startsWith('/text') || ['application/javascript', 'application/json'].includes(file.mimetype)
    )
    if (!fileIsValid) {
      console.log(`Unsupported file type uploaded ${file.mimetype}`)
      cb(new Error('Upload file must be a text file'))
    } else cb(null, true)
  }
})

router.post('/', upload.single('codeFile'), async (req, res, next) => {
  try {
    if(!req.body.message) {
      logger.debug('User did not specify message. Responding with 400')
      res.status(400).send({ error: 'Message field is required.' })
      return
    }
    logger.info('Post created')
    const createdPost = await postsModel.createPost(
    req.body.message,
      req.file ? req.file.filename : null
    )
    res.status(201).json(createdPost)
  } catch (e) {
      next(e)
  }
})

// Get all lists 
router.get('/', async (req, res, next) => {
  try {
    const posts = await postsModel.getPosts()
    return res.json(posts)
  } catch (e) {
    next(e)
  }
})

router.param('postId', async (req, res, next, postId) => {
  try {
    const post = await postsModel.getPost(postId)
    if (!post) {
      res.status(404).send('Post not found')
    } else {
      req.post = post
      next()
    }
  } catch (e) {
    next(e)
  }
})

// Getting a single post by id
router.get('/:postId', async (req, res, next) => {
  res.json(req.post)
})

router.delete('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params
    await postsModel.deletePost(postId)
    res.send()
  } catch (e) {
    next(e)
  }
})

// updating certain fields in the record
router.patch('/:postId', upload.single('codeFile'), async (req, res, next) => {
  try {
    const { postId } = req.params
    const { message } = req.body
    const file = req.file

    const updatedPost = await postsModel.updatePost(postId, message, file)
    res.json(updatedPost)
  } catch (e) {
    next(e)
  }
})

router.use((err, req, res, next) => {
  if (err instanceof InvalidFileError) {
    res.status(400).json({ error: err.message})
  } else {
    next(err)
  }
})

// TODOS Figure out how to retrieve postId in likesRouter
router.use('/:postId/likes', likesRouter)

module.exports = router

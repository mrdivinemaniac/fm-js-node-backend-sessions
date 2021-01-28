const express = require('express')
const multer = require('multer')
const path = require('path')
const uuid = require('uuid')
const crud = require('./crud')

class InvalidFileError extends Error {}

const router = express.Router()

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + uuid.v4() + path.extname(file.originalname))
  }
})

// NOTE: Check error handler in the bottom
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // NOTE: mime type is normally determined by extension
    // But, multer uses 'busboy' internally to determine mime type from actual content of the file

    // accept only text files
    const fileIsValid = (
      file.mimetype.startsWith('text/') ||
      ['application/javascript', 'application/json'].includes(file.mimetype)
    )
    if (!fileIsValid) {
      console.info(`Unsupported file type uploaded: ${file.mimetype}`)
      cb(new InvalidFileError('Uploaded file must be a text file'))
    }
    else cb(null, true)
  }
})

// NOTE: this uses third party middleware
// NOTE: INITIALIZE UPLOAD before coding this
router.post('/', upload.single('codeFile'), async (req, res, next) => {
  try {
    console.log('Received posts request')
    // NOTE: req.body and req.file are set by multer
    // if we don't use a middleware, body is undefined
    // More on this later when we learn about streams
    if (!req.body.message) {
      res.status(400).send({ error: 'message is required' })
      // res.render('index', { error: 'message is required' })
      return
    }
    const createdPost = await crud.createPost(
      req.body.message,
      req.file ? req.file.path : null
    )
    res.json(createdPost)
  } catch (e) {
    next(e)
  }
})

// NOTE: Error-handling middleware
router.use((err, req, res, next) => {
  if (err instanceof InvalidFileError) {
    res.status(400).json({ error: err.message })
  } else {
    next(err)
  }
})

module.exports = router

const express = require('express')
const multer = require('multer')
const uuid = require('uuid')
const crud = require('./crud')

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
      cb(new InvalidFileError('Upload file must be a text file'))
    } else cb(null, true)
  }
})

router.post('/', upload.single('codeFile'), async (req, res, next) => {
  try {
    if(!req.body.message) {
      res.status(400).send({ error: 'Message field is required.' })
      return
    }
      const createdPost = await crud.createPost(
      req.body.message,
        req.file ? req.file.filename : null
      )
    res.json(createdPost)
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

module.exports = router

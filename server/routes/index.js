const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const uuid = require('uuid')

class InvalidFileError extends Error {}

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index' )
})

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + uuid.v4() + path.extname(file.originalname))
  }
})

// Check error handler in the bottom
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // accept only text files
    const fileIsValid = (
      file.mimetype.startsWith('text/') ||
      ['application/javascript', 'application/json'].includes(file.mimetype)
    )
    if (!fileIsValid) cb(new InvalidFileError('Uploaded file must be a text file'))
    else cb(null, true)
  }
})

// Jagaran
router.post('/posts', upload.single('codeFile'), (req, res) => {
  console.log('Received posts request')
  if (!req.body.message) {
    res.render('index', { error: 'message is required' })
    return
  }
  res.json({
    id: uuid.v4(),
    message: req.body.message,
    codeFilePath: req.file.filename,
    likes: 0
  })
})

// Bikash
router.post('/stream-upload', (req, res) => {
  // Uncomment to show data coming in
  // req.on('data', data => {
  //   console.log('---data', data.toString())
  // })
  const fileStream = fs.createWriteStream('./testwrite.txt')
  req.pipe(fileStream)
  req.on('end', () => {
    res.send('ok!')
  })
})

// Error handler
router.use((err, req, res, next) => {
  if (err instanceof InvalidFileError) {
    res.status(400).send({ error: err.message })
  } else {
    next(err)
  }
})

module.exports = router
const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
      // TODO: use UUID
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage }).single('testFile')

router.get('/', (req, res) => {
    // TODO: pass variables
    res.render('index')
})

// TODO: use middleware
router.post('/uploads', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send(err)
    } else {
      console.log({ file: req.file})
      res.send('test')
    }
  })
})

module.exports = router
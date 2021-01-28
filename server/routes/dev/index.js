const express = require('express')

const router = express.Router()

// Jagaran
router.get('/upload', (req, res) => {
  // NOTE: This uses the view settings we set earlier in root index.js
  // upload must be a file in the views directory
  res.render('upload')
})

// Bikash
router.post('/stream-upload', (req, res, next) => {
  // Uncomment to show data coming in
  // req.on('data', data => {
  //   console.log('---data', data.toString())
  // })
  const fileStream = fs.createWriteStream('./testwrite.txt')
  req.pipe(fileStream)
  // NOTE: EventEmitter API + Streams
  req.on('end', () => {
    res.send('ok!')
  })
  req.on('error', next)
})

module.exports = router

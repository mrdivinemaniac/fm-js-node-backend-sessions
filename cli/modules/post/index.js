const yargs = require('yargs')
const http = require('http')
const fs = require('fs')
const config = require('../../config')
const fetch = require('node-fetch')
const FormData = require('form-data')

yargs
  .command('post <message>', 'Creates a new post', yargs => {
    yargs.positional('message', {
      describe: 'The message to post',
      type: 'string'
    }).option('file', {
      alias: 'f',
      description: 'A text file to attach with your post',
      type: 'string'
    })
  }, main).argv

async function main (args) {
  const { message, file } = args
  if (file) await validateFile(file)
  // Uncomment in streams example
  // const response = await requestStreamCreatePost(message, file)
  const response = await requestCreatePost(message, file)
  if (response.error) throw new Error(response.error)
  else console.log(`New post created with id ${response.id}`)
}

function validateFile (filePath) {
  return new Promise((resolve, reject) => {
    // NOTE: also show fs.readdir (not sync) and explain callback structure
    fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, err => {
      if (err) reject(`Cannot access file ${filePath} `)
      else resolve()
    })
  })
}

function requestCreatePost (message, filePath) {
  const form = new FormData()
  form.append('message', message)
  if (filePath) {
    form.append('codeFile', fs.createReadStream(filePath))
  }
  return fetch(`${config.apiHost}/posts`, {
    method: 'POST',
    body: form
  }).then(res => res.json())
}

function requestStreamCreatePost (message, filePath) {
  // NOTE: go to slides and explain streams
  // NOTE: explain EventEmitterAPI
  return new Promise((resolve, reject) => {
    const fileStream = filePath ? fs.createReadStream(filePath) : null
    const options = {
      host: 'localhost',
      port: 3000,
      path: '/stream-upload',
      method: 'POST'
    }
    // NOTE: req is a stream
    const req = http.request(
      options,
      res => {
        // NOTE: res is a stream
        res.on('data', data => {
          // NOTE: data is a buffer
          resolve(data.toString())
        })
        res.on('error', e => {
          reject(e)
        })
      }
    )
    req.on('error', e => reject(e))
    if (fileStream) fileStream.pipe(req)
  })
}

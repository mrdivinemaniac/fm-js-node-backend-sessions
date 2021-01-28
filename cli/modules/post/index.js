const yargs = require('yargs')
const fs = require('fs')
const fetch = require('node-fetch')
const FormData = require('form-data')
const config = require('../../config')

yargs
  .command('post <message>', 'Creates a post', yargs => {
    yargs
      .positional('message', {
        description: 'The message to post',
        type: 'string'
      })
      .option('file', {
        alias: 'f',
        description: 'A text file to attach to the post',
        type: 'string'
      })
  }, main).argv

async function main ({ file, message }) {
  if (file) await validateFile(file)
  const response = requestCreatePost(message, file)
  if (response.error) throw new Error(response.error)
  else console.log(`New post created with id ${response.id}`)
}

function validateFile (filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, err => {
      if (err) reject(`Cannot access file: ${filePath}`)
      else resolve(true)
    })
  })
}

async function requestCreatePost (message, filePath) {
  const form = new FormData()
  form.append('message', message)
  if (filePath) {
    form.append('codeFile', fs.createReadStream(filePath))
  }

  const res = await fetch(`${config.apiHost}/posts`, {
    method: 'POST',
    body: form
  })
  return res.json()
}

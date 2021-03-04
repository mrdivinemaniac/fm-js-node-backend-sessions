const prompt = require('prompt')
const { saveToken, requestApi } = require('../../utils')

main()

async function main () {
  const { username, password } = await promptCredentials()
  const { error, token } = await requestToken(username, password)
  if (error) throw new Error(error)
  saveToken(token)
  console.log('Logged in successfully')
}

async function requestToken (username, password) {
  const res = await requestApi('auth/token', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

function promptCredentials () {
  prompt.message = ''
  prompt.start()
  return prompt.get({
    properties: {
      username: {
        required: true
      },
      password: {
        required: true,
        hidden: true,
        replace: '🤐'
      }
    }
  })
}

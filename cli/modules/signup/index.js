const prompt = require('prompt')
const { requestApi } = require('../../utils')

main()

async function main () {
  const { email, username } = await promptUserInformation()
  const password = await promptPassword()
  const { error } = await requestSignup(email, username, password)
  if (error) throw new Error(error)
  console.log('Signed up successfully. You can now login')
}

async function requestSignup (email, username, password) {
  const res = await requestApi('auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.json()
}

function promptUserInformation () {
  prompt.message = ''
  prompt.start()
  return prompt.get({
    properties: {
      email: {
        required: true,
        // Regexp Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      },
      username: {
        required: true
      }
    }
  })
}

async function promptPassword () {
  prompt.message = ''
  prompt.start()
  do {
    const { password, confirmPassword } = await prompt.get({
      properties: {
        password: {
          required: true,
          hidden: true,
          replace: '🤐',
          message: 'Password must be atleast 6 characters',
          conform: value => value.length >= 6
        },
        confirmPassword: {
          required: true,
          hidden: true,
          replace: '🙊'
        }
      }
    })
    if (password === confirmPassword) return password
    console.warn('The passwords do not match. Please try again')
  } while(true)
}

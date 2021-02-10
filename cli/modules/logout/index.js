const { deleteToken, requestAuthenticatedApi, readToken } = require("../../utils")

main()

async function main () {
  const token = readToken()
  if (!token) return console.log('You are not logged in')
  const { error } = await requestRevoke()
  if (error) throw new Error(error)
  deleteToken()
  console.log('You Have Been Logged Out')
}

async function requestRevoke () {
  const res = await requestAuthenticatedApi('auth/revoke', {
    method: 'GET'
  })
  if (res.status !== 200) return res.json()
  else return {}
}

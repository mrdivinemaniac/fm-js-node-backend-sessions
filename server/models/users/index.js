const uuid = require('uuid')
const crypto = require('crypto')
const { PASSWORD_SALT } = require('../../config')
const { dbClient } = require('../../database')

class UserAlreadyExistsError extends Error {}

/**
 * Checks if the user with the provided credentials exists
 * and returns the user object
 */
async function findUserByCredentials (username, password) {
  const userByUsername = await dbClient('users').select('*').where({ username })
  return (userByUsername.password_hash === hashPassword(password))
    ? username
    : null
}

async function createUser (email, username, password) {
  const user = await dbClient('users')
    .select('id')
    .where({ email })
    .orWhere({ username })
    .first()
  if (user) throw new UserAlreadyExistsError()
  return dbClient('users')
    .insert({
      id: uuid.v4(),
      email,
      username,
      password_hash: hashPassword(username, password)
    })
}

function hashPassword (username, password) {
  return crypto.createHash('sha256')
    .update(password)
    .update(username)
    .update(PASSWORD_SALT)
    .digest('hex')
}

module.exports = {
  findUserByCredentials,
  createUser,
  UserAlreadyExistsError
}

const uuid = require('uuid')

/**
 * Checks if the user with the provided credentials exists
 * and returns the user object
 */
function findUserByCredentials (username, password) {
  // TODO: implement after database integration
  return Promise.resolve({
    id: uuid.v4(),
    username
  })
}

function createUser (email, username, password) {
  // TODO: Insert into Database
  return Promise.resolve({
    id: uuid.v4(),
    email,
    username,
    password
  })
}

module.exports = {
  findUserByCredentials,
  createUser
}

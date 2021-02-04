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

module.exports = {
  findUserByCredentials
}

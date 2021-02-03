const uuid = require('uuid')

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

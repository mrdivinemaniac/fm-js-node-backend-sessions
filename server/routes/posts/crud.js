const uuid = require("uuid")

function createPost (message, codeFileName) {
  // NOTE: Mention that we will add this to db in a later session
  const createdDummyPost = {
    id: uuid.v4(),
    message,
    codeFileName,
    likes: 0
  }
  console.log('New Post Created!')
  console.dir(createdDummyPost)
  // Simulate database operation
  return Promise.resolve(createdDummyPost)
}

module.exports = {
  createPost
}

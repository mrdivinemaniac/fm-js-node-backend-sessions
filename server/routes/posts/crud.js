const uuid = require('uuid')

function createPost (message, codeFileName) {
 console.log('Creating Post')
 const dummyCreatedPost = {
    id: uuid.v4(),
    message,
    codeFileName,
    like: 0
  }
  console.log('New post created')
  console.dir(dummyCreatedPost)
  return Promise.resolve(dummyCreatedPost) 
}

module.exports = {
  createPost
}

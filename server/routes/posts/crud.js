const uuid = require('uuid')

const samplePosts = [...Array(5).keys()].map(i => {
  return {
      id: i + 1,
      message: `This is message ${i + 1}`
  }
})

function createPost (message, codeFileName) {
 console.log('Creating Post...')
 const dummyCreatedPost = {
    id: uuid.v4(),
    message,
    codeFileName,
    like: 0
  }
  console.log('New post created', dummyCreatedPost)
  return Promise.resolve(dummyCreatedPost) 
}

function getPost (id) {
  console.log(`Retrieving Post with id ${id}...`)
  const retrievedPost = samplePosts.find(post => post.id == id)
  return Promise.resolve(retrievedPost) 
}

function getPosts (limit = undefined) {
  console.log('Retrieving Posts...')
  const posts = samplePosts.filter((post,i) => limit ? i <= (limit - 1) : post)
  return Promise.resolve(posts) 
}

function deletePost (id) {
  console.log(`Deleting Posts with id ${id}...`)
  const posts = samplePosts.filter(post => post.id !== Number(id))
  console.log({ posts })
  return Promise.resolve('Deleted') 
}


module.exports = {
  createPost,
  getPost,
  getPosts,
  deletePost
}

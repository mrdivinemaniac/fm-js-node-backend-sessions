const uuid = require('uuid')
const { createLogger } = require('../../logger')

const logger = createLogger('models/posts')

const samplePosts = [...Array(5).keys()].map(i => {
  return {
    id: i + 1,
    message: `This is message ${i + 1}`
  }
})

function createPost (message, codeFileName) {
  logger.debug('Creating Post...')
  const dummyCreatedPost = {
    id: uuid.v4(),
    message,
    codeFileName,
    like: 0
  }
  logger.info('New post created:', dummyCreatedPost)
  return Promise.resolve(dummyCreatedPost) 
}

function getPost (id) {
  logger.debug(`Retrieving Post with id ${id}...`)
  const retrievedPost = samplePosts.find(post => post.id == id)
  return Promise.resolve(retrievedPost) 
}

function getPosts (limit = undefined) {
  logger.debug('Retrieving Posts...')
  const posts = samplePosts.filter((post,i) => limit ? i <= (limit - 1) : post)
  return Promise.resolve(posts) 
}

function deletePost (id) {
  logger.info(`Deleting Posts with id ${id}...`)
  const posts = samplePosts.filter(post => post.id === Number(id))
  return Promise.resolve('Deleted') 
}

function updatePost (id, message, codeFileName) {
  logger.info(`Updating Posts with id ${id}...`)
  const updateObject = {}
  if (message) updateObject.message = message
  if (codeFileName) updateObject.codeFileName = codeFileName

  const updatedSamplePosts = samplePosts.map(post => post.id === Number(id) ? { ...post, ...updateObject } : post)
  const updatedPost = updatedSamplePosts.find(post => post.id === Number(id))
  return Promise.resolve(updatedPost) 
}


module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost
}

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const config = require('../config')

const DATA_FILE_PATH = path.join(__dirname, '../', 'data')

function saveToken (token) {
  // TODO: save the token somewhere
}

function readToken () {
  // TODO: read the token from the saved location
}

function deleteToken () {
  // TODO: delete the currently saved token
}

function requestApi (apiPath, ...rest) {
  return fetch(`${config.apiHost}/${apiPath}`, ...rest)
}

function requestAuthenticatedApi (apiPath, options, ...rest) {
  const token = readToken()
  if (!token) throw new Error('You are not logged in. Please login using the login command')
  const patchedOptions = {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {})
    }
  }
  return requestApi(apiPath, patchedOptions, ...rest)
}

module.exports = {
  saveToken,
  readToken,
  deleteToken,
  requestApi,
  requestAuthenticatedApi
}

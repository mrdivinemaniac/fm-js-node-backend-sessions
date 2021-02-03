const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const config = require('../config')

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

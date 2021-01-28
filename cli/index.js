const fs = require('fs')
const path = require('path')

const modulesPath = path.join(__dirname, 'modules')

const [, , command] = process.argv
requireModuleForCommand(command)

function requireModuleForCommand (command) {
  const modulePath = path.join(modulesPath, command)
  try {
    if (!command) throw new Error(`No Command!`)
    if (!fs.existsSync(modulePath)) throw new Error(`Invalid Command!`)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    console.log(getSupportedCommands())
    return
  }
  require(modulePath)
}

function getSupportedCommands () {
  const moduleDirs = fs.readdirSync(modulesPath)
  return [
    'These commands are supported:',
    ...moduleDirs
  ].join('\n')
}

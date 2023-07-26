import { readdirSync } from 'fs'
import { getCurrentTime } from '../utils/time.js'

async function importFunctionFromFile (file) {
  const module = await import(`../../handlers/${file}`)
  if (!module || typeof module.default !== 'function') {
    throw new Error(`loading file ${file}, desired \`function\` was not found`)
  } else {
    return module.default
  }
}

export async function loginToClient (client, token) {
  if (typeof token !== 'string') {
    throw new Error(`The token type [string] was expected, but got a [${typeof token}]`)
  }

  if (typeof client !== 'object') {
    throw new Error(`The client type [object] was expected, but got a [${typeof client}]`)
  }

  await client.login(token)
    .then(async () => {
      console.log(`[${getCurrentTime()}]: 🤖 Logged in successfully, application is ready to use.`)

      const files = readdirSync('./src/handlers').filter(file => file.endsWith('.js'))
      for (const file of files) {
        const _function = await importFunctionFromFile(file)
        if (_function) _function(client, token)
      }
    })
    .catch((error) => { throw new Error(error) })
}

import { readdirSync } from 'fs'
import { getCurrentTime } from '../functions/utils/time.js'

export default async function events (client) {
  const folders = readdirSync('./src/events', { withFileTypes: true })

  for (const folder of folders) {
    if (folder.isDirectory()) {
      const files = readdirSync(`./src/events/${folder.name}`).filter(file => file.endsWith('.js'))

      for (const file of files) {
        const event = (await import(`../events/${folder.name}/${file}`)).default

        if (!event || typeof event.name !== 'string' || typeof event.execute !== 'function') {
          console.log(`[${getCurrentTime()}]: ❌ Failed to receive event.name [string] or event.execute [function] from ${file}`)
          continue
        }

        const eventHandler = (...args) => {
          try {
            event.execute(...args, client)
          } catch (error) {
            throw new Error(`${error} | ${file}`)
          }
        }

        if (event.once) {
          client.once(event.name, eventHandler)
        } else {
          client.on(event.name, eventHandler)
        }
      }
    }
  }
}

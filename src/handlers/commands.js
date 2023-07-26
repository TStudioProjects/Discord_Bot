import { REST, Routes } from 'discord.js'
import { readdirSync } from 'fs'
import { getCurrentTime } from '../functions/utils/time.js'

export default async function commands (client, token) {
  const rest = new REST({ version: 10 }).setToken(token)
  const folders = readdirSync('./src/commands', { withFileTypes: true })

  for (const folder of folders) {
    if (folder.isDirectory()) {
      const files = readdirSync(`./src/commands/${folder.name}`).filter(file => file.endsWith('.js'))

      for (const file of files) {
        const command = (await import(`../commands/${folder.name}/${file}`)).default

        if (!command || typeof command.data.name !== 'string' || typeof command.execute !== 'function') {
          console.log(`[${getCurrentTime()}]: ❌ Failed to receive command.data.name [string] or command.execute [function] from ${file}`)
          continue
        } else {
          console.log(`[${getCurrentTime()}]: 📂 Command [${command.data.name}] is ready.`)
        }

        try {
          client.commands.set(command.data.name, command)
          client.commandsArray.push(command.data.toJSON())
        } catch (error) {
          throw new Error(`${error} | ${file}`)
        }
      }
    }
  }

  try {
    const route = Routes.applicationCommands(client.user.id)
    await rest.put(route, { body: client.commandsArray })
  } catch (error) {
    console.log(`[${getCurrentTime()}]: ❌ ${error}`)
  }
}

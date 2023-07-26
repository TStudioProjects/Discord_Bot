import { config } from 'dotenv'
import { Client, Collection } from 'discord.js'
import { IntentsArray, PartialsArray } from './src/config/client.js'
import { connectToDatabase } from './src/functions/general/database.js'
import { loginToClient } from './src/functions/general/client.js'
import { getCurrentTime } from './src/functions/utils/time.js'

config()

const client = new Client({ intents: IntentsArray, partials: PartialsArray })
client.commands = new Collection()
client.commandsArray = []

async function start () {
  try {
    await connectToDatabase(process.env.Mongo_Url)
    await loginToClient(client, process.env.Token)
  } catch (err) {
    console.log(`[${getCurrentTime()}]: ❌ ${err.message}.`)
  }
}

start()

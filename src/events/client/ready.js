import { ActivityType } from 'discord.js'
import ms from 'ms'
import { getCurrentTime } from '../../functions/utils/time.js'

const event = {
  name: 'ready',
  once: true,

  execute (client) {
    const activities = [
      { name: '📦 TS Oficial Discord Server™', type: ActivityType.Watching },
      { name: '🎯 Visual Studio Code', type: ActivityType.Watching },
      { name: '🧩 SPOTIFY', type: ActivityType.Listening }
    ]

    setInterval(() => {
      const random = Math.floor(Math.random() * activities.length)
      const { name, type } = activities[random]
      client.user.setPresence({ activities: [{ name, type }] })
    }, ms('10s'))

    console.log(`[${getCurrentTime()}]: 🦖 Bot is ready.`)
    console.log(`[${getCurrentTime()}]: 🔗 ID: ${client.user.id}.`)
  }
}

export default event

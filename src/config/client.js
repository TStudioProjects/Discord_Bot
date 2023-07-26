import { GatewayIntentBits, Partials } from 'discord.js'

const IntentsArray = [
  GatewayIntentBits.AutoModerationConfiguration,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildScheduledEvents,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent
]

const PartialsArray = [
  Partials.Channel,
  Partials.GuildMember,
  Partials.GuildScheduledEvent,
  Partials.Message,
  Partials.Reaction,
  Partials.ThreadMember,
  Partials.User
]

export { IntentsArray, PartialsArray }

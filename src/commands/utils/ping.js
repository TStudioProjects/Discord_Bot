import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import ms from 'ms'

const command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('💻・View the client\'s ping')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  async execute (interaction, client) {
    await interaction.deferReply({ ephemeral: true })

    const reply = await interaction.fetchReply()
    const ping = reply.createdTimestamp - interaction.createdTimestamp

    await interaction.editReply(`**<:succes:1133287183931936830>  Client: \`${ping}\` ms │ Websocket: \`${client.ws.ping}\` ms  <:cloud_download:1133289774912909433>**`).then(() => {
      setTimeout(async () => {
        await interaction.deleteReply().catch(() => { return null })
      }, ms('5s'))
    }).catch(() => { return null })
  }
}

export default command

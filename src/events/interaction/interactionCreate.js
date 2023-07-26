import ms from 'ms'

const event = {
  name: 'interactionCreate',
  once: false,

  execute (interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName)

      if (command) {
        try {
          command.execute(interaction, client)
        } catch (error) {
          interaction.reply({
            content: '**<:deined:1133286596406423612>  An error has occurred. Try again later**',
            ephemeral: true
          }).then(() => {
            setTimeout(async () => {
              await interaction.deleteReply().catch(() => { return null })
            }, ms('5s'))
          }).catch(() => { return null })

          throw new Error(`${error} | ${command.data.name}`)
        }
      }
    }
  }
}

export default event

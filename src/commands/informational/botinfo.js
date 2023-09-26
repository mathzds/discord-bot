const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription("Return bot information"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({ fetchReply: true });

    const apiLatency = client.ws.ping
    const clientPing = message.createdTimestamp - interaction.createdTimestamp

    const embed = new EmbedBuilder()
      .setColor('Grey')
      .setTitle(`Bots Info`)
      .addFields([
        {
          name: 'API Latency:',
          value: `${apiLatency}`,
          inline: false
        },
        {
          name: 'Client Ping:',
          value: `${clientPing}ms`,
          inline: false
        }
      ])
      .setTimestamp(Date.now())
      .setFooter({ text: `Requested By: ${interaction.user.username}` })
    await interaction.editReply({
      embeds: [embed]
    });
  },
};
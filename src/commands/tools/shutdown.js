const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Shutsdown the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`Bot Shutting Down`)
      .setTimestamp(Date.now())
      .setFooter({
        text: `Requested By: ${interaction.user.username}`,
      });
    console.log("\x1b[41m%s\x1b[0m",`${interaction.user.username} - (${interaction.user.id}) has shutdown the bot`);
    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
    console.log("\x1b[41m%s\x1b[0m",`${client.user.username} has been shutdown`);
    process.exit();
  },
};

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Returns user info")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("the targeted user")
        .setRequired(false)
    ),
  async execute(interaction) {
    let target = interaction.options.getUser("target");
    if (!target) target = interaction.user;

    const memberJoined = target.joinedAt
    const memberCreated = target.createdAt

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`${target?.username}'s Info`)
      .setDescription(`${target?.id}`)
      .addFields([
        {
          name: "Server Join Date",
          value: moment(memberJoined).format("LLLL"),
          inline: true,
        },
        {
          name: "Discord Join Date",
          value: moment(memberCreated).format("LLLL"),
          inline: true,
        },
      ])
      .setTimestamp(Date.now())
      .setFooter({ text: `Requested By: ${interaction.user.username}` });
    await interaction.reply({
      embeds: [embed],
    });
  },
};

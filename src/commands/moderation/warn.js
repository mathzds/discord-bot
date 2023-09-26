const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, time, } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setName("warn")
    .setDescription("Warn the targeted user")
    .addUserOption((option) =>
      option.setName("target").setDescription("User to warn").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason For warn")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    if (target.id === interaction.user.id)
    return await interaction.reply({
      content: `Error 405: You cannot warn yourself`, ephemeral: true,
    });
    const member = await interaction.guild.members
      .fetch(target.id)
      .catch(console.error);
    let reason = interaction.options.getString("reason");
    if (!reason) reason = "Reason not provided";

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`You were warned in ${interaction.guild.name}`)
      .setDescription(`${reason}`)
      .addFields([
        {
          name: "Infraction ID",
          value: `infid`,
          inline: true,
        },
        {
          name: "Type",
          value: `Warn`,
          inline: true,
        },
        {
          name: "Moderator",
          value: `${interaction.user} (${interaction.user.id})`,
          inline: false,
        },
        {
          name: "Date",
          value: `${time(new Date())}`,
          inline: false,
        }
      ]);
    await target
      .send({
        embeds: [embed],
      })
      .catch(() =>
        console.log(`User - ${member.user.username} (${member.id}) has DMs disabled`)
      );
    await interaction.reply({
      content: `${target.username} (${target.id}) has been warned succesfully`,
    });
  },
};

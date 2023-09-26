const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, time } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setName("timeout")
    .setDescription("Timeout a Targeted User")
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option.setName("target").setDescription("User to mute").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("duration of the mute")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason For mute")
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("target");
    if (target.id === interaction.user.id) return await interaction.reply({ content: `Error 405: You cannot timeout yourself`, ephemeral: true, });
    const member = await interaction.guild.members
      .fetch(target.id)
      .catch(console.error);
      
    const duration = interaction.options.getInteger("duration");
    let reason = interaction.options.getString("reason");
    if (!reason) reason = "Reason not provided";
    if (!member)
      return await interaction.reply({
        content: "Error 404: User Not Found",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`You were Timedout in ${interaction.guild.name}`)
      .setDescription(`${reason}`)
      .addFields([
        {
          name: "Infraction ID",
          value: `infid`,
          inline: true,
        },
        {
          name: "Type",
          value: `Timeout`,
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
        },
      ]);
    await target
      .send({
        embeds: [embed],
      })
      .catch(() =>
        console.log(
          `User - ${member.user.username} (${member.id}) has DMs disabled`
        )
      );
    await member.timeout(duration * 60 * 1000, reason);
    await interaction.reply(
      `${member.user.username} (${member.id}) has been timedout succesfully`
    );
  },
};

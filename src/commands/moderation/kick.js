const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, time, } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setName("kick")
    .setDescription("Kicks the targeted user")
    .addUserOption((option) =>
      option.setName("target").setDescription("User to kick").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason For kick")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    if (target.id === interaction.user.id) return await interaction.reply({ content: `Error 405: You cannot kick yourself`, ephemeral: true });
    
    const member = await interaction.guild.members
      .fetch(target.id)
      .catch(console.error);
    let reason = interaction.options.getString("reason");
    if (!reason) reason = "Reason not provided";
    if (!member) return await interaction.reply({content: 'Error 404: User Not Found In Guild', ephemeral: true,});
    
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`You were kicked from ${interaction.guild.name}`)
      .setDescription(`${reason}`)
      .addFields([
        {
          name: "Infraction ID",
          value: `infid`,
          inline: true,
        },
        {
          name: "Type",
          value: `Kick`,
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
    await member.kick(reason).catch(console.error);
    await interaction.reply({
      content: `${target.username} (${target.id}) has been kicked succesfully`,
    });
  },
};

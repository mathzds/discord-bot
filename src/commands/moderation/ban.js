const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, time } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setName("ban")
    .setDescription("Bans the targeted user")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option.setName("target").setDescription("User to ban").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("duration")
        .setDescription("Duration of ban")
        .setRequired(true)
        .addChoices({ name: "Perm", value: "perm_ban" })
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason For ban")
        .setRequired(false)
    ),
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    if (target.id === interaction.user.id) return await interaction.reply({ content: `Error 405: You cannot ban yourself`, ephemeral: true, });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "Reason not provided";

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle(`You were banned from ${interaction.guild.name}`)
      .setDescription(`${reason}`)
      .addFields([
        {
          name: "Infraction ID",
          value: `infid`,
          inline: true,
        },
        {
          name: "Type",
          value: `Ban`,
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
        {
          name: "End Date",
          value: `N/A`,
          inline: false,
        },
      ]);
    await target
      .send({
        embeds: [embed],
      })
      .catch(() => { 
        console.log(`User - ${target?.user?.username} (${target?.id}) has DMs disabled`); });
    await interaction.guild.bans
      .create(target.id)
      .catch(console.error);
    await interaction.reply({
      content: `${target.username} (${target.id}) has been banned succesfully`,
    });
  },
};

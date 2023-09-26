const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setDMPermission(false)
		.setName('unban')
		.setDescription('Unban a User')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('User to Unban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Reason For Unban')
                .setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        await interaction.reply(`${user.username} (${user.id}) Has Been Unbanned For: ${reason}`);
        await interaction.guild.members.unban(user);                                                                        []
    },
};
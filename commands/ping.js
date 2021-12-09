const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client, Intents } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with latency'),
	async execute(interaction) {

        const embed = new MessageEmbed()
            .setTitle('Latency')
            .setDescription(`Bot's latency: \`${Date.now() - interaction.createdTimestamp}\`ms`)

		await interaction.reply({ embeds: [embed] });
	},
};
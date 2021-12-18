const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const moment = require("moment");
require("moment-duration-format");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Replies with uptime and latency'),
	async execute(interaction) {

		const duration = moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        const embed = new MessageEmbed()
			.addFields(
				{ name: 'Uptime', value: duration, inline: false },
				{ name: 'Latency', value: `\`${interaction.client.ws.ping}\`ms`, inline: false }
			)

		await interaction.reply({ embeds: [embed] });
	},
};
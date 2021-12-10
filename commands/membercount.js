const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Get the member count of the server'),
    async execute(interaction) {

        const embed = new MessageEmbed()
            .setTitle('Member Count')
            .setDescription(`${interaction.guild.memberCount} members`)
    
        await interaction.reply({ embeds: [embed] });
    }
}
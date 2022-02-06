const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create an embed')
        .setDefaultPermission(false)

        .addStringOption(option => option.setName('title')
            .setDescription('Title for the embed')
            .setRequired(true))

        .addStringOption(option => option.setName('description')
            .setDescription('Description for the embed')
            .setRequired(true)),

    async execute(interaction) {

        const title = interaction.options.get('title');
        const description = interaction.options.get('description');

        var newDescription = description.value.replace('{n}', '\n');

        const embed = new MessageEmbed()
            .setTitle(title.value)
            .setDescription(newDescription)
        
        interaction.reply({ content: 'Embed sent!', ephemeral: true });
        interaction.channel.send({ embeds: [embed] });

    }
}
    
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('request')
        .setDescription('Create a new request')

        .addStringOption(option => option
            .setName('title')
            .setDescription('The title of the request')
            .setRequired(true)
        )

        .addStringOption(option => option
            .setName('description')
            .setDescription('The description of the request')
            .setRequired(true)
        )

        .addIntegerOption(option => option
            .setName('budget')
            .setDescription('The budget of the request')
            .setRequired(true)
        ),

    async execute(interaction) {

        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const budget = interaction.options.getInteger('budget');

        var channel = interaction.guild.channels.cache.find(channel => channel.id === '918964155040530582');

        const embed = new MessageEmbed()

            .setDescription(
                `**Title:** ${title}
                **Status:** Available`
            )

            .setColor('#35db80')
            .setAuthor(interaction.user.tag, interaction.user.avatarURL())
            .setThumbnail(interaction.user.avatarURL()) 
            .setFooter('To create a new request, use the /request command')

            .addFields(
                { name: 'Description', value: description },
                { name: 'Budget', value: "$" + budget, inline: true },
                { name: 'Submitted by', value: `${interaction.user}`, inline: true },
            )

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('complete')
                    .setLabel('Complete')
                    .setStyle('SECONDARY'),

                new MessageButton()
                    .setCustomId('delete')
                    .setLabel('Delete')
                    .setStyle('DANGER')
            )
        
        await channel.send({ content: `New request by ${interaction.user}`, embeds: [embed], components: [row] });
        await interaction.reply({ content: 'Request created and sent in <#918964155040530582>' });

    }

}
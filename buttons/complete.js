const { MessageActionRow, MessageEmbed, MessageButton } = require('discord.js')

module.exports = {
	name: 'complete',
	async execute(interaction) {

        authorId = interaction.message.content.slice(17,-1)

        if (authorId == interaction.user.id) {

            const embed = new MessageEmbed()
                .setDescription(interaction.message.embeds[0].description)

                .setColor('#f6b93b')
                .setAuthor(interaction.user.tag, interaction.user.avatarURL())
                .setThumbnail(interaction.user.avatarURL()) 
                .setFooter('To create a new request, use the /request command')
                
                .addFields(
                    { name: 'Description', value: interaction.message.embeds[0].fields[0].value },
                    { name: 'Budget', value: interaction.message.embeds[0].fields[1].value, inline: true },
                    { name: 'Submitted by', value: `${interaction.message.embeds[0].fields[2].value}`, inline: true },
                )

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('complete')
                        .setLabel('Complete')
                        .setStyle('SECONDARY')
                        .setDisabled(true),

                    new MessageButton()
                        .setCustomId('delete')
                        .setLabel('Delete')
                        .setStyle('DANGER')
                )
                
            await interaction.message.edit({ content: `New request by ${interaction.user}`, embeds: [embed], components: [row] })
            await interaction.reply({ content: "Marked your request as complete", ephemeral: true })

        } else { return await interaction.reply({ content: "That is not your request", ephemeral: true }) }
    }
};
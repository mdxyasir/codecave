const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

module.exports = {
    name: 'complete',
    async execute(interaction) {

        user = interaction.message.embeds[0].footer.text;

        if (user == interaction.user.id) {

            const embed = new EmbedBuilder()
                .setDescription(interaction.message.embeds[0].description)
                .setColor(0xF6B93B)
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                .setThumbnail(interaction.user.avatarURL())
                .setFooter({ text: `${interaction.user.id}` })

                .addFields(
                    { name: '**Description**', value: interaction.message.embeds[0].fields[0].value },
                    { name: '**Budget**', value: interaction.message.embeds[0].fields[1].value, inline: true },
                    { name: '**Submitted by**', value: `${interaction.message.embeds[0].fields[2].value}`, inline: true },
                    { name: '**Status**', value: "Completed", inline: true },
                );

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('complete')
                        .setLabel('Complete')
                        .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
                    
                    new ButtonBuilder()
                        .setCustomId('delete')
                        .setLabel('Delete')
                        .setStyle(ButtonStyle.Danger)
                );

            await interaction.message.edit({ content: `Completed request・${interaction.user}`, embeds: [embed], components: [row] });
            await interaction.reply({ content: "Request marked as complete", ephemeral: true });

        } else { return await interaction.reply({ content: "This request is not yours.", ephemeral: true }); }

    }
};
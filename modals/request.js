const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

module.exports = {
	name: 'request',
	async execute(interaction) {

        var title = await interaction.fields.getTextInputValue('title');
        var description = await interaction.fields.getTextInputValue('description');
        var budget = await interaction.fields.getTextInputValue('budget');

        budget = budget.replace('$', '');
        budget = budget.replace('£', '');
        budget = budget.replace('€', '');
        budget = parseInt(budget);

        if (isNaN(budget)) {
            return await interaction.reply({ content: 'Budget must be a number', ephemeral: true });
        }

        if (budget < 10) {
            return await interaction.reply({ content: 'Budget must have a minimum value of 10 USD', ephemeral: true });
        }

        var channel = interaction.guild.channels.cache.find(channel => channel.id === "1036248151121739877");

        const embed = new EmbedBuilder()
            .setDescription(`**Title:** ${title}`)
            .setColor(0x2f3135)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: `${interaction.user.id}` })

            .addFields(
                { name: '**Description**', value: description },
                { name: '**Budget**', value: "$" + budget, inline: true },
                { name: '**Submitted by**', value: `${interaction.user}`, inline: true },
                { name: '**Status**', value: "Available", inline: true },
            );

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('complete')
                    .setLabel('Complete')
                    .setStyle(ButtonStyle.Secondary),

                 new ButtonBuilder()
                    .setCustomId('delete')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Danger)
            );
        
        await channel.send({ content: `New request・${interaction.user}`, embeds: [embed], components: [row] });
        await interaction.reply({ content: `Request created and sent in <#1036248151121739877>` });

    }
};
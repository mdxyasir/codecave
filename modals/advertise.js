const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

module.exports = {
	name: 'advertise',
	async execute(interaction) {

        var title = await interaction.fields.getTextInputValue('title');
        var description = await interaction.fields.getTextInputValue('description');
        var price = await interaction.fields.getTextInputValue('price');
        var maxPrice = await interaction.fields.getTextInputValue('max') ?? false;
        
        price = price.replace('$', '').replace('£', '').replace('€', '');
        price = parseInt(price);

        if (maxPrice){

            maxPrice = maxPrice.replace('$', '').replace('£', '').replace('€', '');
            maxPrice = parseInt(maxPrice);

            if (isNaN(maxPrice)) {
                return await interaction.reply({ content: 'Maximum price must be a number', ephemeral: true });
            }

            if (price > maxPrice) {
                return await interaction.reply({ content: 'Maximum price must be larger than the minimum price', ephemeral: true });
            }

        }

        if (isNaN(price)) {
            return await interaction.reply({ content: 'Minimum price must be a number', ephemeral: true });
        }

        var channel = interaction.guild.channels.cache.find(channel => channel.id === "1055210714798751775");

        const embed = new EmbedBuilder()
            .setDescription(`**Title:** ${title}`)
            .setColor(0x2f3135)
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: `${interaction.user.id}` })

            .addFields(
                { name: '**Description**', value: description },
                { name: '**Price**', value: ((maxPrice) ? ( "$" + price + "-" + maxPrice ) : ( "$" + price )), inline: true },
                { name: '**Submitted by**', value: `${interaction.user}`, inline: true },
            );

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('bump')
                    .setLabel('Bump')
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId('delete')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Danger)
            );
        
        await channel.send({ content: `New service ad・${interaction.user}`, embeds: [embed], components: [row] });
        await interaction.reply({ content: `Ad created and sent in <#1055210714798751775>` });

    }
};
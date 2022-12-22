const { SlashCommandBuilder, TextInputBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { ModalBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('advertise')
		.setDescription('Create a new ad'),
	async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('advertise')
            .setTitle('New Service Ad');

        const titleInput = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Title')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const descriptionInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Description')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const priceInput = new TextInputBuilder()
            .setCustomId('price')
            .setLabel('Minimum Price・USD')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const maxPriceInput = new TextInputBuilder()
            .setCustomId('max')
            .setLabel('Maximum Price・USD')
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const titleRow = new ActionRowBuilder().addComponents(titleInput);
        const descriptionRow = new ActionRowBuilder().addComponents(descriptionInput);
        const priceRow = new ActionRowBuilder().addComponents(priceInput);
        const maxPriceRow = new ActionRowBuilder().addComponents(maxPriceInput);

        modal.addComponents(titleRow, descriptionRow, priceRow, maxPriceRow);

        await interaction.showModal(modal);

	}
};
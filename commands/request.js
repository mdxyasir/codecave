const { SlashCommandBuilder, TextInputBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { ModalBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('request')
		.setDescription('Create a new request'),
	async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId('request')
            .setTitle('New Request');

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

        const budgetInput = new TextInputBuilder()
            .setCustomId('budget')
            .setLabel('Budget・USD')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const titleRow = new ActionRowBuilder().addComponents(titleInput);
        const descriptionRow = new ActionRowBuilder().addComponents(descriptionInput);
        const budgetRow = new ActionRowBuilder().addComponents(budgetInput);

        modal.addComponents(titleRow, descriptionRow, budgetRow);

        await interaction.showModal(modal);

	}
};
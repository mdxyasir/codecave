const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);
    
            if (!command) return;
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        } else if (interaction.isButton()) {

            if (interaction.customId.endsWith('.role')) { var customId = 'role' } else { var customId = interaction.customId }

            const button = interaction.client.buttons.get(customId);

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        } else if (interaction.isSelectMenu()) {

            if (interaction.customId.endsWith('.role')) { var customId = 'role' } else { var customId = interaction.customId }

            const menu = interaction.client.menus.get(customId);

            try {
                await menu.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }
            
        } else if (interaction.isModalSubmit()) {

            const modal = client.modals.get(interaction.customId);

            try {
                await modal.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        }
    }
}
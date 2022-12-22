const { Events, Collection } = require('discord.js');

const moment = require('moment');
require('moment-duration-format');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);
            const id = interaction.user.id;
    
            if (!command) return;

            const cooldowns = interaction.client.commandCooldowns;

            if (!cooldowns.has(command.data.name)) { 
                cooldowns.set(command.data.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const cooldownAmount = (command.cooldown || 0) * 1000;

            if (timestamps.has(id)) {
                const expirationTime = timestamps.get(id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = moment.duration(expirationTime - now).format('D [days], H [hrs], m [mins], s [secs]');
                    return await interaction.reply({ content: `Wait ${timeLeft} before using the \`${command.data.name}\` command.`, ephemeral: true });
                }
            }

            timestamps.set(id, now);
            setTimeout(() => timestamps.delete(id), cooldownAmount);
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        } else if (interaction.isButton()) {

            if (interaction.customId.endsWith('.role')) { var customId = 'role' } else { var customId = interaction.customId }

            const button = interaction.client.buttons.get(customId);
            const id = interaction.user.id;

            if (!button) return;

            const cooldowns = interaction.client.buttonCooldowns;

            if (!cooldowns.has(button.name)) { 
                cooldowns.set(button.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(button.name);
            const cooldownAmount = (button.cooldown || 0) * 1000;

            if (timestamps.has(id)) {
                const expirationTime = timestamps.get(id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = moment.duration(expirationTime - now).format('D [days], H [hrs], m [mins], s [secs]');
                    return await interaction.reply({ content: `Wait ${timeLeft} before using the \`${button.name}\` button.`, ephemeral: true });
                }
            }

            timestamps.set(id, now);
            setTimeout(() => timestamps.delete(id), cooldownAmount);

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        } else if (interaction.isSelectMenu()) {

            if (interaction.customId.endsWith('.role')) { var customId = 'role' } else { var customId = interaction.customId }

            const menu = interaction.client.menus.get(customId);

            if (!menu) return;

            try {
                await menu.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }
            
        } else if (interaction.isModalSubmit()) {

            const modal = interaction.client.modals.get(interaction.customId);

            if (!modal) return;

            try {
                await modal.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        }
    }
}
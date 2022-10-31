const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();

const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const buttonsPath = path.join(__dirname, '../buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

const menusPath = path.join(__dirname, '../menus');
const menuFiles = fs.readdirSync(menusPath).filter(file => file.endsWith('.js'));

const modalsPath = path.join(__dirname, '../modals');
const modalFiles = fs.readdirSync(modalsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
    const filePath = path.join(buttonsPath, file);
    const button = require(filePath);

    client.buttons.set(button.name, button);
}

for (const file of menuFiles) {
    const filePath = path.join(menusPath, file);
    const menu = require(filePath);

    client.menus.set(menu.name, menu);
}

for (const file of modalFiles) {
    const filePath = path.join(modalsPath, file);
    const modal = require(filePath);

    client.modals.set(modal.name, modal);
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);
    
            if (!command) return;
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        } else if (interaction.isButton()) {

            if (interaction.customId.endsWith('.role')) { var customId = 'role' } else { var customId = interaction.customId }

            const button = client.buttons.get(customId);

            try {
                await button.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error. Please report this to staff.', ephemeral: true });
            }

        } else if (interaction.isSelectMenu()) {

            if (interaction.customId.endsWith('.role')) { var customId = 'role' } else { var customId = interaction.customId }

            const menu = client.menus.get(customId);

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
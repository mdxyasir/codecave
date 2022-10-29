const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.buttons = new Collection();

const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const buttonsPath = path.join(__dirname, '../buttons');
const buttonFiles = fs.readdirSync(buttonsPath).filter(file => file.endsWith('.js'));

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

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);
    
            if (!command) return;
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

        } else if (interaction.isButton()) {

            const button = client.buttons.get(interaction.customId);
            await button.execute(interaction);

        }
    }
}
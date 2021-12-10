const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
client.buttons = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
	const button = require(`../buttons/${file}`);
	client.buttons.set(button.name, button);
}

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {

        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);
    
            if (!command) return;

            if (command.role) {
                if (!interaction.member.roles.cache.some(role => role.name === command.role)) {
                    return interaction.reply({ content: "You need the " + command.role + " role to use this command", ephemeral: true })
                }
            }
    
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

        } else if (interaction.isButton()) {
            
            const button = client.buttons.get(interaction.customId)
            await button.execute(interaction);

        }
    }
}
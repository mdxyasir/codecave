const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
const menuFiles = fs.readdirSync('./menus').filter(file => file.endsWith('.js'));

const staffFiles = fs.readdirSync(`./commands/staff`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of staffFiles) {
	const command = require(`../commands/staff/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
	const button = require(`../buttons/${file}`);
	client.buttons.set(button.name, button);
}

for (const file of menuFiles) {
	const menu = require(`../menus/${file}`);
	client.menus.set(menu.name, menu);
}

module.exports = {
    name: "interactionCreate",
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
            
            const button = client.buttons.get(interaction.customId)
            await button.execute(interaction);

        } else if (interaction.isSelectMenu()) {

            const menu = client.menus.get(interaction.customId)
            await menu.execute(interaction);

        }
    }
}
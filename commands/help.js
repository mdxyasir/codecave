const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, CommandInteraction } = require('discord.js');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file !== 'help.js');

const commandList = []
const staffCommandList = []

for (const file of commandFiles) {
    const command = require(`./${file}`);

    if (command.role == "Staff") { continue }

    const commandData = {
        name: command.data.name[0].toUpperCase() + command.data.name.substring(1),
        description: command.data.description
    }
    
    commandList.push(commandData);

}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help menu'),
	async execute(interaction) {
        
        const embed = new MessageEmbed()
            .setTitle('Code Cave Help Menu')

        for (const cmd of commandList) {
            embed.addField(cmd.name, cmd.description);
        }

        await interaction.reply({ embeds: [embed] });
            
	},
};
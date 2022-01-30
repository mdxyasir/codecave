const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, CommandInteraction } = require('discord.js');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file !== 'help.js');
const staffFiles = fs.readdirSync('./commands/staff').filter(file => file.endsWith('.js'));

const commandList = []
const staffList = []

for (const file of commandFiles) {
    const command = require(`./${file}`);

    const commandData = {
        name: "/" + command.data.name,
        description: command.data.description
    }
    
    commandList.push(commandData);
}

for (const file of staffFiles) {
    const command = require(`./staff/${file}`);

    const commandData = {
        name: "/" + command.data.name,
        description: command.data.description
    }
    
    staffList.push(commandData);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help menu')

        .addSubcommand(subcommand =>
            subcommand
                .setName('commands')
                .setDescription('Regular help menu'))

        .addSubcommand(subcommand =>
            subcommand
                .setName('staff')
                .setDescription('Staff help menu')),

	async execute(interaction) {

        if (interaction.options.getSubcommand() === 'staff') {

            const embed = new MessageEmbed()
                .setTitle('Staff Help Menu')

            for (const cmd of staffList) {
                embed.addField(cmd.name, cmd.description);
            }

            await interaction.reply({ embeds: [embed] });
        
        } else {
        
            const embed = new MessageEmbed()
                .setTitle('Code Cave Help Menu')

            for (const cmd of commandList) {
                embed.addField(cmd.name, cmd.description);
            }

            await interaction.reply({ embeds: [embed] });

        }   
	},
};
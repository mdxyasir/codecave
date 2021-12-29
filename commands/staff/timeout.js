const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const parse = require('parse-duration').default
const prettyMs = require("pretty-ms");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Puts a member in timeout')
        .setDefaultPermission(false)

        .addUserOption(option => option.setName('member')
            .setDescription('The user to place in timeout')
            .setRequired(true)
        )

        .addStringOption(option => option.setName('time')
            .setDescription('The time to put the user in timeout')
            .setRequired(true)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('member');
        var time = interaction.options.get('time');
        const member = await interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);

        if (!member.moderatable) { return interaction.reply({ content: 'I cannot timeout this member', ephemeral: true }) }
        
        var time = ms(time.value)

        if (time < ms("1m") || time > ms("28d")) {
            return await interaction.reply({ content: 'Please enter a time between 1 minute and 28 days', ephemeral: true });
        }

        await member.timeout(time);

        const embed = new MessageEmbed()
            .setTitle('Member Timeout')
            .setDescription(`**${member.user}** has been put in timeout for ${prettyMs(time, { verbose: true })}`)
        
        await interaction.reply({ embeds: [embed] });
    }
}
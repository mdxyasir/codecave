const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('(Staff) Kicks a user from the server')
        .setDefaultPermission(false)

        .addUserOption(option => option.setName('member')
            .setDescription('The user to kick')
            .setRequired(true)
        )
        
        .addStringOption(option => option.setName('reason')
            .setDescription('The reason for kicking the user')
            .setRequired(false)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('member');
        const reason = interaction.options.get('reason');
        const member = await interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);

        if (!member.kickable) { return interaction.reply({ content: 'I cannot kick this member', ephemeral: true }) }
        
        try {
            await user.send({ content: `You have been kicked from ${interaction.guild.name} for the following reason: ${reason}` });
        } catch (error) { }

        const embed = new MessageEmbed()
            .setTitle('Member Kicked')
            .setDescription(`**${member.user.tag}** has been kicked from the server`)

        await interaction.reply({ embeds: [embed] });

        member.kick({  reason: reason });
    
    }
}
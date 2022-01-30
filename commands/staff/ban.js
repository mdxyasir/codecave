const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server')
        .setDefaultPermission(false)
        
        .addUserOption(option => option.setName('member')
            .setDescription('The user to ban')
            .setRequired(true)
        )
        
        .addStringOption(option => option.setName('reason')
            .setDescription('The reason for banning the user')
            .setRequired(false)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('member');
        const reason = interaction.options.get('reason') || 'No reason provided';
        const member = await interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);

        if (!member.bannable) { return interaction.reply({ content: 'I cannot ban this member', ephemeral: true }) }
        
        try {
            await user.send({ content: `You have been banned from ${interaction.guild.name} for the following reason: ${reason}` });
        } catch (error) { }

        const embed = new MessageEmbed()
            .setTitle('Member Banned')
            .setDescription(`**${member.user.tag}** has been banned from the server`)

        await interaction.reply({ embeds: [embed] });

        member.ban({ reason: reason });
    
    }
}
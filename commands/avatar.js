const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of a user')

        .addUserOption(option => option.setName('member')
            .setDescription('The user to get the avatar of')
            .setRequired(true)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('member');
        const member = await interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);

        const embed = new MessageEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setImage(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
            .setFooter({ text: `ID: ${member.user.id}`})

        await interaction.reply({ embeds: [embed] });
    
    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get information about a user')

        .addUserOption(option => option.setName('member')
            .setDescription('The user to get information about')
            .setRequired(true)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('member');
        const member = await interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var roles = member.roles.cache.map(role => `<@&${role.id}>`);
        roles.splice(-1, 1)

        const embed = new MessageEmbed()
            .setTitle(`${member.user.tag}'s Info`)
            .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true }))
            .setFooter({ text: `ID: ${member.user.id}`})
            .addFields(
                { name: 'Joined', value: days[member.joinedAt.getDay()] + ", " + months[member.joinedAt.getMonth()] + " " + member.joinedAt.getDate() + ", " + member.joinedAt.getFullYear(), inline: true },
                { name: 'Registered', value: days[member.user.createdAt.getDay()] + ", " + months[member.user.createdAt.getMonth()] + " " + member.user.createdAt.getDate() + ", " + member.user.createdAt.getFullYear(), inline: true },
                { name: `Roles [${roles.length}]`, value: `${roles.join(', ')}`, inline: false },  
                { name: 'Avatar URL', value: `[Click Here](${member.user.displayAvatarURL({ format: 'png', dynamic: true })})`, inline: true }
            )

        await interaction.reply({ embeds: [embed] });
    
    }
}
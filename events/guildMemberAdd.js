const { MessageEmbed } = require('discord.js');
const { updateMembers } = require("../functions/updateMembers");

module.exports = {
    name: 'guildMemberAdd',
    execute(member) {

        // Welcome Message
        var channel = member.guild.channels.cache.get('918244467499229275');

        const embed = new MessageEmbed()
            .setColor('#35db80')
            .setAuthor("Code Cave", member.guild.iconURL())
            .setDescription(`Welcome to Code Cave, **${member.user.username}#${member.user.discriminator}**`)

        channel.send({
            embeds: [embed]
        })

        // Update Member Count
        updateMembers(member.guild)

    }
}
const { MessageEmbed } = require('discord.js');
const { updateMembers } = require("../functions/updateMembers")

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        
        // Leave Message
        var channel = member.guild.channels.cache.get('918244467499229275');

        const embed = new MessageEmbed()
            .setColor('#db4335')
            .setAuthor({ name: "Code Cave", iconURL: member.guild.iconURL() })
            .setDescription(`**${member.user.username}#${member.user.discriminator}** has left the server`)

        channel.send({
            embeds: [embed]
        })

        // Update Member Count
        updateMembers(member.guild)
    
    }
}
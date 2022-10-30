const { EmbedBuilder } = require("@discordjs/builders");
const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {

        var channel = await member.guild.channels.cache.get('1036248150626799629');
        
        const embed = new EmbedBuilder()
            .setColor(0xDB4335)
            .setAuthor({ name: 'Code Cave', iconURL: member.guild.iconURL() })
            .setDescription(`${member.user} has left the server`)
        
        await channel.send({ embeds: [embed] })

    }
}
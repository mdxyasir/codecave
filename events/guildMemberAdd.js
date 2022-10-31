const { EmbedBuilder } = require("@discordjs/builders");
const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {

        var channel = await member.guild.channels.cache.get('1036248150626799629');
        
        const embed = new EmbedBuilder()
            .setColor(0x35db80)
            .setAuthor({ name: 'Code Cave', iconURL: member.guild.iconURL() })
            .setDescription(`${member} has joined the server`)
        
        await channel.send({ content: `${member}`, embeds: [embed] })

    }
}
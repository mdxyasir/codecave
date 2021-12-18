const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("members")
        .setDescription("(Staff) View the members of a role")

        .addStringOption(option => option.setName('role')
            .setDescription('The role to view')
            .setRequired(true)
        ),

    role: 'Staff',
    async execute(interaction) {
            
            const roleName = interaction.options.getString('role');
            const role = await interaction.guild.roles.cache.find(role => role.name === roleName) || await interaction.guild.roles.fetch(roleName);
    
            const embed = new MessageEmbed()
                .setTitle(`Members of ${role.name}`)
                .setDescription(`${role.members.map(member => `${member.user.tag}`).join('\n')}`)
    
            await interaction.reply({ embeds: [embed] });
    
        }
}
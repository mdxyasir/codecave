module.exports = {
	name: 'verify',
	async execute(interaction) {

        var role = await interaction.member.guild.roles.cache.find(role => role.id === "899396418366754846");
        await interaction.member.roles.add(role)
    
        await interaction.reply({ content: 'You have been verified!', ephemeral: true });

    }
};
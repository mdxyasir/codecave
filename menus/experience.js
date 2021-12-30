module.exports = {
	name: 'experience',
	async execute(interaction) {

        const roles = [
            '925873727101607986', // Beginner
            '925873700262268959', // Intermediate
            '925873687394156584', // Advanced
            '925873642095652886', // Expert
        ]

        for (id of roles) { 

            var role = await interaction.member.guild.roles.cache.find(role => role.id === id);

            if (interaction.values.includes(id)) {
                await interaction.member.roles.add(role)
            } else {
                await interaction.member.roles.remove(role)
            }
        }

        await interaction.reply({ content: "Your roles have been updated.", ephemeral: true })

    }
};
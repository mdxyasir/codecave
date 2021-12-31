module.exports = {
	name: 'field',
	async execute(interaction) {

        const roles = [
            '925873434762809365', // Web Development
            '926227367511339118', // Bot Development
            '925873515910025276', // Game Development
            '925873549875494912', // Mobile App Development
            '925873580976246885', // Cyber Security
            '925873610885857350', // Data Science & AI
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
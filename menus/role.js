module.exports = {
    name: 'role',
    async execute(interaction) {

        const experienceRoles = [
            '1036248150081548300', // Beginner
            '1036248150081548301', // Intermediate
            '1036248150081548302', // Advanced
            '1036248150081548303', // Expert
        ]

        const fieldRoles = [
            '1036248150106718289', // Web Development
            '1036248150081548307', // Bot Development
            '1036248150106718290', // App Development
            '1036248150081548306', // Game Development
            '1036248150081548304', // Data Science & AI
        ]

        var target = interaction.customId.split(".")[0]
        if (target == 'experience') { var roles = experienceRoles } else { var roles = fieldRoles }

        for (id of roles) {

            var role = await interaction.member.guild.roles.cache.find(role => role.id === id);

            if (interaction.values.includes(id)) {
                await interaction.member.roles.add(role);
            } else {
                await interaction.member.roles.remove(role);
            }

        }

        await interaction.reply({ content: 'Your roles have been updated', ephemeral: true });

    }
}
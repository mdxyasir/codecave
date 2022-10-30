const { ActionRowBuilder, SelectMenuBuilder } = require("@discordjs/builders");

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
        if (target == 'experience') { var roles = experienceRoles; var max = 1 } else { var roles = fieldRoles; var max = 5; }

        var options = []

        for (var id of roles) {

            var role = await interaction.member.guild.roles.cache.find(role => role.id === id);

            if (interaction.member.roles.cache.has(role.id)) {

                options.push({
                    label: role.name,
                    value: role.id,
                    default: true
                })

            } else { options.push({ label: role.name, value: role.id }) }
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(`${target}.role`)
                    .setPlaceholder('Nothing selected')
                    .setMinValues(0)
                    .setMaxValues(max)
                    .addOptions(options)
            )
        
        await interaction.reply({ content: "Use the menu below to select your roles", components: [row], ephemeral: true })

    }
};
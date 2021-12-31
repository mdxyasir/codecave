const { MessageActionRow, MessageSelectMenu } = require('discord.js');

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

        var options = []

        for (var id of roles) {

            var role = await interaction.member.guild.roles.cache.find(role => role.id === id);

            if (interaction.member.roles.cache.has(role.id)) {

                options.push({
                    label: role.name,
                    value: role.id,
                    default: true,
                })
            } else {

                options.push({
                    label: role.name,
                    value: role.id,
                })
            }
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('field')
                    .setPlaceholder('Nothing selected')
                    .setMinValues(0)
                    .setMaxValues(5)
                    .addOptions(options)
            )

        await interaction.reply({ content: "Use the menu below to select your roles", components: [row], ephemeral: true })

    }
};
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'experience',
	async execute(interaction) {

        const roles = [
            '925873727101607986', // Beginner
            '925873700262268959', // Intermediate
            '925873687394156584', // Advanced
            '925873642095652886', // Expert
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
                    .setCustomId('experience')
                    .setPlaceholder('Nothing selected')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .addOptions(options)
            )

        await interaction.reply({ content: "Use the menu below to select your roles", components: [row], ephemeral: true })

    }
};
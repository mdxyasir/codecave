const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Purge a number of messages")

        .addIntegerOption(option => option.setName('number')
            .setDescription('The number of messages to purge')
            .setRequired(true)
        ),

    role: 'Staff',
    async execute(interaction) {
            
            const number = interaction.options.getInteger('number');
            const messages = await interaction.channel.messages.fetch({ limit: number });
    
            await interaction.channel.bulkDelete(messages);

            await interaction.reply({ content: `Purged ${number} messages`, ephemeral: true });
    
        }
}
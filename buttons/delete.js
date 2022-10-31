module.exports = {
    name: 'delete',
    async execute(interaction) {

        user = interaction.message.embeds[0].footer.text;

        if (user == interaction.user.id) {

            await interaction.message.delete();
            await interaction.reply({ content: "Deleted your request.", ephemeral: true });

        } else { return await interaction.reply({ content: "This request is not yours.", ephemeral: true }); }

    }
}
module.exports = {
    name: 'bump',
    cooldown: 86400,
    async execute(interaction) {

        user = interaction.message.embeds[0].footer.text;

        if (user == interaction.user.id) {

            await interaction.channel.send({ content: `New service ad・${interaction.user}`, embeds: interaction.message.embeds, components: interaction.message.components });
            await interaction.message.delete();
            await interaction.reply({ content: "Ad bumped", ephemeral: true });

        } else { return await interaction.reply({ content: "This ad is not yours.", ephemeral: true }); }

    }
};
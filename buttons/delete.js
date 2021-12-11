module.exports = {
	name: 'delete',
	async execute(interaction) {

        authorId = interaction.message.content.slice(17,-1)

        if (authorId == interaction.user.id) {

            await interaction.message.delete()
            await interaction.reply({ content: "Deleted your request.", ephemeral: true })

        } else { return await interaction.reply({ content: "This request is not yours.", ephemeral: true }) }
    }
};
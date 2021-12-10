const updateMembers = (guild) => {
	const channel = guild.channels.cache.get("899390696023265291")
	channel.setName(`Member Count: ${guild.memberCount.toLocaleString()}`)
}

module.exports = { updateMembers };
const bannedWords = require("../banned_words.json")

module.exports = {
    name: 'messageCreate',
    async execute(message) {

        // Banned Words
        for (word of bannedWords) {
            if (message.content.toLowerCase().includes(word)) {
                message.delete()
            }
        }

    }
}
const bannedWords = require("../banned_words.json")

module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {

        // Banned Words
        for (word of bannedWords) {
            if (newMessage.content.toLowerCase().includes(word)) {
                oldMessage.delete()
            }
        }

    }
}
const { useQueue } = require("discord-player")
const updateMessage = require("../functions/updateMessage")

async function shuffle(interaction) {
    const queue = useQueue(interaction.guildId);
    updateMessage(queue)
    if (queue.tracks.size == 0) {
        interaction.reply({
            content: "Nothing in queue to shuffle",
            ephemeral: true
        })
        return
    }

    queue.tracks.shuffle();
    interaction.reply({
        content: "Shuffled queue in a unique way"
    })
}

module.exports = shuffle
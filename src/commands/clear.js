const { useQueue } = require("discord-player")
const updateMessage = require("../functions/updateMessage")

async function clear(interaction) {
    const queue = useQueue(interaction.guildId)
    queue.clear()
    // updateMess

    interaction.reply("**Queue cleared**")
}

module.exports = clear
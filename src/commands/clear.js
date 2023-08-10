const { useQueue } = require("discord-player")
const verifyQueue = require("../functions/verifyQueue")
const updateMessage = require("../functions/updateMessage")

async function clear(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    const queue = useQueue(interaction.guildId)
    queue.clear()
    if (!queue.metadata.nowPlayingMessage) return
    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[1].value = "Nothing up next, add some"
    currentMessageEmbed.fields[4].value = "0"

    updateMessage(queue, currentMessageEmbed)

    interaction.reply("**Queue cleared**")
}

module.exports = clear
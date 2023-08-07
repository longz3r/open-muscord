const { useQueue } = require("discord-player")
const updateMessage = require("../functions/updateMessage")

async function pause(interaction) {
    const queue = useQueue(interaction.guildId);
    if (queue.node.isPaused()) {
        let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
        currentMessageEmbed.title = `Now playing`
        currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> resume the track`
        updateMessage(queue, currentMessageEmbed)

        queue.node.setPaused(false)
    } else {
        let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
        currentMessageEmbed.title = `Paused`
        currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> paused the track`
        updateMessage(queue, currentMessageEmbed)

        queue.node.setPaused(true)
    }
    interaction.deferUpdate()
}

module.exports = pause
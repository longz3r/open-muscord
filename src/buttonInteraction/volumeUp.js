const { useQueue } = require("discord-player")
const updateMessage = require("../functions/updateMessage")

async function volumeUp(interaction) {
    const queue = useQueue(interaction.guildId);
    queue.node.setVolume(queue.node.volume + 10)

    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[5].value = queue.node.volume + "%"
    currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> increased volume`
    updateMessage(queue, currentMessageEmbed)

    interaction.deferUpdate()
}

module.exports = volumeUp
const updateMessage = require("../../functions/updateMessage")

function audioTrackAdd(queue, track) {
    if (!queue.metadata.nowPlayingMessage) return
    try {
        let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
        currentMessageEmbed.fields[1].value = `\`\`${queue.tracks.at(0).raw.durationFormatted}\`\` ${queue.tracks.at(0).raw.title}`
        currentMessageEmbed.fields[4].value = queue.tracks.size

        updateMessage(queue, currentMessageEmbed)
    } catch (e) {
        
    }
}

module.exports = audioTrackAdd
function audioTrackRemove(queue, track) {
    if (!queue.metadata.nowPlayingMessage) return
    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[1].value = "\u200b"
    currentMessageEmbed.fields[4].value = queue.tracks.size

    updateMessage(queue, currentMessageEmbed)
}

module.exports = audioTrackRemove
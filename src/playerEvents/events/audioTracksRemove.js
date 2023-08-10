function audioTracksRemove(queue, tracks) {
    if (!queue.metadata.nowPlayingMessage) return
    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[1].value = "\u200b"
    currentMessageEmbed.fields[4].value = queue.tracks.size
    queue.metadata.channel.send(`**${tracks.length}** tracks were removed from queue`)

    updateMessage(queue, currentMessageEmbed)
}

module.exports = audioTracksRemove
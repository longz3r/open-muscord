async function updateMessage(queue, newEmbed, newActionRow) {
    // console.log(newEmbed)
    if (!newEmbed) newEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    newEmbed.fields[0].name = queue.node.createProgressBar()
    try {
        queue.metadata.nowPlayingMessage.edit({
            embeds: [newEmbed]
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = updateMessage
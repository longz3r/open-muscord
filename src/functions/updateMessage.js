async function updateMessage(queue, newEmbed, newComponents) {
    // console.log(newEmbed)
    if (!newEmbed) newEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    if (!newComponents) newComponents = queue.metadata.nowPlayingMessage.components
    newEmbed.fields[0].name = queue.node.createProgressBar()
    try {
        queue.metadata.nowPlayingMessage.edit({
            embeds: [newEmbed],
            components: newComponents
        })
    } catch (error) {

    }
}

module.exports = updateMessage
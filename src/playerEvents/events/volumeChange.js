const updateMessage = require("../../functions/updateMessage")

function volumeChange(queue, oldVolume, newVolume) {
    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[5].value = newVolume + "%"

    console.log(oldVolume, newVolume)
    if (newVolume < oldVolume) {
        currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> decreased volume`
    } else if (newVolume > oldVolume) {
        currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> increased volume`
    }
    
    updateMessage(queue, currentMessageEmbed)
}

module.exports = volumeChange
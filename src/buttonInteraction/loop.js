const { useQueue } = require("discord-player")
const updateMessage = require("../functions/updateMessage")
const translateLoopMode = require("../functions/translateLoopMode")

async function loop(interaction) {
    const queue = useQueue(interaction.guild.id)
    let currentMode = queue.repeatMode
    if (currentMode < 3) currentMode += 1
    else currentMode = 0

    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[3].value = translateLoopMode[currentMode]
    currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> set loop mode to ${translateLoopMode[currentMode]}`
    updateMessage(queue, currentMessageEmbed)
    
    interaction.deferUpdate()
    queue.setRepeatMode(currentMode)
}

module.exports = loop
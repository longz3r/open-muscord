const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")
const translateLoopMode = require("../functions/translateLoopMode")
const updateMessage = require("../functions/updateMessage")

async function loop(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    const queue = useQueue(interaction.guild.id)
    let currentMode = queue.repeatMode
    let userSelectedMode = interaction.options.getString("mode")
    if (!userSelectedMode) {
        if (currentMode < 3) currentMode += 1
        else currentMode = 0
    } else {
        currentMode = parseInt(userSelectedMode)
    }

    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[3].value = translateLoopMode[currentMode]
    currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> set loop mode to ${translateLoopMode[currentMode]}`
    updateMessage(queue, currentMessageEmbed)

    interaction.reply(`Current loop mode set to **${translateLoopMode[currentMode]}**`)
    queue.setRepeatMode(currentMode)
}

module.exports = loop
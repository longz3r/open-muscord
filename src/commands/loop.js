const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

const translateMode = {
    0: "off",
    1: "current song",
    2: "queue",
    3: "autoplay (suggesting song and add it to queue)"
}

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

    interaction.reply(`Current loop mode set to **${translateMode[currentMode]}**`)
    queue.setRepeatMode(currentMode)
}

module.exports = loop
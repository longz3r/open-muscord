const { useQueue } = require("discord-player");

const translateMode = {
    0: "off",
    1: "current song",
    2: "queue",
    3: "autoplay (suggesting song and add it to queue)"
}

async function loop(interaction) {
    const queue = await useQueue(interaction.guild.id);
    if (queue == null) {
        interaction.reply("No voice connection was found")
    } else {
        let currentMode = queue.repeatMode
        if (currentMode < 3) currentMode += 1
        else currentMode = 0
        interaction.reply(`Current loop mode set to **${translateMode[currentMode]}**`)
        queue.setRepeatMode(currentMode)
    }
}

module.exports = loop
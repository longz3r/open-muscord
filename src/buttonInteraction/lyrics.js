const { useQueue } = require("discord-player")
const getLyrics = require("../functions/getLyrics")

async function queue(interaction) {
    const queue = useQueue(interaction.guildId)
    const lyrics = await getLyrics(queue.currentTrack.raw.title)
    if (!lyrics) interaction.reply(`We can't find any lyrics for **${queue.currentTrack.raw.title}**`)
    else interaction.reply(lyrics)
}

module.exports = queue
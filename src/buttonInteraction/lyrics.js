const { useQueue } = require("discord-player")
const getLyrics = require("../functions/getLyrics")

async function queue(interaction) {
    const queue = useQueue(interaction.guildId)
    interaction.deferUpdate()
    const lyrics = await getLyrics(queue.currentTrack.author, queue.currentTrack.raw.title)
    // interaction.deferUpdate()
    // if (!lyrics) interaction.reply(`We can't find any lyrics for **${queue.currentTrack.raw.title}**`)
    // else interaction.reply(lyrics)
}

module.exports = queue
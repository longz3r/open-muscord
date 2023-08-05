const { useQueue } = require("discord-player")

async function verifyQueue(guildId) {
    const queue = await useQueue(guildId)
    if (!queue) return false
    return true
}

module.exports = verifyQueue
const { getVoiceConnection } = require("@discordjs/voice")

async function getVCConnection(guildId) {
    return getVoiceConnection(guildId)
}

module.exports = getVCConnection
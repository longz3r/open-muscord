const { useQueue } = require("discord-player")

async function verifyCMDconditions(interaction) {
    let returnStatements = {
        status: true,
        message: ""
    }

    const allowedCMDwithoutVC = [
        "join",
        "stop"
    ]

    // console.log(await getVoiceConnection(interaction.guildId))

    if (allowedCMDwithoutVC.includes(interaction.commandName)) {
        // return returnStatements
    } else if (!interaction.member.voice.channelId) {
        returnStatements.status = false
        returnStatements.message = `You need to be in a voice channel to use **/${interaction.commandName}**`
    } else {
        const guildQueue = await useQueue(interaction.guildId)
        if (!guildQueue || !guildQueue.channel) return returnStatements
        else if (guildQueue.channel.id != interaction.member.voice.channelId) {
            returnStatements.status = false
            returnStatements.message = `You need to be in the same voice channel with me to use **/${interaction.commandName}**\nJoin <#${guildQueue.channel.id}>`
        } else if (interaction.member.voice.channel.guildId != interaction.guildId) {
            returnStatements.status = false
            returnStatements.message = `You need to be in the same server you ran **/${interaction.commandName}`
        }
    }

    return returnStatements
}

module.exports = verifyCMDconditions
const { useQueue } = require("discord-player")
const localDatabase = require("../handler/localDatabase")

async function verifyCMDconditions(interaction) {
    let returnStatements = {
        status: true,
        message: ""
    }

    const allowedCMDwithoutVC = [
        "join",
        // "stop"
    ]

    const allowedStringSelectMenuWithoutVC = [
        "pageSelect"
    ]

    if (interaction.isCommand()) {
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
            }
        }
    } else if (interaction.isButton()) {
        if (!interaction.member.voice.channelId) {
            returnStatements.status = false
            returnStatements.message = `You need to be in a voice channel to use **${interaction.customId}** button`
        } else {
            const guildQueue = await useQueue(interaction.guildId)
            if (!guildQueue || !guildQueue.channel) return returnStatements
            else if (guildQueue.channel.id != interaction.member.voice.channelId) {
                returnStatements.status = false
                returnStatements.message = `You need to be in the same voice channel with me to use **${interaction.customId}** button\nJoin <#${guildQueue.channel.id}>`
            }
        }
    } else if(interaction.isStringSelectMenu()) {
        let messageId
        if (!interaction.message.interaction) {
            messageId = interaction.message.id
        } else {
            console.log("NIGGA")
            messageId = interaction.message.reference.messageId
        }

        const interactionInfo = localDatabase.interaction.get(messageId)
        if (!interactionInfo) {
            returnStatements.status = false
            returnStatements.message = "Unknown interaction"
        } else if (interaction.user.id != interactionInfo.owner) {
            returnStatements.status = false
            returnStatements.message = "This is not your interaction"
        } else if (allowedStringSelectMenuWithoutVC.includes(interaction.customId)) {
            returnStatements.status = true
        } 
        else if (!interaction.member.voice.channelId) {
            returnStatements.status = false
            returnStatements.message = `You need to be in a voice channel to use **${interaction.customId}** menu`
        } else {
            const guildQueue = await useQueue(interaction.guildId)
            if (!guildQueue || !guildQueue.channel) return returnStatements
            else if (guildQueue.channel.id != interaction.member.voice.channelId) {
                returnStatements.status = false
                returnStatements.message = `You need to be in the same voice channel with me to use **${interaction.customId}** menu\nJoin <#${guildQueue.channel.id}>`
            }
        }
    }

    return returnStatements
}

module.exports = verifyCMDconditions
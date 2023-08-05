// const command = require("./../commands/")

const { useMainPlayer } = require("discord-player")
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice")

const join = require("../commands/join")
const play = require("../commands/play")
const stop = require("../commands/stop")
const pause = require("../commands/pause")
const queue = require("../commands/queue")
const resume = require("../commands/resume")
const loop = require("../commands/loop")
const shuffle = require("../commands/shuffle")
const volume = require("../commands/volume")
const reset = require("../commands/reset")
const skip = require("../commands/skip")

const verifyCMDconditions = require("../functions/verifyCMDconditions")

async function messageInteractionHandler(interaction) {
    // console.log((await getVoiceConnection(interaction.guildId)).joinConfig.channelId)

    const CMDconditions = await verifyCMDconditions(interaction)
    // console.log(queue.connection)

    if (CMDconditions.status) {
        console.log(`${interaction.user.tag} executed ${interaction.commandName}`)
        command = eval(interaction.commandName)
        command(interaction)
    } else {
        interaction.reply(CMDconditions.message)
        console.log(`${interaction.user.tag} failed to execute ${interaction.commandName}: ${CMDconditions.message}`)
    }
}

module.exports = messageInteractionHandler
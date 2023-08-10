// const command = require("./../commands/")

const logger = require("./logHandler")

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
const clear = require("../commands/clear")

const verifyCMDconditions = require("../functions/verifyCMDconditions")

async function messageInteractionHandler(interaction) {
    // console.log((await getVoiceConnection(interaction.guildId)).joinConfig.channelId)

    const CMDconditions = await verifyCMDconditions(interaction)
    // console.log(queue.connection)

    if (CMDconditions.status) {
        logger.info(`${interaction.user.displayName} executed ${interaction.commandName} at ${interaction.guild.name}`)
        command = eval(interaction.commandName)
        command(interaction)
    } else {
        interaction.reply(CMDconditions.message)
        logger.warn(`${interaction.user.displayName} failed to execute ${interaction.commandName}: ${CMDconditions.message}`)
    }
}

module.exports = messageInteractionHandler
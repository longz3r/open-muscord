// const command = require("./../commands/")

const { useMainPlayer } = require("discord-player")

const join = require("../commands/join")
const play = require("../commands/play")
const stop = require("../commands/stop")
const pause = require("../commands/pause")
const queue = require("../commands/queue")
const resume = require("../commands/resume")
const loop = require("../commands/loop")
const shuffle = require("../commands/shuffle")
const volume = require("../commands/volume")


async function messageInteractionHandler(interaction) {
    const discordplayer = await useMainPlayer()
    console.log(await discordplayer.queues.create(interaction.guildId, {
        // nodeOptions are the options for guild node (aka your queue in simple word)
        metadata: interaction, // we can access this metadata object using queue.metadata later on
        leaveOnEmpty: false,
        leaveOnEnd: false,
        leaveOnStop: false
    }))
    // console.log(await discordplayer.voiceUtils.getConnection(interaction.guildId))
    console.log(`${interaction.user.tag} executed ${interaction.commandName}`)
    command = eval(interaction.commandName)
    command(interaction)
}

module.exports = messageInteractionHandler
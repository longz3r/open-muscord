const previous = require("../buttonInteraction/previous")
const pause = require("../buttonInteraction/pause")
const skip = require("../buttonInteraction/skip")
const volumeUp = require("../buttonInteraction/volumeUp")
const shuffle = require("../buttonInteraction/shuffle")
const loop = require("../buttonInteraction/loop")
const queue = require("../buttonInteraction/queue")
const volumeDown = require("../buttonInteraction/volumeDown")

const verifyCMDconditions = require("../functions/verifyCMDconditions")
const logger = require("../handler/logHandler")

function buttonCollector(guildQueue) {
    guildQueue.metadata.buttonCollector.on("collect", async (interaction) => {
        // interaction.reply({
        //     content: "you clicked IT",
        //     ephemeral: true
        // })

        const CMDconditions = await verifyCMDconditions(interaction)
        // console.log(queue.connection)

        if (CMDconditions.status) {
            logger.info(`${interaction.user.tag} clicked ${interaction.customId}`)
            command = eval(interaction.customId)
            command(interaction)
        } else {
            interaction.reply({
                content: CMDconditions.message,
                ephemeral: true
            })
            logger.warn(`${interaction.user.tag} failed to click ${interaction.customId}: ${CMDconditions.message}`)
        }
    })
}

module.exports = buttonCollector
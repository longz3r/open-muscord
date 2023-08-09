const displayQueue = require("../functions/displayQueue")
const localDatabase = require("../handler/localDatabase")
const splitArray = require("../utilities/splitArray")
const { useQueue } = require("discord-player")

async function pageSelect(interaction) {
    const queue = useQueue(interaction.guildId)
    const interactionInfo = localDatabase.interaction.get(interaction.message.interaction.id)

    const tracks = queue.tracks.toArray();
    const pages = splitArray(tracks, 10)
    const queueData = displayQueue(pages, parseInt(interaction.values[0]))
    interaction.deferUpdate()
    try {
        interactionInfo.interactionMessage.edit({
            embeds: [queueData.embed],
            components: queueData.rows
        })
    } catch (err) {

    }
    
    // interaction.reply(`You selected ${interaction.values}`)
}

module.exports = pageSelect
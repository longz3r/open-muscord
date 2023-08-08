const { useQueue } = require("discord-player")
const splitArray = require("../utilities/splitArray")
const localDatabase = require("../handler/localDatabase")
const displayQueue = require("../functions/displayQueue")

async function queue(interaction) {
    const queue = useQueue(interaction.guildId)
    if (queue.tracks.size != 0) {
        console.log("DEO HIEU SAO BI LOI")
        // const tracks = queue.tracks.toArray();
        // const pages = splitArray(tracks, 20)

        // const queueData = displayQueue(pages)

        // const interactionMessage = await interaction.
        // reply({
        //     embeds: [queueData.embed],
        //     components: queueData.rows,
        //     ephemeral: true
        // })

        // console.log(interactionMessage)
        
        // await localDatabase.interaction.set(interactionMessage.id, {
        //     interactionMessage: interactionMessage,
        //     owner: interaction.user.id,
        //     completed: false
        // })

        // setTimeout(() => {
        //     const interactionInfo = localDatabase.interaction.get(interactionMessage.id)
        //     if (!interactionInfo.completed) {
        //         try {
        //             interactionInfo.interactionMessage.edit({
        //                 content: "This command is expired",
        //                 embeds: [],
        //                 components: []
        //             })
        //         } catch (error) {

        //         } 
        //     }
        // }, queue.currentTrack.durationMS - queue.node.estimatedPlaybackTime)
    } else {
        interaction.reply({
            content: "Nothing in queue",
            ephemeral: true
        })
    }
}

module.exports = queue
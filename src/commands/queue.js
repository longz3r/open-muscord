const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")
const splitArray = require("../utilities/splitArray")

const displayQueue = require("../functions/displayQueue")
const localDatabase = require("../handler/localDatabase")

async function queue(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    const queue = useQueue(interaction.guildId);
    if (queue.tracks.size != 0) {
        const tracks = queue.tracks.toArray();
        const pages = splitArray(tracks, 20)

        const queueData = displayQueue(pages)

        const interactionMessage = await interaction.reply({
            embeds: [queueData.embed],
            components: queueData.rows
        })
        
        console.log(interactionMessage.id)
        localDatabase.interaction.set(interactionMessage.id, interaction.user.id)
    } else {
        interaction.reply("Nothing in queue")
    }
}

module.exports = queue
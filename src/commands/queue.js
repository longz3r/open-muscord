const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")
const splitArray = require("../utilities/splitArray")

const displayQueue = require("../functions/displayQueue")

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

        interaction.reply({
            embeds: [queueData.embed],
            components: queueData.rows
    })
    } else {
        interaction.reply("Nothing in queue")
    }
}

module.exports = queue
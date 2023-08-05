const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

async function queue(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    const queue = useQueue(interaction.guildId);
    if (queue != null) {
        const tracks = queue.tracks.toArray();
        const currentTrack = queue.currentTrack;
        let queueLength = tracks.length

        replyMessage = `Playing **${currentTrack}**\n**${tracks.length}** songs queued`
        if (tracks.length > 20) {
            queueLength = 20
        }
        for (i = 0; i < queueLength; i++) {
            replyMessage += `\n**${i + 1}.** ${tracks[i]}`
        }

        interaction.reply(replyMessage)
    } else {
        interaction.reply("Nothing in queue")
    }
    
}

module.exports = queue
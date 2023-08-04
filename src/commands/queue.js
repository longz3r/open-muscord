const { useQueue } = require("discord-player");

async function queue(interaction) {
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
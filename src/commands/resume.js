const { useQueue } = require("discord-player");

async function resume(interaction) {
    let replyMessage = ""
    const queue = useQueue(interaction.guildId);
    if (queue.node.isPaused()) {
        queue.node.setPaused(false)
        replyMessage = "Resuming"
    } else {
        replyMessage = "Playback wasn't pause"
    }
    interaction.reply(replyMessage)
}

module.exports = resume
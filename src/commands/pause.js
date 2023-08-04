const { useQueue } = require("discord-player");

async function pause(interaction) {
    let replyMessage = ""
    const queue = useQueue(interaction.guildId);
    if (queue.node.isPaused()) {
        queue.node.setPaused(false)
        replyMessage = "Unpasuing"
    } else {
        queue.node.setPaused(true)
        replyMessage = "Paused"
    }
    interaction.reply(replyMessage)
}

module.exports = pause
const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

async function resume(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
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
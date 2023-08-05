const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

async function pause(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
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
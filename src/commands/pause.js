const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")
const updateMessage = require("../functions/updateMessage")

async function pause(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    let replyMessage = ""
    const queue = useQueue(interaction.guildId);
    if (queue.node.isPaused()) {
        let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
        currentMessageEmbed.title = `Now playing`
        currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> resumed the track`
        updateMessage(queue, currentMessageEmbed)

        queue.node.setPaused(false)
        replyMessage = "Resuming"
    } else {
        let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
        currentMessageEmbed.title = `Paused`
        currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> paused the track`
        updateMessage(queue, currentMessageEmbed)
        
        queue.node.setPaused(true)
        replyMessage = "Paused"
    }
    interaction.reply(replyMessage)
}

module.exports = pause
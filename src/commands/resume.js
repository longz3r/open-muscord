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
        try {
            let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0]
            currentMessageEmbed.data.title = "Now playing"
            currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> resumed the track`
            queue.metadata.nowPlayingMessage.edit({
                embeds: [currentMessageEmbed]
            })
        } catch (error) {
            console.error(error)
        } 
        queue.node.setPaused(false)
        replyMessage = "Resuming"
    } else {
        replyMessage = "Track wasn't pause"
    }
    interaction.reply(replyMessage)
}

module.exports = resume
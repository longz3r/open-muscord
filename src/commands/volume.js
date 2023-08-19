const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")
const updateMessage = require("../functions/updateMessage")

async function volume(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    let amount = interaction.options.getInteger("amount")
    const queue = useQueue(interaction.guildId);
    queue.node.setVolume(amount)

    let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
    currentMessageEmbed.fields[5].value = queue.node.volume + "%"
    currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> set volume to **${queue.node.volume}%**`
    updateMessage(queue, currentMessageEmbed)

    interaction.reply(`Volume set to **${queue.node.volume}%**`)
}

module.exports = volume
const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

async function volume(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    let amount = interaction.options.getInteger("amount")
    const queue = useQueue(interaction.guildId);
    queue.node.setVolume(amount)

    interaction.reply(`Volume set to **${queue.node.volume}%**`)
}

module.exports = volume
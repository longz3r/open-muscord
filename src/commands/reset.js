const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

async function reset(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    const queue = useQueue(interaction.guild.id);
    queue.node.seek(0)
    interaction.reply("**Resetting current song progress**")
}

module.exports = reset
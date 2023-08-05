const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

async function skip(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    const queue = await useQueue(interaction.guild.id);
    const currentTrack = queue.currentTrack;
    queue.node.skip()

    interaction.reply(`Skipped **${currentTrack}**`)
}

module.exports = skip
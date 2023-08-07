const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")

async function shuffle(interaction) {
    if (!await verifyQueue(interaction.guildId)) {
        interaction.reply("No connection was found in this server, create one by using **/play** or **/join**")
        return
    }
    if (queue.tracks.size == 0) {
        interaction.reply({
            content: "Nothing in queue to shuffle",
            ephemeral: true
        })
        return
    }
    const queue = useQueue(interaction.guildId);
    await queue.tracks.shuffle();
    interaction.reply("Shuffled queue in a unique way")
}

module.exports = shuffle
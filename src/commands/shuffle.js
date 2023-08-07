const { useQueue } = require("discord-player");
const verifyQueue = require("../functions/verifyQueue")
const updateMessage = require("../functions/updateMessage")

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
    if (queue.tracks.size > 1) {
        let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
        currentMessageEmbed.fields[1].value = `\`\`${queue.tracks.at(0).raw.durationFormatted}\`\` ${queue.tracks.at(0).raw.title}`
    }
    const queue = useQueue(interaction.guildId);
    await queue.tracks.shuffle();
    interaction.reply("Shuffled queue in a unique way")
}

module.exports = shuffle
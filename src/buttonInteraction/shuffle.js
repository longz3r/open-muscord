const { useQueue } = require("discord-player")
const updateMessage = require("../functions/updateMessage")

async function shuffle(interaction) {
    const queue = useQueue(interaction.guildId);
    updateMessage(queue)
    if (queue.tracks.size == 0) {
        interaction.reply({
            content: "Nothing in queue to shuffle",
            ephemeral: true
        })
        return
    }

    await queue.tracks.shuffle();
    if (queue.tracks.size > 1) {
        let currentMessageEmbed = queue.metadata.nowPlayingMessage.embeds[0].data
        currentMessageEmbed.fields[1].value = `\`\`${queue.tracks.at(0).raw.durationFormatted}\`\` ${queue.tracks.at(0).raw.title}`
        currentMessageEmbed.fields[2].value = `<@${interaction.user.id}> shuffled the queue`
        updateMessage(queue, currentMessageEmbed)
    }
    interaction.deferUpdate()
}

module.exports = shuffle
const { useQueue } = require("discord-player")
const localDatabase = require("../handler/localDatabase")

async function trackSelect(interaction) {
    const queue = useQueue(interaction.guildId)
    // console.log(queue)
    let result
    let track
    try {
        track = queue.tracks.at(parseInt(interaction.values[0]))
        result = queue.node.jump(track)
    } catch (error) {

    }
    interaction.deferUpdate()

    let interactionInfo = localDatabase.interaction.get(interaction.message.interaction.id)
    interactionInfo.completed = true
    localDatabase.interaction.set(interaction.message.id, interactionInfo)

    if (result) {
        try {
            interactionInfo.interactionMessage.edit({
                content: `**${interaction.user.tag}** jumped to **${track.title}**`,
                embeds: [],
                components: [],
            })
        } catch (error) {
            
        }
    } else {
        try {
            interactionInfo.interactionMessage.edit({
                content: "Failed to jump",
                embeds: [],
                components: []
            })
        } catch (error) {

        }
    }
}

module.exports = trackSelect
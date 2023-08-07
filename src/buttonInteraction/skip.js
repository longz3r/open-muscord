const { useQueue } = require("discord-player")

async function skip(interaction) {
    const queue = await useQueue(interaction.guild.id);
    const currentTrack = queue.currentTrack;
    queue.node.skip()

    queue.metadata.channel.send(`**${interaction.user.tag}** skipped **${currentTrack}**`)
}

module.exports = skip
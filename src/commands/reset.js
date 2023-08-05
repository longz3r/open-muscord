const { useQueue } = require("discord-player");

async function reset(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.seek(0)
    interaction.reply("**Resetting current song progress**")
}

module.exports = reset
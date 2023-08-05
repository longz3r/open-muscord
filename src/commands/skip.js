const { useQueue } = require("discord-player");

async function skip(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.skip()

    interaction.reply("**Skipped**")
}

module.exports = skip
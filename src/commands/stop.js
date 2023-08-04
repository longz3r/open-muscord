const { useQueue } = require("discord-player");

async function stop(interaction) {
    const queue = useQueue(interaction.guildId);
    queue.delete();

    interaction.reply("**STOPPED**")
}

module.exports = stop
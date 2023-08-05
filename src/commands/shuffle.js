const { useQueue } = require("discord-player");

async function shuffle(interaction) {
    const queue = useQueue(interaction.guildId);
    await queue.tracks.shuffle();
    interaction.reply("Shuffled queue in a unique way")
}

module.exports = shuffle
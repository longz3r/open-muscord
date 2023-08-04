const { useQueue } = require("discord-player");

async function volume(interaction) {
    let amount = interaction.options.getInteger("amount")
    const queue = useQueue(interaction.guildId);
    queue.node.setVolume(amount)

    interaction.reply(`Volume set to **${queue.node.volume}%**`)
}

module.exports = volume
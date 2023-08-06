const { useMainPlayer } = require("discord-player")

async function joinVCchannel(voiceChannel, interaction) {
    const discordplayer = await useMainPlayer()
    const guildQueue = await discordplayer.queues.create(interaction.guildId, {
        // nodeOptions are the options for guild node (aka your queue in simple word)
        metadata: {
            channel: interaction.channel
        }, // we can access this metadata object using queue.metadata later on
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 5000, 
        leaveOnEnd: false,
        leaveOnStop: true,
        pauseOnEmpty: true,
    })

    if (!guildQueue.channel) {
        await guildQueue.connect(voiceChannel)
        console.log("CONNECTED TO VC")
    } else {
        if (guildQueue.channel.id != voiceChannel) {
            await guildQueue.connect(voiceChannel)
            console.log("RECONNECTED TO DIFFERENT CHANNEL")
        }
    }
}

module.exports = joinVCchannel
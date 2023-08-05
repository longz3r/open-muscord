const { useMainPlayer } = require("discord-player")

async function joinVCchannel(voiceChannel, interaction) {
    const discordplayer = await useMainPlayer()
    const guildQueue = await discordplayer.queues.create(interaction.guildId, {
        // nodeOptions are the options for guild node (aka your queue in simple word)
        metadata: interaction.channel, // we can access this metadata object using queue.metadata later on
        leaveOnEmpty: false,
        leaveOnEnd: false,
        leaveOnStop: true
    })

    if (!guildQueue.channel) {
        await guildQueue.connect(voiceChannel)
        console.log("CONNECTED TO VC")
    } else {
        // if (guildQueue.channel.id != voiceChannel) {
        //     await guildQueue.connect(voiceChannel)
        //     console.log("RECONNECTED TO DIFFERENT CHANNEL")
        // }
    }

    // const connection = await joinVoiceChannel({
    //     channelId: channelId,
    //     guildId: guildId,
    //     adapterCreator: voiceAdapterCreator,
    // });

    // guildQueue.createDispatcher(connection);
}

module.exports = joinVCchannel
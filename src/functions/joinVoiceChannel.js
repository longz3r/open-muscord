const { useMainPlayer } = require("discord-player")
const { joinVoiceChannel } = require("@discordjs/voice")

async function joinVCchannel(channelId, guildId) {
    const discordplayer = await useMainPlayer()
    const guildQueue = await discordplayer.queues.create(guildId, {
        // nodeOptions are the options for guild node (aka your queue in simple word)
        metadata: guildId, // we can access this metadata object using queue.metadata later on
        leaveOnEmpty: false,
        leaveOnEnd: false,
        leaveOnStop: true
    })

    if (!guildQueue.channel) {
        await guildQueue.connect(channelId)
        console.log("CONNECTED TO VC")
    }

    // const connection = await joinVoiceChannel({
    //     channelId: channelId,
    //     guildId: guildId,
    //     adapterCreator: voiceAdapterCreator,
    // });

    // guildQueue.createDispatcher(connection);
}

module.exports = joinVCchannel
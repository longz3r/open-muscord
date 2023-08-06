const { useMainPlayer } = require("discord-player")
const embeds = require("../handler/embedsHandler")

async function eventsHandler() {
    const player = useMainPlayer()
    player.events.on('playerStart', (queue, track) => {
        queue.metadata.channel.send({
            embeds: [embeds.playerEmbed(track)]
        });
    });

    player.events.on('playerSkip', (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
        queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
    });

    // player.events.on('voiceStateUpdate', (queue, newState) => {
    //     console.log(newState.serverMute)
    // });

    player.events.on("emptyChannel", (queue) => {
        console.log("empty channel")
        queue.metadata.channel.send({
            embeds: [{
                color: 0x00ffff,
                author: {
                    name: 'Muscord',
                    icon_url: 'https://www.longcraft.xyz/muscord.png',
                },
                title: 'Paused track. I will leave in 15 minutes because I was left alone',
            }]
        });
    })

    player.events.on("channelPopulate", (queue) => {
        console.log("channel populate")
    })
}

module.exports = eventsHandler


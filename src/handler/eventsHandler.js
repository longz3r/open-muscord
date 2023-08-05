const { useMainPlayer } = require("discord-player")
const embeds = require("./embedsHandler")

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

    player.events.on('voiceStateUpdate', (queue, newState) => {
        console.log(newState.serverMute)
    });
}

module.exports = eventsHandler


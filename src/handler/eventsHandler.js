const { useMainPlayer } = require("discord-player")

async function eventsHandler() {
    const player = useMainPlayer()
    player.events.on('playerStart', (queue, track) => {
        // Emitted when the player starts to play a song
        queue.metadata.send(`Started playing: **${track.title}**`);
    });
}

module.exports = eventsHandler


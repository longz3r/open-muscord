const { useMainPlayer } = require("discord-player")
const { diff } = require("deep-diff")

const voiceStateUpdate = require("./events/voiceStateUpdate")
const playerStart = require("./events/playerStart")
const playerFinish = require("./events/playerFinish")

async function eventsHandler() {
    const player = useMainPlayer()
    player.events.on('playerStart', (queue, track) => playerStart(queue, track));
    player.events.on('playerFinish', (queue, track) => playerFinish(queue, track))

    player.events.on('playerSkip', (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
        queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
    });

    player.events.on("voiceStateUpdate", (queue, oldState, newState) => voiceStateUpdate(queue, diff(oldState, newState)))
}

module.exports = eventsHandler


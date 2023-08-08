const { useMainPlayer } = require("discord-player")

const voiceStateUpdate = require("./events/voiceStateUpdate")
const playerStart = require("./events/playerStart")
const playerFinish = require("./events/playerFinish")
const audioTrackAdd = require("./events/audioTrackAdd")
const audioTracksAdd = require("./events/audioTracksAdd")
// const volumeChange = require("./events/volumeChange")

async function eventsHandler() {
    const player = useMainPlayer()
    player.events.on('playerStart', (queue, track) => playerStart(queue, track));
    player.events.on('playerFinish', (queue, track) => playerFinish(queue, track))
    // player.events.on("volumeChange", (queue, oldVolume, newVolume) => volumeChange(queue, oldVolume, newVolume))
    player.events.on("emptyQueue", (queue) => queue.metadata.channel.send("**Queue completed!**"))
    player.events.on("audioTrackAdd", (queue, track) => audioTrackAdd(queue, track))
    player.events.on("audioTracksAdd", (queue, tracks) => audioTracksAdd(queue, tracks))

    player.events.on('playerSkip', (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
        queue.metadata.send(`Skipping **${track.title}** due to an issue!`);
    });

    player.events.on("voiceStateUpdate", (queue, oldState, newState) => voiceStateUpdate(queue, oldState, newState))

    
}

module.exports = eventsHandler


const { useMainPlayer } = require("discord-player")
const logger = require("../handler/logHandler")

const voiceStateUpdate = require("./events/voiceStateUpdate")
const playerStart = require("./events/playerStart")
const playerFinish = require("./events/playerFinish")
const audioTrackAdd = require("./events/audioTrackAdd")
const audioTracksAdd = require("./events/audioTracksAdd")
const emptyChannel = require("./events/emptyChannel")
const playerError = require("./events/playerError")
// const volumeChange = require("./events/volumeChange")

async function eventsHandler() {
    const player = useMainPlayer()
    player.events.on('playerStart', (queue, track) => playerStart(queue, track));
    player.events.on('playerFinish', (queue, track) => playerFinish(queue, track))
    // player.events.on("volumeChange", (queue, oldVolume, newVolume) => volumeChange(queue, oldVolume, newVolume))
    player.events.on("emptyQueue", (queue) => queue.metadata.channel.send("**Queue completed!**"))
    player.events.on("audioTrackAdd", (queue, track) => audioTrackAdd(queue, track))
    player.events.on("audioTracksAdd", (queue, tracks) => audioTracksAdd(queue, tracks))
    player.events.on("playerError", (queue, error, track) => playerError(queue, error, track))
    player.events.on("emptyChannel", (queue) => emptyChannel(queue))

    player.events.on('playerSkip', (queue, track) => {
        // Emitted when the audio player fails to load the stream for a song
        queue.metadata.channel.send(`Skipping **${track.title}** due to an issue!`);
    });

    player.events.on("voiceStateUpdate", (queue, oldState, newState) => voiceStateUpdate(queue, oldState, newState))
    player.lockVoiceStateHandler()
}

module.exports = eventsHandler


const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource, generateDependencyReport } = require("@discordjs/voice");

const ytdl = require("ytdl-core")
const getFirstYoutubeVideo = require("../functions/getFirstYTvideo")
const { join } = require('node:path');
const downloadAudio = require("../functions/downloadAudio.js")

async function playAudio(connection, resource) {
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    // const player = createAudioPlayer();

    
    // const resource = createAudioResource(stream);

    await player.play(resource);
    connection.subscribe(player);

    // Handle player state changes and errors
    player.on('error', error => {
        console.error('Error occurred while playing audio:', error);
    });

    // Clean up resources when playback ends
    player.on('stateChange', (oldState, newState) => {
        console.log(newState.status)
        // if (newState.status === 'idle') {
        //     player.stop();
        //     connection.destroy();
        // }
    });
}

async function play(interaction) {
    const query = interaction.options.getString("query");

    let connection = getVoiceConnection(interaction.guildId);
    let videoId
    let video
    if (query.startsWith("https://www.youtube.com/watch?v=")) {
        videoId = query
    } else {
        video = await getFirstYoutubeVideo(query)
        videoId = video.id
    }
    await downloadAudio(videoId, `./data/audios/${interaction.guildId}.mp3`)
    const relativePath = `../../data/audios/${interaction.guildId}.mp3`;
    const absolutePath = join(__dirname, relativePath);
    const resource = createAudioResource(absolutePath);
    
    if (connection === undefined) {
        const userChannelId = interaction.member.voice.channelId;

        if (userChannelId === null) {
            interaction.reply("You need to join a voice channel in order to use this command");
            return;
        }

        connection = await joinVoiceChannel({
            channelId: userChannelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        playAudio(connection, resource);
        interaction.reply(`Playing ${video.title}`);
    } else {
        playAudio(connection, resource);
        interaction.reply(`Playing ${video.title}`);
    }
}

module.exports = play;

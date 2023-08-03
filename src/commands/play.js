const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource, generateDependencyReport } = require("@discordjs/voice");

const temp = require('temp').track();
const getFirstYoutubeVideo = require("../functions/getFirstYTvideo")
const { join } = require('node:path');
const downloadAudio = require("../functions/downloadAudio.js")
const playdl = require("play-dl")

async function playAudio(connection, resource) {
    const player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    await player.play(resource);
    connection.subscribe(player);

    // Handle player state changes and errors
    player.on('error', error => {
        console.error('Error occurred while playing audio:', error);
    });

    // Clean up resources when playback ends
    player.on('stateChange', (oldState, newState) => {
        console.log(newState.status)
        if (newState.status === 'idle') {
            player.stop();
            
        }
    });
}

async function play(interaction) {
    // console.log(generateDependencyReport())
    const query = interaction.options.getString("query");

    let connection = getVoiceConnection(interaction.guildId);
    let videoId
    let video
    let videoTitle
    if (query.startsWith("https://www.youtube.com/watch?v=")) {
        const pattern = /\/watch\?v=([A-Za-z0-9_-]+)/;
        const match = query.match(pattern);
        videoId = match[1];
        videoTitle = "https://www.youtube.com/watch?v=" + videoId
    } else {
        video = await getFirstYoutubeVideo(query + "official")
        videoId = video.id
        videoTitle = video.title
    }

    interaction.reply(`Playing **${videoTitle}**`);

    
    // const relativePath = `../../data/audios/${videoId}.mp3`;
    // const absolutePath = join(__dirname, relativePath);
    // await downloadAudio(videoId, absolutePath)
    // const resource = createAudioResource(absolutePath);
    
    // const stream = await ytdl(videoId, {
    //     filter: "audioonly"
    // });
    let stream = await playdl.stream("https://www.youtube.com/watch?v=" + videoId)
    let resource = createAudioResource(stream.stream, {
        inputType: stream.type
    })


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
        
    } else {
        playAudio(connection, resource);
    }
}

module.exports = play;

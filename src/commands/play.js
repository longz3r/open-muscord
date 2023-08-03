const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, NoSubscriberBehavior, createAudioResource, generateDependencyReport } = require("@discordjs/voice");

const temp = require('temp').track();
const getFirstYoutubeVideo = require("../functions/getFirstYTvideo")
const { join } = require('node:path');
const downloadAudio = require("../functions/downloadAudio.js")
const ytdl = require("ytdl-core")

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
        videoId = query
        videoTitle = query
    } else {
        video = await getFirstYoutubeVideo(query + "official")
        videoId = video.id
        videoTitle = video.title
    }

    interaction.reply(`Playing ${videoTitle}`);

    // const tempFilePath = temp.path({ suffix: '.mp3', dir: './data/audios' });
    // var resource
    // try {
    //     await downloadAudio(videoId, tempFilePath);
    //     resource = await createAudioResource(tempFilePath);

    //     // Play the audio resource
    // } catch (error) {
    //     console.error('Error:', error.message);
    // }
    const stream = await ytdl(videoId, {
        filter: "audioonly"
    });
    const resource = createAudioResource(stream);


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

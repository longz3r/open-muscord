const { joinVoiceChannel, getVoiceConnection, createAudioResource, generateDependencyReport } = require("@discordjs/voice");
const { useMainPlayer } = require("discord-player")

async function play(interaction) {
    const discordplayer = await useMainPlayer()
    await interaction.deferReply();
    // console.log(generateDependencyReport())
    const query = interaction.options.getString("query");
    const userVoiceChannelId = interaction.member.voice.channelId

    try {
        const { track } = await discordplayer.play(userVoiceChannelId, query, {
            nodeOptions: {
                // nodeOptions are the options for guild node (aka your queue in simple word)
                metadata: interaction, // we can access this metadata object using queue.metadata later on
                leaveOnEmpty: false,
                leaveOnEnd: false,
                leaveOnStop: false
            },
            transitionMode: true
        });

        return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
        // let's return error if something failed
        return interaction.followUp(`Something went wrong: ${e}`);
    }
}

module.exports = play;

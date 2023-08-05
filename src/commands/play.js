const joinVoiceChannel = require("../functions/joinVoiceChannel")
const { useQueue } = require("discord-player")

async function play(interaction) {
    await interaction.deferReply();
    // console.log(generateDependencyReport())
    const query = interaction.options.getString("query");
    // const userVoiceChannelId = interaction.member.voice.channelId

    await joinVoiceChannel(interaction.member.voice.channel.id, interaction)
    const guildQueue = await useQueue(interaction.guildId)

    try {
        const { track } = await guildQueue.play(query)

        return interaction.followUp(`**${track.title}** was added to queue!`);
    } catch (e) {
        // let's return error if something failed
        return interaction.followUp(`Something went wrong: ${e}`);
    }
}

module.exports = play;

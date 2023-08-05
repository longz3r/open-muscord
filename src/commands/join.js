const joinVoiceChannel = require("../functions/joinVoiceChannel")

async function join(interaction) {
    const channel = interaction.options.getChannel("channel")
    const userChannelId = interaction.member.voice.channelId
    
    if (userChannelId == null && channel == undefined) {
        interaction.reply("You need to join or specify a channel for me to join")
    } else if (channel != undefined) {
        joinVoiceChannel(channel, interaction.guildId)
        interaction.reply(`Joined <#${channel.id}>`)
    } else if (channel == undefined) {
        joinVoiceChannel(userChannelId, interaction.guildId)
        interaction.reply(`Joined <#${userChannelId}>`)
    }
    
    // interaction.reply("ngu")
}

module.exports = join
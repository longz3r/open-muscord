const joinVoiceChannel = require("../functions/joinVoiceChannel")

async function join(interaction) {
    const channel = interaction.options.getChannel("channel")
    const userChannelId = interaction.member.voice.channelId
    
    if (userChannelId == null && channel == undefined) {
        interaction.reply("You need to join or specify a channel for me to join")
    } else if (channel != undefined) {
        joinVoiceChannel(channel, interaction)
        interaction.reply(`Joined <#${channel}>`)
    } else if (channel == undefined) {
        interaction.member.voice.channelId = 
        joinVoiceChannel(userChannelId, interaction)
        interaction.reply(`Joined <#${userChannelId}>`)
    }
    
    // interaction.reply("ngu")
}

module.exports = join
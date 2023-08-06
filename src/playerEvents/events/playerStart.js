const embeds = require("../../handler/embedsHandler")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

const previous = new ButtonBuilder()
	.setCustomId('previous')
	.setStyle(ButtonStyle.Primary)
    .setEmoji("⏮️")

const pause = new ButtonBuilder()
	.setCustomId('pause')
	.setStyle(ButtonStyle.Primary)
    .setEmoji("⏯️")

const skip = new ButtonBuilder()
	.setCustomId('skip')
	.setStyle(ButtonStyle.Primary)
    .setEmoji("⏭️")

const volumeUp = new ButtonBuilder()
	.setCustomId('volumeUp')
	.setStyle(ButtonStyle.Secondary)
    .setEmoji("🔊")

const shuffle = new ButtonBuilder()
	.setCustomId('shuffle')
	.setStyle(ButtonStyle.Primary)
    .setEmoji("🔀")

const loop = new ButtonBuilder()
	.setCustomId('loop')
	.setStyle(ButtonStyle.Primary)
    .setEmoji("🔁")

const queue = new ButtonBuilder()
	.setCustomId('queue')
	.setStyle(ButtonStyle.Primary)
    .setEmoji("🗒️")

const volumeDown = new ButtonBuilder()
	.setCustomId('volumeDown')
	.setStyle(ButtonStyle.Secondary)
    .setEmoji("🔉")
    // 🔀🔁🔂⏭️⏯️🔊🔉🗒️⏮️

const upperRow = new ActionRowBuilder()
    .addComponents(previous, pause, skip, volumeUp);

const bottomRow = new ActionRowBuilder()
    .addComponents(shuffle, loop, queue, volumeDown);

async function playerStart(queue, track) {
    const oldMessage = await queue.metadata.channel.send({
        embeds: [embeds.playerEmbed(track)],
        components: [upperRow, bottomRow],
    })
    let queueMetadata = queue.metadata
    try {
        queueMetadata.oldMessage.delete()
    } catch (e) {
        console.error(e)
    }
    Object.assign(queueMetadata, {oldMessage: oldMessage})
    queue.setMetadata(queueMetadata)
    
} 

module.exports = playerStart
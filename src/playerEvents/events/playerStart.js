const embeds = require("../../handler/embedsHandler")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

const previous = new ButtonBuilder()
	.setCustomId('previous')
	.setStyle(ButtonStyle.Secondary)
    .setDisabled(true)
    .setEmoji("⏮️")

const pause = new ButtonBuilder()
	.setCustomId('pause')
	.setStyle(ButtonStyle.Secondary)
    .setEmoji("⏸️")

const skip = new ButtonBuilder()
	.setCustomId('skip')
	.setStyle(ButtonStyle.Secondary)
    .setEmoji("⏭️")

const volumeUp = new ButtonBuilder()
	.setCustomId('volumeUp')
	.setStyle(ButtonStyle.Secondary)
    .setEmoji("🔊")

const shuffle = new ButtonBuilder()
	.setCustomId('shuffle')
	.setStyle(ButtonStyle.Secondary)
    .setEmoji("🔀")

const loop = new ButtonBuilder()
	.setCustomId('loop')
	.setStyle(ButtonStyle.Secondary)
    .setEmoji("🔁")

const queue = new ButtonBuilder()
	.setCustomId('queue')
    .setDisabled(true)
	.setStyle(ButtonStyle.Secondary)
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

const { InteractionCollector } = require("discord.js")
const client = require("../../index")
const buttonCollector = require("../../handler/buttonCollector")

async function playerStart(queue, track) {
    let nowPlayingMessage
    try {
        nowPlayingMessage = await queue.metadata.channel.send({
            embeds: [embeds.playerEmbed(track, queue)],
            components: [upperRow, bottomRow],
        })
    } catch (e) {
        console.error(e)
    }

    let queueMetadata = queue.metadata
    Object.assign(queueMetadata, {nowPlayingMessage: nowPlayingMessage})

    const collector = new InteractionCollector(client, {
        channel: queueMetadata.channel,
        componentType: 2,
        message: nowPlayingMessage,
    })

    Object.assign(queueMetadata, {buttonCollector: collector}) 
    await queue.setMetadata(queueMetadata)

    buttonCollector(queue)
} 

module.exports = playerStart
const translateLoopMode = require("../functions/translateLoopMode")

function playerEmbed(track, queue) {
    let nextTrack
    if (queue.tracks.size == 0) nextTrack = "Nothing up next, add some"
    else nextTrack = `\`\`${queue.tracks.at(0).raw.durationFormatted}\`\` ${queue.tracks.at(0).raw.title}`
    return {
        color: 0x00ffff,
        author: {
            name: 'Muscord',
            icon_url: 'https://www.longcraft.xyz/muscord.png',
        },
        title: 'Now playing',
        thumbnail: {
            url: track.thumbnail
        },
        description: `**${track.title}**`,
        fields: [
            {
                name: queue.node.createProgressBar(),
                value: `\u200b`
            },
            {
                name: "Next track",
                value: nextTrack
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Loop mode',
                value: translateLoopMode[queue.repeatMode],
                inline: true,
            },
            {
                name: 'Queue length',
                value: queue.tracks.size,
                inline: true,
            },
            {
                name: 'Volume',
                value: queue.node.volume + "%",
                inline: true,
            },
        ]
    };
}

module.exports = { playerEmbed }
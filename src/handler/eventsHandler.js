const { useMainPlayer } = require("discord-player")

async function eventsHandler() {
    const player = useMainPlayer()
    player.events.on('playerStart', (queue, track) => {
        // Emitted when the player starts to play a song
        const playerEmbed = {
            color: 0x00ffff,
            author: {
                name: 'Muscord',
                icon_url: 'https://www.longcraft.xyz/muscord.png',
            },
            title: 'Started playing',
            thumbnail: {
                url: track.thumbnail
            },
            description: `\`\`${track.duration}\`\` **${track.title}**`,
            // fields: [
            //     {
            //         name: 'Regular field title',
            //         value: 'Some value here',
            //     },
            //     {
            //         name: '\u200b',
            //         value: '\u200b',
            //         inline: false,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            // ]
        };
        queue.metadata.channel.send({ embeds: [playerEmbed]});
    });
}

module.exports = eventsHandler


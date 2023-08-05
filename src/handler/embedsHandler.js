function playerEmbed(track) {
    return {
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
}

module.exports = { playerEmbed }
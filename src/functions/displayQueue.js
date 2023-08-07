const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

function displayQueue(pages, currentPage) {
    if (!currentPage) currentPage = 1
    let pagesOptions = []
    let trackOptions = []
    let tracks = []

    const pageSelectMenu = new StringSelectMenuBuilder()
		.setCustomId('page')
		.setPlaceholder('Jump to a page')

    const trackSelectMenu = new StringSelectMenuBuilder()
		.setCustomId('track')
		.setPlaceholder('Choose a track track to jump')

    for (let i = 1; i <= pages.length; i++) {
        pagesOptions.push(new StringSelectMenuOptionBuilder()
            .setLabel("Page " + i)
            .setValue(i.toString())
        )

        if (i == currentPage) {
            pagesOptions[i - 1].setDefault(true)
        }
    }

    for (let i = 0; i < pages[currentPage - 1].length; i++) {
        tracks.push({
            value: `**${i + 1}. **` + pages[currentPage - 1][i].title,
            name: ""
        })
        trackOptions.push(new StringSelectMenuOptionBuilder()
            .setLabel(`${i + 1}. ` + pages[currentPage - 1][i].title)
            .setValue(i.toString())
        )
    }

    pageSelectMenu.options = pagesOptions
    trackSelectMenu.options = trackOptions

    const embed = {
        color: 0x00ffff,
        author: {
            name: 'Muscord',
            icon_url: 'https://www.longcraft.xyz/muscord.png',
        },
        title: 'Queue',
        description: `Page **${currentPage}/${pages.length}**`,
        fields: tracks
    };

    const pageRow = new ActionRowBuilder()
		.addComponents(pageSelectMenu)
    const trackRow = new ActionRowBuilder()
        .addComponents(trackSelectMenu)

    return {
        embed: embed,
        rows: [pageRow, trackRow]
    }
}

module.exports = displayQueue
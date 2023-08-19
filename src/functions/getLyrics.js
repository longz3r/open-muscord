const lyricsFinder = require("lyrics-finder")

async function getLyrics(artist, title) {
    console.log(artist)
    console.log(title)
    const lyrics = await lyricsFinder("the fat rat", "fly away")
    console.log(lyrics)
    if (!lyrics) return false

    // const trimmedLyrics = lyrics.lyrics.substring(0, 1997);

    // const embed = new EmbedBuilder()
    //     .setTitle(lyrics.title)
    //     .setURL(lyrics.url)
    //     .setThumbnail(lyrics.thumbnail)
    //     .setAuthor({
    //         name: lyrics.artist.name,
    //         iconURL: lyrics.artist.image,
    //         url: lyrics.artist.url
    //     })
    //     .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
    //     .setColor('Yellow');

    // return embed
}

module.exports = getLyrics

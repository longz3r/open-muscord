const YouTubeSearchAPI = require("youtube-search-api");

async function getFirstYTvideo(query) {
    try {
        let result = await YouTubeSearchAPI.GetListByKeyword(
            query,
            false,
            1,
            [{type:"video"}]
          );
        result = result.items[0]
        return result
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

module.exports = getFirstYTvideo
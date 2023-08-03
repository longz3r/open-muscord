const ytdl = require('ytdl-core');
const fs = require('fs');

async function downloadAudio(url, filePath) {
  try {
    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.filterFormats(info.formats, 'audioonly')[0];

    if (!audioFormat) {
      throw new Error('No audio format available');
    }

    const audioStream = ytdl.downloadFromInfo(info, {
      format: audioFormat,
    });

    const outputStream = fs.createWriteStream(filePath);
    audioStream.pipe(outputStream);

    outputStream.on('finish', () => {
      console.log('Download complete:', filePath);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

module.exports = downloadAudio
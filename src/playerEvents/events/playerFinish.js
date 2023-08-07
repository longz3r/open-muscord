function playerFinish(queue, track) {
    let queueMetadata = queue.metadata
    if (queue.tracks.size == 0) queue.metadata.channel.send("Completed the queue!")
    try {
        queueMetadata.buttonCollector.stop()
        queueMetadata.nowPlayingMessage.delete()
    } catch (error) {
        // console.error(error)
    }
}

module.exports = playerFinish
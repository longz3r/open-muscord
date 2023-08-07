function playerFinish(queue, track) {
    let queueMetadata = queue.metadata
    try {
        queueMetadata.buttonCollector.stop()
        queueMetadata.nowPlayingMessage.delete()
    } catch (error) {
        // console.error(error)
    }
}

module.exports = playerFinish
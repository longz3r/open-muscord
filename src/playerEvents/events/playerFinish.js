function playerFinish(queue, track) {
    let queueMetadata = queue.metadata
    try {
        queueMetadata.buttonCollector.stop()
        queueMetadata.nowPlayingMessage.delete()
        queueMetadata.nowPlayingMessage = undefined
    } catch (error) {
        // console.error(error)
    }
}

module.exports = playerFinish
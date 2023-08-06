async function serverMute(queue, newState) {
    if (!queue.node.isPaused() && newState) {
        queue.node.pause()
        queue.metadata.channel.send("Pausing track because I was server muted")
    } else if (queue.node.isPaused && !newState) {
        queue.node.resume()
    }
}

module.exports = serverMute
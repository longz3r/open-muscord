function playerError(queue, error, track) {
    try {
        queue.metadata.channel.send(error)
    } catch (err) {

    }
}

module.exports = playerError
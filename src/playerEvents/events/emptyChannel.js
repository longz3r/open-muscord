function emptyChannel(queue) {
    try {
        queue.metadata.channel.send("**I left the channel because I has been left alone for 30 minutes")
    } catch (error) {
        
    }
}

module.exports = emptyChannel
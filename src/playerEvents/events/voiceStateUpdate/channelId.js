function channelId(queue, newState) {
    if (!newState.channel) {
        queue.metadata.channel.send("**Paused track because I was left alone, I will leave this channel in 30 minutes**")
    }
}

module.exports = channelId
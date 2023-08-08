const logger = require("../../handler/logHandler")
const { diff } = require("deep-diff")

const serverMute = require("./voiceStateUpdate/serverMute")
const channelId = require("./voiceStateUpdate/channelId")

const listenningState = ["serverMute", "channelId"]

async function voiceStateUpdate(queue, oldState, newState) {
    // console.log(stateDiff)
    const stateDiff = diff(oldState, newState)
    for (const diff of stateDiff) {
        if (!listenningState.includes(diff.path[0])) continue
        // if (diff.lhs == null) continue

        logger.debug(diff)

        command = eval(diff.path[0])
        command(queue, diff.rhs)
    }
}

module.exports = voiceStateUpdate
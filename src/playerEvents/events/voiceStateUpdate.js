const logger = require("../../handler/logHandler")

const serverMute = require("./voiceStateUpdate/serverMute")

const listenningState = ["serverMute"]

async function voiceStateUpdate(queue, stateDiff) {
    for (const diff of stateDiff) {
        if (!listenningState.includes(diff.path[0])) continue
        if (diff.lhs == null) continue

        logger.debug(diff)

        command = eval(diff.path[0])
        command(queue, diff.rhs)
    }
}

module.exports = voiceStateUpdate
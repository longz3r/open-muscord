// const command = require("./../commands/")

const join = require("../commands/join")
const play = require("../commands/play")

async function messageInteractionHandler(interaction) {
    console.log(`${interaction.user.tag} executed ${interaction.commandName}`)
    command = eval(interaction.commandName)
    command(interaction)
}

module.exports = messageInteractionHandler
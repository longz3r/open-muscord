const localDatabase = require("./localDatabase")

async function selectMenuHandler(interaction) {
    console.log(interaction.message.interaction.id)
    console.log(localDatabase.interaction.get(interaction.message.interaction.id))
    interaction.deferUpdate()
}

module.exports = selectMenuHandler
const verifyCMDconditions = require("../functions/verifyCMDconditions")
const logger = require("./logHandler")

const trackSelect = require("../stringSelectMenu/trackSelect")
const pageSelect = require("../stringSelectMenu/pageSelect")

async function selectMenuHandler(interaction) {
    const CMDconditions = await verifyCMDconditions(interaction)

    if (CMDconditions.status) {
        logger.info(`${interaction.user.tag} selected ${interaction.values} in ${interaction.customId}`)
        command = eval(interaction.customId)
        command(interaction)
    } else {
        interaction.reply({
            content: CMDconditions.message,
            ephemeral: true
        })
        logger.warn(`${interaction.user.tag} failed to select ${interaction.values}: ${CMDconditions.message}`)
    }
}

module.exports = selectMenuHandler
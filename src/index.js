const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ partials: [Partials.Channel], intents: [
    GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.DirectMessages,
    // GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
] });

const config = require("../config.json")

console.time("Discord login")
client.login(config.token);

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`)
    console.timeEnd("Discord login")
    client.user.setActivity("music for you", { type: 1 });
    console.log("START UP SUCCESSFULLY")
})

const messageInteractionHandler = require("./handler/messageInteractionHandler.js")

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.isChatInputCommand()) {
            messageInteractionHandler(interaction)
        }
    }
    //  else if (interaction.isStringSelectMenu()) {
    //     selectMenuHandler(interaction)
    // }
})
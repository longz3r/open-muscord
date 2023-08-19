//discord.js init
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ partials: [Partials.Channel], intents: [
    GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
] });

const config = require("../config.json")

const { Player } = require("discord-player")
const { YoutubeExtractor, SpotifyExtractor, SoundCloudExtractor, BridgeProvider, BridgeSource } = require('@discord-player/extractor');

console.time("Discord login")

client.login(config.token);

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`)
    console.timeEnd("Discord login")
    client.user.setActivity("music for you", { type: 1 });
    console.log("START UP SUCCESSFULLY")

    console.time("Discord-player init")
    
    const discordplayer = new Player(client, {
        ytdlOptions: {
            requestOptions: {
                Headers: {
                    cookies: config.youtube_cookies
                }
            }
        }
    });

    const bridgeProvider = new BridgeProvider(BridgeSource.YouTube)

    await discordplayer.extractors.register(YoutubeExtractor, {});
    await discordplayer.extractors.register(SoundCloudExtractor, {})
    await discordplayer.extractors.register(SpotifyExtractor, {
        bridgeProvider
    })

    const eventsHandler = require("./playerEvents/eventsHandler")
    await eventsHandler()
    console.timeEnd("Discord-player init")
})

const messageInteractionHandler = require("./handler/messageInteractionHandler.js")
const selectMenuHandler = require("./handler/selectMenuHandler")

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.isChatInputCommand()) {
            messageInteractionHandler(interaction)
        }
    } else if (interaction.isStringSelectMenu()) {
        selectMenuHandler(interaction)
    }
})

module.exports = client
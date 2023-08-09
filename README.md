# Discord Music Bot with YouTube Support

This repository contains a Discord music bot built using discord.js v14 and discord-player, designed to bring back music functionality to your Discord server. The bot supports YouTube playback and offers a straightforward setup process.

`src` folder containing 45 files/41.848 bytes/1151 lines of code

## License

open-muscord is licensed under the MIT License

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [To-Do](#to-do)

## Installation

1. Clone the repository using the following command:
   
   ```shell
   git clone https://github.com/longz3r/open-muscord.git
   ```

2. Navigate to the repository's root folder:
   
   ```shell
   cd open-muscord
   ```

3. Install the required dependencies by running:
   
   ```shell
   npm install
   ```

4. Register the necessary Slash Commands with the Discord API by making a POST request. Replace `<client id>` with your Discord bot's client ID and `<discord bot token>` with your bot's token. You can make a POST request to the following URL with the specified headers:

   ```http
   POST https://discord.com/api/v10/applications/<client id>/commands
   Headers:
   - Authorization: Bot <discord bot token>
   Body:
   - every .json file in data/commands
   ```

5. Install FFmpeg on your computer or through npm using:
   
   ```shell
   npm install ffmpeg-static
   ```

6. Create a `config.json` file based on the provided `config_example.json`. Fill in the required details such as your bot token, API keys, and other configuration options.

7. Invite the bot with `https://discord.com/api/oauth2/authorize?client_id=<your client id>&permissions=35186556332368&scope=bot` and start using it by slash command

## Configuration

Before running the bot, you need to configure the `config.json` file. Open the file and provide the necessary values for each configuration option.

## Folder Structure

The repository is organized into the following main folders:

- `src`: Contains the source code for the Discord music bot. The `index.js` file is the entry point, and the `handler` folder manages various bot commands and events.
- `data`: Stores API requests that need to be made to the Discord API.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request, and I'll review your changes.

## To-Do

- [ ] Implement additional music sources (e.g., Spotify, SoundCloud).
- [ ] Auto making request to discord API on bot startup.
- [ ] Find a bug to fix it.
- [ ] Enhance documentation with usage examples and FAQs.

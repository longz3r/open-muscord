# Discord Music Bot with YouTube Support

This repository contains a Discord music bot built using discord.js v14 and discord-player, designed to bring back music functionality to your Discord server. The bot supports YouTube playback and offers a straightforward setup process.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [To-Do](#to-do)

## Installation

1. Clone the repository using the following command:
   
   ```shell
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the repository's root folder:
   
   ```shell
   cd your-repo
   ```

3. Install the required dependencies by running:
   
   ```shell
   npm install
   ```

4. Register the necessary Slash Commands with the Discord API by making a POST request. Refer to the [Discord API documentation](https://discord.com/developers/docs/interactions/slash-commands) for details on registering slash commands.

5. Install FFmpeg on your computer or through npm using:
   
   \\\\
   npm install ffmpeg-static
   \\\\

6. Create a `config.json` file based on the provided `config_example.json`. Fill in the required details such as your bot token, API keys, and other configuration options.

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
- [ ] Improve error handling and user feedback.
- [ ] Add a queue system for managing multiple music requests.
- [ ] Enhance documentation with usage examples and FAQs.

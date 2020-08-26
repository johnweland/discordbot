require('dotenv').config();
const path = require('path');
const fs = require('fs');

const { Client } = require('discord.js');

const client = new Client();
client.on('ready', () => {
    console.log(`${client.user.tag} is ${client.user.presence.status} in ${client.guilds.cache.size} server(s).`);
    const baseFile = 'command-base.js';
    const commandBase = require(`./commands/${baseFile}`);

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file));
                commandBase(client, option);
            }
        }
    }

    readCommands('commands');
});
client.login(process.env.DISCORD_BOT_TOKEN);

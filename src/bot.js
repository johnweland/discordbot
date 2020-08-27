require('dotenv').config();


const { Client } = require('discord.js');
const { clear } = require('console');
const loadCommands = require('./commands/load-commands');

const client = new Client();
client.on('ready', () => {
    clear();
    console.log(`${client.user.tag} is ${client.user.presence.status} in ${client.guilds.cache.size} server(s).`);
    loadCommands(client);
});
client.login(process.env.DISCORD_BOT_TOKEN);

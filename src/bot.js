require('dotenv').config();
const config = require('./config.json');
const command = require('./command');

const { Client } = require('discord.js');

const client = new Client();
client.on('ready', () => {
    console.log(`${client.user.tag} is ${client.user.presence.status} in ${client.guilds.cache.size} server.`);

    command(client, 'ping', message => {
        message.channel.send("Pong!");
    })
});
client.login(process.env.DISCORD_BOT_TOKEN);

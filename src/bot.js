require('dotenv').config();


const { Client } = require('discord.js');
const { clear } = require('console');
const mongo = require('./mongo');
const loadCommands = require('./commands/load-commands');
const levels = require('./levels');


const client = new Client();
client.on('ready', async () => {
    clear();
    console.log(`${client.user.tag} is ${client.user.presence.status} in ${client.guilds.cache.size} server(s).`);
    await mongo()
        .then(mongoose => {
            try {
                console.log("Connected to Mongo Atlas");
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(err => console.error(err));
    loadCommands(client);
    levels(client);
});
client.login(process.env.DISCORD_BOT_TOKEN);

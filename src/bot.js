require('dotenv').config();

require('module-alias/register');
const { Client } = require('discord.js');
const mongo = require('@utilities/mongo');
const loadCommands = require('@root/commands/load-commands');
const loadFeatures = require('@root/features/load-features');
const levels = require('@features/levels');


const client = new Client();
client.on('ready', async () => {
    console.log(`${client.user.tag} is ${client.user.presence.status} in ${client.guilds.cache.size} server(s).`);
    await mongo()
        .then(mongoose => {
            try {
                return console.log("Connected to Mongo Atlas");
            } catch (err) {
                throw new Error(err);
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(err => console.error(err));
    loadCommands(client);
    loadFeatures(client);
});
client.login(process.env.DISCORD_BOT_TOKEN);

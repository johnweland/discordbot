require('dotenv').config();
require('module-alias/register');
const path = require('path');
const { MongoClient } = require('mongodb');
const MongoDBProvider = require('commando-mongodb');
const mongo = require("@utilities/mongo");

const Commando = require('discord.js-commando');

const loadFeatures = require('@utilities/load-features');

const client = new Commando.CommandoClient({
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
});
client.setProvider(
    MongoClient.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(client => {
        return new MongoDBProvider(client, 'discordbot');
    }).catch(err => console.error(err))
);

client.on('ready', async () => {
    console.info(`${client.user.tag}, online`);

    await mongo();
    client.registry
        .registerGroups([
            ['economy', 'Server Economy'],
            ['xp', 'User Levels'],
            ['moderation', 'Server Moderation'],
            ['misc', 'Miscellaneous'],
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'commands'));

    loadFeatures(client);
});

client.login(process.env.DISCORD_TOKEN);

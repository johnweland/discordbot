require('module-alias/register');
const path = require('path');
const { MongoClient } = require('mongodb');
const MongoDBProvider = require('commando-mongodb');

const Commando = require('discord.js-commando');

const config = require('@root/config.json');
const loadFeatures = require('@utilities/load-features');

const client = new Commando.CommandoClient({
    owner: config.owner,
    prefix: config.prefix
});
client.setProvider(
    MongoClient.connect(config.mongo_uri, {
        useUnifiedTopology: true
    })
        .then(client => {
            return new MongoDBProvider(client, 'discordbot');
        })
        .catch(err => console.error(err))
);

client.on('ready', async () => {
    console.log(`${client.user.tag}, online`);
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

client.login(config.discord_token);

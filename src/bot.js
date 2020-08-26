require('dotenv').config();
const config = require('./config.json');
const command = require('./command');

const { Client } = require('discord.js');

const client = new Client();
client.on('ready', () => {
    console.log(`${client.user.tag} is ${client.user.presence.status} in ${client.guilds.cache.size} server(s).`);

    command(client, 'ping', message => {
        message.channel.send("Pong!");
    });

    command(client, ['servers', 'listservers'], message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members.`);
        });
    });

    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch()
            .then(results => {
                results = results.filter(result => !result.pinned);
                message.channel.bulkDelete(results);
            })
            .catch(err => console.error(err));
        } else {
            message.channel.send(`${message.member}, you do not have permission to execute this command.`);
        }
    })
});
client.login(process.env.DISCORD_BOT_TOKEN);

const Commando = require('discord.js-commando');

module.exports = class ClearCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            group: 'moderation',
            memberName: 'clear',
            description: 'Clears out messages from a channel, preserves pinned messages.',
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],
        });
    }

    async run(message) {
        message.channel.messages.fetch()
            .then(results => {
                results = results.filter(result => !result.pinned);
                message.channel.bulkDelete(results);
            })
            .catch(err => console.error(err));
    };
}
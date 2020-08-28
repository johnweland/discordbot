module.exports = {
    commands: ['clearchannel', 'cc'],
    description: "Clears a chat room of all messages except for pinned messages.",
    expectedArgs: '[all]',
    permissionError: 'you do not have permission to execute this command.',
    minArgs: 0,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        message.channel.messages.fetch()
            .then(results => {
                results = results.filter(result => !result.pinned);
                message.channel.bulkDelete(results);
            })
            .catch(err => console.error(err));
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: [],
}
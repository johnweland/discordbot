module.exports = {
    commands: ['clear-channel', 'cc'],
    expectedArgs: '<all>',
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
    permissions: [],
    requiredRoles: [],
}
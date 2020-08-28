const levels = require('@features/levels');

module.exports = {
    commands: ['level', 'lvl'],
    description: 'Checks the level of a user.',
    maxArgs: 1,
    expectedArgs: '[Target user\'s @]',
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const guildId = message.guild.id;
        const userId = target.id;

        const level = await levels.getLevel(guildId, userId);

        message.channel.send(`${target}, is ${level} level!`);    
    }
}
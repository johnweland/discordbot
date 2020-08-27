const economy = require('../../economy');

module.exports = {
    commands: ['balance', 'bal'],
    description: 'Checks the balance of a user.',
    maxArgs: 1,
    expectedArgs: '[Target user\'s @]',
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author;
        const guildId = message.guild.id;
        const userId = target.id;

        const coins = await economy.getCoins(guildId, userId);

        message.channel.send(`${target}, has ${coins} coins!`);
        
    }
}
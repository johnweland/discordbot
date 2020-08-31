const Commando = require('discord.js-commando');
const mongo = require('@utilities/mongo');
const economy = require('@features/economy');

module.exports = class GetBalanceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'balance',
            group: 'economy',
            memberName: 'balance',
            description: 'Returns a user\'s balance.',
        })
    }

    async run(message) {
        const target = message.mentions.users.first() || message.author;
        const guildId = message.guild.id;
        const userId = target.id;

        const coins = await economy.getCoins(guildId, userId);

        message.channel.send(`${target}, has ${coins} coins!`);
    };
}
const Commando = require('discord.js-commando');
const mongo = require('@utilities/mongo');
const economy = require('@features/economy');

module.exports = class AddBalanaceCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'addbalance',
            group: 'economy',
            memberName: 'addbalance',
            description: 'Add\'s a number of coins to a user\'s balance.',
            argsType: 'multiple'
        });
    }

    async run(message, args) {
        const target = message.mentions.users.first();
        if (!target) {
            message.reply('Please tag a user to add coins to.');
            return;
        }
        const amount = args[1];
        if (amount === 'max') {
            amount = 999;
        }
        if (amount > 999) {
            message.reply('To prevent money over-inflation, a cap of 999 coins has been implemented');
            return;
        }
        if (!amount || isNaN(amount)) {
            message.reply('You must specify an amount.');
            return;
        }

        const guildId = message.guild.id;
        const userId = target.id;

        const coins = await economy.addCoins(guildId, userId, amount);

        message.channel.send(`You've given ${target} ${amount} coin(s). They now have a balance of ${coins} coins!`);
    };
}
const Commando = require('discord.js-commando');
const mongo = require('@utilities/mongo');
const economy = require('@features/economy');

module.exports = class PayCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'pay',
            group: 'economy',
            memberName: 'pay',
            description: 'Add\'s a number of coins to a user\'s balance.',
            argsType: 'multiple'
        });
    }

    async run(message, args) {
        const { guild, member } = message;
        const target = message.mentions.users.first();
        if (!target) {
            message.reply('Please tag a user to pay coins to.');
            return;
        }
        const amount = args[1];
        if (!amount || isNaN(amount) || amount < 0) {
            message.reply('You must specify an amount.');
            return;
        }

        const balance = await economy.getCoins(guild.id, member.id);

        if (balance < amount) {
            message.reply(`You do not have a balance of ${amount} coins to give.`);
            return;
        }

        const payerBalance = await economy.addCoins(
            guild.id,
            member.id,
            amount * -1
        );
        
        const targetBalance = await economy.addCoins(
            guild.id,
            target.id,
            amount
        )

        message.reply(`You have given ${target} ${amount} coins! They now have ${targetBalance} coins and you have ${payerBalance} coins.`);
    };
}
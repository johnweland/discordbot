const economy = require('../../economy');

module.exports = {
    commands: ['pay'],
    description: 'Transfers X coins from the command user to a target user.',
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: '<user> <amount>',
    callback: async (message, arguments) => {
        const { guild, member } = message;
        const target = message.mentions.users.first();
        if (!target) {
            message.reply('Please tag a user to pay coins to.');
            return;
        }
        const amount = arguments[1];
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
        
    }
}
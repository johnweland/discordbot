const Commando = require('discord.js-commando');
const dailyRewardsSchema = require('@schemas/daily-rewards-schema');

let claimedCache = [];

const clearCache = () => {
    claimedCache = [];
    setTimeout(clearCache, 1000 * 60 * 10);
}
clearCache();

const alreadyClaimed = 'You have already claimed your daily rewards';

module.exports = class DailyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'daily',
            group: 'economy',
            memberName: 'daily',
            description: '_Coming Soon_ Claims daily rewards',
        });
    }

    async run(message) {
        const { guild, member } = message
        const { id } = member

        if (claimedCache.includes(id)) {
            message.reply(alreadyClaimed);
            return;
        }

        const obj = {
            guildId: guild.id,
            userId: id,
        }

        const results = await dailyRewardsSchema.findOne(obj);

        if (results) {
            const then = new Date(results.updatedAt).getTime();
            const now = new Date().getTime();

            const diffTime = Math.abs(now - then);
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays <= 1) {
                claimedCache.push(id);

                message.reply(alreadyClaimed);
                return;
            }
        }

        await dailyRewardsSchema.findOneAndUpdate(obj, obj, {
            upsert: true,
        })

        claimedCache.push(id);

        // TODO: Give the rewards
        message.reply('You have claimed your daily rewards!');
    };
}
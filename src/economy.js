const mongo = require('./mongo');
const profileSchema = require('./schemas/profile-schema');

const coinsCache = {};

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {
    return await mongo()
        .then(async mongoose => {
            try {
                const result = await profileSchema.findOneAndUpdate({
                    _id: userId,
                    guildId
                }, 
                {
                    _id: userId,
                    guildId,
                    $inc: {
                        coins
                    }
                },
                {
                    upsert: true,
                    new: true
                });
                coinsCache[`${guildId}-${userId}`] = result.coins;
                return result.coins;
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(err => console.error(err))
}


module.exports.getCoins = async (guildId, userId) => {
    const cachedValue = coinsCache[`${guildId}-${userId}`];
    if (cachedValue) {
        return cachedValue;
    }
    return await mongo()
        .then(async mongoose => {
            try {
                const result = await profileSchema.findOne({
                    _id: userId,
                    guildId
                });
                let coins = 0;
                if (result) {
                    coins = result.coins;
                } else {
                    await new profileSchema({
                        _id: userId,
                        guildId,
                        coins
                    }).save();
                }
                coinsCache[`${guildId}-${userId}`] = coins;
                return coins;
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(err => console.error(err));
}
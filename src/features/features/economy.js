const mongo = require('@utilities/mongo');
const profileSchema = require('@schemas/profile-schema');

const coinsCache = {};

module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {
    return await mongo()
        .then(async mongoose => {
            try {
                const result = await profileSchema.findOneAndUpdate({
                    userId,
                    guildId
                }, 
                {
                    userId,
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
            } catch (err) {
                throw new Error(err);
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
    return await mongo().then(async mongoose => {
        try {
            const result = await profileSchema.findOne({
                userId,
                guildId
            });
            let coins = 0;
            if (result) {
                coins = result.coins;
            } else {
                await new profileSchema({
                    userId,
                    guildId,
                    coins
                }).save();
            }
            coinsCache[`${guildId}-${userId}`] = coins;
            return coins;
        } catch (err) {
            throw new Error(err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error(err));
}
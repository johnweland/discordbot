const mongo = require('./mongo');
const profileSchema = require('./schemas/profile-schema');

module.exports = (client) => {
    client.on('message', message => {
        const { guild, member } = message;
        addXP(guild.id, member.id, 20, message);
    });
}
const getNeededXP = level => level * level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
    await mongo()
        .then(async mongoose => {
            try {
                const result = await profileSchema.findOneAndUpdate({
                    _id: userId,
                    guildId,
                },{
                    _id: userId,
                    guildId,
                    $inc: {
                        xp: xpToAdd
                    }
                },{
                    upsert: true,
                    new: true
                })
                let { xp, level } = result;
                const needed = getNeededXP(level);

                if (xp >= needed) {
                    ++level;
                    xp -= needed;
                    message.reply(`You are now level ${level}, with ${xp} experience! You need ${getNeededXP(level)} XP to level up again.`);
                    await profileSchema.updateOne({
                        _id: userId,
                        guildId,
                    }, {
                       level,
                       xp 
                    })
                }

            } finally {
                mongoose.connection.close();
            }
        })
        .catch(err => console.error(err))
}

module.exports.addXP = addXP()


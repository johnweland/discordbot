const mongo = require('@utilities/mongo');
const profileSchema = require('@schemas/profile-schema');

const levelsCache = {};

module.exports = (client) => {
  client.on('message', (message) => {
    const { guild, member } = message

    addXP(guild.id, member.id, 20, message);
  })
}

const getNeededXP = (level) => level * level * 100

const addXP = async (guildId, userId, xpToAdd, message) => {
  await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
            _id: userId,
            guildId,
        },
        {
            _id: userId,
            guildId,
            $inc: {
                xp: xpToAdd,
            },
        },
        {
            upsert: true,
            new: true,
        }
      );

      let { xp, level } = result
      const needed = getNeededXP(level);

      if (xp >= needed) {
        ++level
        xp -= needed

        message.reply(
          `You are now level ${level} with ${xp} experience! You now need ${getNeededXP(
            level
          )} XP to level up again.`
        )

        await profileSchema.updateOne({
            _id: userId,
            guildId,
        },
        {
            level,
            xp,
        })
      }
    } finally {
      mongoose.connection.close()
    }
  });
}

module.exports.addXP = addXP;

const getLevel = async (guildId, userId) => {
  const cachedValue = levelsCache[`${guildId}-${userId}`];
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
                let level = 1;
                if (result) {
                  level = result.level;
                } else {
                    await new profileSchema({
                        _id: userId,
                        guildId,
                        level
                    }).save();
                }
                levelsCache[`${guildId}-${userId}`] = level;
                return level;
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(err => console.error(err));

}

module.exports.getLevel = getLevel;
const mongo = require('@utilities/mongo');
const profileSchema = require('@schemas/profile-schema');

const levelsCache = {};

module.exports = (client) => {
  client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.author.id === client.user.id) return;

    const { guild, member } = message;

    addXP(guild.id, member.id, 20, message);
  })
}

const getNeededXP = (level) => level * level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
  await mongo().then(async (mongoose) => {
    try {
      const result = await profileSchema.findOneAndUpdate(
        {
            guildId,
            userId
        },
        {
            guildId,
            userId,
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
            guildId,
            userId
        },
        {
            level,
            xp
        });
      }
    } catch (err) {
        throw new Error(err);
    } finally {
        mongoose.connection.close();
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
                    guildId,
                    userId
                });
                let level = 1;
                if (result) {
                  level = result.level;
                  xp = result.xp;
                } else {
                    await new profileSchema({
                        guildId,
                        userId,
                        level
                    }).save();
                }
                levelsCache[`${guildId}-${userId}`] = level;
                return {
                  level: level,
                  xp: xp,
                  needed: getNeededXP(level)
                }
            } catch (err) {
              throw new Error(err);
            } finally {
                mongoose.connection.close();
            }
        })
        .catch(err => console.error(err));

}

module.exports.getLevel = getLevel;
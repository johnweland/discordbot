const verificationSchema = require('@schemas/verification-schema');

let verificationCache = {};

const fetchData = async (client) => {
    const results = await verificationSchema.find({});

    for (const result of results) {
        const guild = client.guilds.cache.get(result._id);
        if (!guild) return;
        const channel = guild.channels.cache.get(result.channelId);
        if (!channel) return;
        channel.messages.fetch();
        verificationCache[result.channelId] = result.roleId;
    }
};

const populateCache = async (client) => {
    verificationCache = {};
    await fetchData(client)
        .catch(err => console.error(err));
    setTimeout(populateCache, 1000 * 60 * 10, client);
};

module.exports = client => {
    populateCache(client);
    client.on('messageReactionAdd', (reaction, user) => {
        const channelId = reaction.message.channel.id;
        const roleId = verificationCache[channelId];

        if (!roleId) return;

        const { guild } = reaction.message;
        const member = guild.members.cache.get(user.id);
        member.roles.add(roleId);
    });

    client.on('messageReactionRemove', (reaction, user) => {
        const channelId = reaction.message.channel.id;
        const roleId = verificationCache[channelId];

        if (!roleId) return;

        const { guild } = reaction.message;
        const member = guild.members.cache.get(user.id);
        member.roles.remove(roleId);
    });
}

module.exports.fetch = fetchData;
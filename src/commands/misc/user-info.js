const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');
const levels = require('@features/levels');
const economy = require('@features/economy');

module.exports = class UserInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'misc',
            memberName: 'userinfo',
            description: 'Displays information about a user',
        });
    }

    run = async (message) => {
        const { guild, channel } = message;

        const user = message.mentions.users.first() || message.member.user;
        const member = guild.members.cache.get(user.id);
        const guildId = guild.id;
        const userId = user.id;
        let { level, xp } = await levels.getLevel(guildId, userId);
        let balance = await economy.getCoins(guildId, userId);
        let roles = member.roles.cache;
        level = typeof level === 'undefined' ? 1 : level;
        
        roles = roles.filter(role => role.name !== '@everyone');

        const embed = new MessageEmbed()
            .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
            .addFields(
                {
                    name: 'User tag',
                    value: user.tag,
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Nickname',
                    value: member.nickname || 'None',
                    inline: true
                },
                {
                    name: 'Level',
                    value:  level,
                    inline: true
                },
                {
                    name: 'XP',
                    value:  xp,
                    inline: true
                },
                {
                    name: 'Coins',
                    value:  balance,
                    inline: true
                },
                {
                    name: 'Joined Server',
                    value: new Date(member.joinedTimestamp).toLocaleDateString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Joined Discord',
                    value: new Date(user.createdTimestamp).toLocaleDateString(),
                    inline: true
                },                
                {
                    name: 'Roles',
                    value: roles.map(r => `${r}`).join(',  '),
                    inline: true
                }
            )

        channel.send(embed);
    };
}

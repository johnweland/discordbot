const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

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

        const embed = new MessageEmbed()
            .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
            .addFields(
                {
                    name: 'User tag',
                    value: user.tag,
                    inline: true
                },
                {
                    name: 'Nickname',
                    value: member.nickname || 'None',
                    inline: true
                },
                {
                    name: 'Is bot',
                    value: user.bot,
                },
                {
                    name: 'Joined Server',
                    value: new Date(member.joinedTimestamp).toLocaleDateString(),
                    inline: true
                },
                {
                    name: 'Joined Discord',
                    value: new Date(user.createdTimestamp).toLocaleDateString(),
                    inline: true
                },
                {
                    name: 'Roles',
                    value: member.roles.cache.size - 1,
                }
            )

        channel.send(embed)
    };
}

const { MessageEmbed } = require('discord.js');
const Commando = require('discord.js-commando');

module.exports = class UserInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            group: 'misc',
            memberName: 'serverinfo',
            description: 'Displays information about the server',
        });
    }

    run = async (message) => {
        const { guild } = message;
        const { name, region, memberCount, owner, afkTimeout} = guild;
        const icon = guild.iconURL();
        const ownerAvatar = owner.user.avatarURL();

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server Info for ${name}`)
            .setImage(icon)
            .addFields(
                {
                    name: 'Region',
                    value: region,
                    inline: true
                },
                {
                    name: 'Members',
                    value: memberCount,
                    inline: true
                },
                {
                    name: 'AFK Timeout',
                    value: afkTimeout / 60 + ' mins'
                },
            )
            .setFooter(`Server Owner: ${owner.user.tag}`, ownerAvatar)
            .setColor('#ed7f11');
        message.channel.send(embed);
    };
}

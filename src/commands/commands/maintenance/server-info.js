const Discord = require("discord.js");

module.exports = {
    commands: ['serverinfo', 'server'],
    description: "Gets basic information about the server.",
    minArgs: 0,
    callback: (message, arguments, text) => {
        const { guild } = message;
        const { name, region, memberCount, owner, afkTimeout} = guild;
        const icon = guild.iconURL();
        const ownerAvatar = owner.user.avatarURL();

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server Info for ${name}`)
            .setImage(guild.iconURL())
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
    }
}
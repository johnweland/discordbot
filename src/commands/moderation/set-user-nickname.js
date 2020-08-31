const Commando = require('discord.js-commando');

module.exports = class NicknameCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'nick',
            aliases: ['setnickname'],
            group: 'moderation',
            memberName: 'nick',
            description: 'Sets a nickname to a user.',
            argsType: 'multiple',
            clientPermissions: ['CHANGE_NICKNAME'],
            userPermissions: ['CHANGE_NICKNAME'],
        });
    }

    async run(message, args) {
        if(message.guild === null) return;
        const target = message.mentions.users.first() || message.author;
        const newNick = args[1];
        const { guild } = message;
        const member = guild.members.cache.get(target.id);
        const oldNick = member.nickname || target;
        member.setNickname(newNick)
            .then(member => {
                if (member.nickname === newNick) {
                    message.channel.send(`${oldNick}'s nickname successfully set to ${member.nickname}`);
                }
            })
            .catch(err => {
                console.error(err);
                return message.channel.send("Something went wrong when running this command!");
            });

    };
}
const Commando = require('discord.js-commando');
const verificationSchema = require('@schemas/verification-schema');
const { fetch } = require('@features/verification');

module.exports = class NicknameCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'setverification',
            aliases: ['verification'],
            group: 'moderation',
            memberName: 'setverification',
            description: 'Sets verification channel and reaction for the server.',
            argsType: 'multiple',
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async run(message, args) {
        if (args.length !== 2) {
            message.reply('You must provide an emoji to react with an a role ID')
                .then(message => {
                    message.delete({
                        timeout: 3000
                    });
                });
            message.delete();
            return;
        }

        const { guild, channel } = message;
        let emoji = args[0];
        if (emoji.includes(':')) {
            const split = emoji.split(':');
            const emojiName = split[1];
            emoji = guild.emojis.cache.find((emoji) => {
                return emoji.name === emojiName;
            });
        }

        const roleId = args[1];

        const role = guild.roles.cache.get(roleId);
        if (!role) {
            message.reply('That role does not exist')
                .then(message => {
                    message.delete({
                        timeout: 1000 * 3
                    });
                });
            message.delete();
            return;
        }
        message.delete()
            .then(() => {
                channel.messages.fetch({ limit: 1 })
                    .then(async results => {
                        const result = results.first();

                        if (!result) {
                            channel.send('There is no message to react to.')
                                .then(message => {
                                    message.delete({
                                        timeout: 1000 * 3
                                    });
                                });
                            return;
                        }
                        result.react(emoji);
                        await verificationSchema.findOneAndUpdate({
                            _id: guild.id,
                        }, {
                            _id: guild.id,
                            channelId: channel.id,
                            roleId
                        }, {
                            upsert: true,
                            new: true
                        });

                        await fetch(this.client)
                            .catch(err => console.log(err));
                    });
            })
            .catch(err => console.error(err));


    };
}
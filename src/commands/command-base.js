const { prefix } = require('@root/config.json');

const validatePermissions = (permissions) => {
    const validPermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS'
    ]
    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            console.error(`Unknown permission node "${permission}"`);
        }
    }
}

module.exports = (client, options) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'you do not have permission to execute this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = options;

    if (typeof commands === 'string') {
        commands = [commands];
    }

    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions];
        }
        validatePermissions(permissions);
    }

    client.on('message', message => {
        const { member, content, guild } = message;
        for (const alias of commands) {
            // Ensure a command has been ran
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                // Ensure the user has the required permissions
                for (const permission of permissions) {
                    if(!member.hasPermission(permission)) {
                        message.reply(permissionError);
                        return;
                    }
                }

                // Ensure the user has the required roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole);

                    if(!role || !member.roles.cache.has(role.id)) {
                        message.reply(`You need the role of "${requiredRole}", to use this command.`);
                        return;
                    }
                }

                const arguments = content.split(/[ ]+/);
                arguments.shift();

                // Ensure we have the correct numebr of arguments
                if(arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                    message.reply(`Incorrect syntax: Use ${prefix}${alias} ${expectedArgs}`);
                    return;
                }
                
                // Handle the command
                callback(message, arguments, arguments.join(' '));
                return;
            }
        }
    });

}
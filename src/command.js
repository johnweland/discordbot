const { prefix } = require('./config.json');
module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases];
    }
    client.on('message', message => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${prefix}${alias}`;
            if (content.startsWith(`${command}`) || content === command ) {
                let date = new Date(Date.now());
                console.log(`${date.toDateString()}: Running the command ${command}, as requested by ${message.member.user.tag}.`);
                callback(message);
            }
        });

    })
}
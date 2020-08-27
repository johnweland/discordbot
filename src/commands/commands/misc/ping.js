module.exports = {
    commands: 'ping',
    description: "Simply replys with \"Pong!\" as a means to see if the bot is responding.",
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send("Pong!");
    },
}
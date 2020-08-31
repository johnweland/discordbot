const Commando = require('discord.js-commando');

/**
 * Class representing the AddCommand
 * @extends Commando.Command
 */
class AddCommand extends Commando.Command {
    /**
     * @param {Object} client Discord.js Client with a command framework
     */
    constructor(client) {
        super(client, {
            name: 'add',
            group: 'misc',
            memberName: 'add',
            description: "Adds numbers together",
            argsType: 'multiple'
        });
    }

    /**
     * 
     * @param {Object} message An extension of the base Discord.js Message class to add command-related functionality.
     * @param {Array} args Arguments needed to fulfill the command.
     */
    async run(message, args) {
        let sum =0;
        for (const arg of args) {
           sum += parseInt(arg); 
        }
        message.reply(`The sum is ${sum}`);
    }
}

/**
 * Commands/AddCommand
 * @module AddCommand
 */
module.exports = {
    AddCommand
}
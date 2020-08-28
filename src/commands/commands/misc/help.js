const loadCommands = require('@root/commands/load-commands');
const { prefix } = require('@root/config.json');
const Discord = require("discord.js");

module.exports = {
    commands: ['help', 'h'],
    description: "Describes all of this bot's commands.",
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        let reply = 'Here are my supported commands: \n\n';
        
        const commands = loadCommands();

        for (const command of commands) {
            // Check for permissions
            let permissions = command.permission;
      
            if (permissions) {
              let hasPermission = true;
              if (typeof permissions === 'string') {
                permissions = [permissions];
              }
      
              for (const permission of permissions) {
                if (!message.member.hasPermission(permission)) {
                  hasPermission = false;
                  break;
                }
              }
      
              if (!hasPermission) {
                continue;
              }
            }
      
            // Format the text
            const mainCommand =
              typeof command.commands === 'string'
                ? command.commands
                : command.commands[0];
            if (Array.isArray(command.commands)) {
              command.commands.shift();
              for(var i=0;i<command.commands.length;i++){
                command.commands[i] = `${prefix}`+command.commands[i];
              }
            }
            
            let aliases = Array.isArray(command.commands) ? command.commands.join(', ') : '';
            let args = command.expectedArgs ? ` ${command.expectedArgs}` : '';
            const { description } = command;
      
            reply += `**${prefix}${mainCommand}${args}:**   `;
            reply += `${description}`;
            if (aliases!== '') {
              reply += (`      _also see: [_ **${aliases}** _]_      `);
            }
            reply+= `\n`;         
          }
      
          message.channel.send(reply);
    },
}
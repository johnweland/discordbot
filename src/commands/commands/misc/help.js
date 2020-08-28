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
        let embed = new Discord.MessageEmbed()
            .setTitle(`**!help**`)
            .setDescription(`Here are my supported commands:`);

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
            }
            
            const aliases = Array.isArray(command.commands) ? command.commands.join(', ') : '';
            const args = command.expectedArgs ? ` ${command.expectedArgs}` : '';
            const { description } = command;
            // let aliases = '';
            // if (Array.isArray(command.commands) && command.commands.length > 1) {
            //   aliases = command.commands.join(', ');
            //   console.log(command.commands.join(', '));
            // }
      
            reply += `**${prefix}${mainCommand}${args}:**   `;
            if (aliases!== '') {
              reply += (`_alias: [_ **${aliases}** _]_      `);
            }
            reply += `${description}\n`;
            // embed.addFields({
            //   name: 'Command',
            //   value: `${prefix}${mainCommand}`,
            //   inline: true
            // },{
            //   name: 'Aliases',
            //   value: `${aliases}`,
            //   inline: true
            // },{
            //   name: 'Arguments',
            //   value: `${args}`,
            //   inline: true
            // },{
            //   name: 'Description',
            //   value: `${description}`,
            //   inline: true
            // });            
          }
      
          message.channel.send(reply);
    },
}
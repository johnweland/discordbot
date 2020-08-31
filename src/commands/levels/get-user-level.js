const Commando = require('discord.js-commando');
const levels = require('@features/levels');
const { createCanvas, loadImage } = require('canvas');
const { MessageAttachment } = require('discord.js');

module.exports = class DailyCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'getlevel',
            group: 'xp',
            memberName: 'getlevel',
            description: 'Gets a user\'s current level and XP',
        });
    }

    async run(message) {
        const target = message.mentions.users.first() || message.author;
        const guildId = message.guild.id;
        const userId = target.id;
        const result = await levels.getLevel(guildId, userId);
        const attachment = await createRankCard(target, result);
        message.channel.send(`Level info for ${target}`, attachment);
    };
}

const createRankCard = async (target, data) => {
    const canvas = createCanvas(1000, 333);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#2C2F33";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#23272A';
    ctx.strokeRect(0, 0, 10, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#FFFFFF";
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#000000";
    ctx.fillRect(180, 216, 770, 65);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeRect(180, 216, 770, 65);
    ctx.stroke();
    //progress bar
    ctx.fillStyle = "#e67e72";
    ctx.globalAlpha = 0.6;
    // math needs to be set to our level math
    ctx.fillRect(180, 216, ((100 / (data.needed)) * data.xp) * 7.7, 65);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(`${data.xp} / ${data.needed} XP`, 600, 260);

    // User Tag
    ctx.textAlign = "left";
    ctx.fillText(`${target.tag}`, 300, 120);

    // User Level
    ctx.font = "50px Arial";
    ctx.fillText("Level: ", 300, 180);
    ctx.fillText(`${data.level}`, 470, 180);

    // User Avatar
    ctx.arc(170, 160, 120, 0, Math.PI * 2, true);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    const avatar = await loadImage(target.avatarURL({ format: "jpg" }));
    ctx.drawImage(avatar, 40, 40, 250, 250);
    const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png");
    return attachment;
}
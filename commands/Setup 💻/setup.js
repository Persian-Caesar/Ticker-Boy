const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const db = require('quick.db');
const {
    errorEmbed,
    successEmbed,
    epochDateNow,
    logsEmbed,
    CustomErrorEmbed
} = require("../../functions/functions");
module.exports = {
    name: "setup",
    cooldown: 5,
    aliases: ["tic","tsetup","setup"],
    description: "Setup ticket channel",    
    category: 'Setup 💻',
    usage: "[channel mention | channel ID | channel name]",
    run: async function(bot, message, args, prefix, logsChannel){
        try {
            var ticketChannel = message.mentions.channels.first() || bot.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
            var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
            var title = message.content.split(' ').slice(3).join(' ') || 'Create Ticket';
            if (!adminRole) {
                message.reply({
                    embeds: [errorEmbed(
                        message,
                        "for setup ticket system you have to mention **ticket channel** and mention **admin role**, like the example:\n```js\n"+prefix+"setup <Ticket Channel> <Admin Role> <Ticket Embed Title> ```"
                    )],
                })
                 return
            }
            if(logsChannel){
                logsChannel.send({
                    embeds: [logsEmbed(
                        message,
                        "Ticket System Setup",
                        "setup the ticket system in this server `"+message.guild.name+"` is successfuly.",
                        bot.emotes.system,
                        bot,
                        ticketChannel,
                        'setup ticket system'
                    )]
                })
            }
            message.reply({
                embeds: [successEmbed(
                    message,
                    "setup the ticket system at this server `"+message.guild.name+"` in this channel **"+ticketChannel+"** is successfuly.",
                    bot
                )]
            })
            .then(m => m.react(bot.emotes.tick))
            .then(message.react(bot.emotes.setup));
                    ticketChannel.send({
                        embed: {
                            color: bot.colors.none,
                            description: '```js\nFor Creating A Ticket Click Button Right Onther This Message.'+bot.emotes.ticket+'```',
                            title: title
                        },
                        components: [new MessageActionRow()
                            .addComponents(
                                [new MessageButton()
                                    .setStyle("SUCCESS")
                                    .setLabel("Create Ticket")
                                    .setEmoji(bot.emotes.ticket)
                                    .setCustomId("createTicket")]
                        )]
                    }).then(async function() {
                        bot.db.set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
                    })
        } catch (err) {
            return;
        }    
    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
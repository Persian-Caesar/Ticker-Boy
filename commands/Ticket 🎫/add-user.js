const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const db = require("quick.db");
const { 
 errorEmbed,
 CustomErrorEmbed,
 successEmbed,
 logsEmbed,
 NeedHelpButtons
} = require("../../functions/functions");
module.exports = {
  name: "add-user",
  aliases: ['add','get-in','invite-ticket','invite ticket'],
  cooldown: 5,
  description: "adding some people in user ticket channel.",    
  category: 'Ticket 🎫',
  usage: "[ Mention-user | ID | Name ]",
 run: async function(bot, message, args, prefix, logsChannel){
     if (!message.channel.name.includes("ticket-")) {
         message.reply({
             embeds: [errorEmbed(
                          message,
                          bot.emotes.entry+"| **My Friend, This channel it dosen't ticket channel.\nI can't add people in this channel for you because here is another channel.\nAlso you can create a ticket.**",
                          bot
                       )]
         })
         return
     }
     if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
         message.reply({
             embed: errorEmbed(message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```",bot)
         })
         return
     }
     var member = message.mentions.members.first() ||
         message.guild.members.cache.find(u => u.id == args[0]) ||
         message.guild.members.cache.find(u => u.user.username == args[0]) ||
         message.guild.members.cache.find(u => u.nickname == args[0]) ||
         message.guild.roles.cache.find(r => r.id == args[0]) ||
         message.guild.roles.cache.find(r => r.name == args[0]) ||
         message.mentions.roles.first();
     if (!args[0]) {
         message.reply({
          embed: errorEmbed(message, '**for adding people to ticket, you have got mention it to me.\nplease mention or write your target member right behind the command.**',bot)
         })
         return
     }
     var txt;
     var mem = member.name;
     if (!mem || mem == null || mem == undefined) {
         txt = '<@!' + member.id + '>'
     } else {
         txt = '<@&' + member.id + '> role'
     }
     message.channel.overwritePermissions([{
         id: bot.db.fetch(`TicketControl_${message.channel.id}`),
         allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
     }, {
         id: member.id,
         allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
     }, {
         id: bot.db.fetch(`TicketAdminRole_${message.guild.id}`),
         allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
     }, {
         id: message.guild.roles.everyone,
         deny: ["VIEW_CHANNEL"]
     }]).then(() => {
         message.channel.send({
             embed: successEmbed(
                     message,
                     "**I add this people** *"+txt+"* **to your ticket bro.**",
                     bot
                    ),
         })
     })
     if(logsChannel){
        if(logsChannel) logsChannel.send({
            embed: logsEmbed(
                message,
                "Request To Adding People To Ticket",
                'this guy ' + message.member.tag + "**requested to adding people to his ticket and I add this people the ticket for him:**\n*"+txt+"*",
                bot.emotes.add,
                bot,
                message.channel,
                'add people in to the ticket'
                )
        });
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
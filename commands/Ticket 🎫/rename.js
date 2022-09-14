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
    name: "rename",
    aliases: ['re','name','ren'],
    cooldown: 5,
    description: "rename the ticket channel for user in server.",    
    category: 'Ticket 🎫',
    usage: "[ name | text ]",
 run: async function(bot, message, args, prefix){
  try {
     var renameMessage = args[0];
     if (!message.channel.name.includes("ticket-")) {
         message.reply({
             embed: errorEmbed(
                          message,
                          bot.emotes.entry+"| **My Friend, This channel it dosen't ticket channel.\nI can't rename the ticket in this channel for you because here is another channel.\nAlso you can create a ticket.**",
                          bot
                       )
         })
         return
     }
     let support = message.guild.roles.cache.find(r => r.id === bot.db.fetch(`TicketAdminRole_${message.guild.id}`).id);
     if (!message.channel.name.includes("ticket-")) {
      if(support){
        if(!message.member.roles.cache.has(support)||!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD||Permissions.FLAGS.ADMINISTRATOR))         message.reply({
             embed: errorEmbed(message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```",bot)
         })
         return
      }
     }
     if (!renameMessage) {
         message.reply({
             embed: errorEmbed(message, '**for changing the ticket name you have got tell me it.\nplease write your target name right behind the command.**',bot)
        })
         return
     }
     message.channel.send({
         embed: CustomErrorEmbed(message,'Request To Change Ticket Name','are you sure to change your ticket channel name??',bot.emotes.error,bot),
         component: [
          new MessageActionRow()
         .addComponents(
          [new MessageButton()
           .setStyle("SUCCESS")
           .setEmoji("✅")
           .setLabel("Change Name")
           .setID("renameTicketTrue")
         ],
         [new MessageButton()
           .setStyle("DANGER")
           .setEmoji("⛔")
           .setLabel("Cancel")
           .setID("renameTicketFalse")
         ]
         )]
     }).then(async function(msg) {
         setTimeout(() => {
           msg.edit({embed:errorEmbed(message,'your time for changing the ticket channel name is ended.☹')}).catch(err => { return })
        }, 1000 * 50);
         db.set(`RenameTicket_${message.channel.id}`, renameMessage)
         db.set(`DeleteRenameMessage_${message.channel.id}`, msg.id)
     })
   }catch(e) {
    console.log(e)
    return message.reply({
            content: `${bot.emotes.error} **| Error, \`\`\`js\n${e}\`\`\`**`,
            components: '',
        }).then(message.member.send({
                content: `Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${bot.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
                components: [NeedHelpButtons(bot)] 
            })
          );
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
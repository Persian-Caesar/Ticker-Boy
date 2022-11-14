const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "add-user",
  aliases: ['add','get-in','invite-ticket','invite ticket'],
  cooldown: 5,
  description: "adding some people in user ticket channel.",    
  category: 'Ticket 🎫',
  usage: "[ Mention-user | ID | Name ]",
 run: async function(client, message, args, prefix, logsChannel){
   
if(message.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||message.channel.name === db.get(`ticketName_${message.author.id}_${message.guild.id}`)){
        if(!message.member.roles.cache.has(db.get(`TicketAdminRole_${message.guild.id}`))&&!message.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])&&!message.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return message.reply({        
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: message.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]       
          })

     var member = message.mentions.members.first() || message.guild.members.cache.find(u =>{ u.id == args[0] ||  u.user.username == args[0] || u.nickname == args[0] })
     if (!member) {
return message.reply({        
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("**for adding people to ticket, you have got mention it to me.\nplease mention or write your target member right behind the command.**")
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: message.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]       
          })
     }
  
        message.reply({
                   embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('📇| **Request To Adding People To Ticket**')
            .setColor(client.colors.none)
            .setDescription("are you sure to change your ticket channel name??")
            .setFooter({
              text: "Change Name | created by Mr.SIN RE#1528",
              iconURL: message.guild.iconURL({ dynamic: true })
            })],
         components: [
          new MessageActionRow()
         .addComponents(
          [new MessageButton()
           .setStyle("SUCCESS")
           .setEmoji(client.emotes.plus)
           .setLabel("Add Member")
           .setCustomId("addmemberTicket")
         ],
         [new MessageButton()
           .setStyle("DANGER")
           .setEmoji(client.emotes.x)
           .setLabel("Cancel")
           .setCustomId("canceladdmemberTicket")
         ]
         )]
        })
        db.set(`TicketControlNewMember_${message.channel.id}`, member.user.id)
        setTimeout(() => {
           message.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for changing the ticket channel name is ended.⏰\n```")
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: message.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]
           })
             db.delete(`TicketControlNewMember_${message.channel.id}`)
        }, 1000 * 50)
        }else {
           message.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, here is not a ticket channel please use this command in other channel**`)
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: message.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]       
          })
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
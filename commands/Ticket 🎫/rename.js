const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const db = require("quick.db");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
    name: "rename",
    aliases: ['re','name','ren'],
    cooldown: 5,
    description: "rename the ticket channel for user in server.",    
    category: 'Ticket 🎫',
    usage: "[ name | text ]",
 run: async function(client, message, args, prefix){
  try {
if(message.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||message.channel.name === db.get(`ticketName_${message.author.id}_${message.guild.id}`)){
      let ticketName = args.split(1);
  if(!ticketName){
    errorMessage(client, message, "```js\n please proved a channel name. \n```")
  }
        if(!message.member.roles.cache.has(db.get(`TicketAdminRole_${message.guild.id}`))&&!message.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

let embed = new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle(client.emotes.rename+'| **Request To Change Ticket Name**')
            .setColor(client.colors.none)
            .setDescription("are you sure to change your ticket channel name??")
            .setFooter({
              text: "Change Name • "+client.embed.footerText,
              iconURL: message.guild.iconURL({ dynamic: true })
            })
     message.reply({
         embeds: [embed],
         components: [
          new MessageActionRow()
         .addComponents(
          [new MessageButton()
           .setStyle("SUCCESS")
           .setEmoji(client.emotes.rename)
           .setLabel("Change Name")
           .setCustomId("renameTicketTrue")
         ],
         [new MessageButton()
           .setStyle("DANGER")
           .setEmoji(client.emotes.x)
           .setLabel("Cancel")
           .setCustomId("cancel")
         ]
         )]
     }).then((msg)=>{
       db.set(`RenameTicket_${message.channel.id}`, ticketName)
       if(msg.embeds[0].title === client.emotes.rename+'| **Request To Change Ticket Name**'){
          embed.setFooter({
           text: `The Time Is Up • for use again: ${prefix}rename`,
           iconURL: message.guild.iconURL({ dynamic: true })
          })
        setTimeout(() => {
           msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for changing the ticket channel name is ended.⏰\n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
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
db.delete(`RenameTicket_${message.channel.id}`)
        }, 1000 * 50)
        }
      })
        }else{
         errorMessage(client, message, `**My Friend, here is not a ticket channel please use this command in other channel**`)
        }
   }catch(e) {
    console.log(e)
    errorMessage(client, message, `\`\`\`js\n${e}\`\`\``)
  }
 }
}
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */
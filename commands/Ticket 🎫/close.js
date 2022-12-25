const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const db = require('quick.db');
module.exports = {
    name: "close",
    aliases: ['c','cl'],
    cooldown: 5,
    description: "close the ticket channel for user.",    
    category: 'Ticket 🎫',
    usage: "",
 run: async function(client, message, args, prefix, logsChannel){
 if(message.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||message.channel.name === db.get(`ticketName_${message.author.id}_${message.guild.id}`)){
       message.reply({
                embeds: [new MessageEmbed()
                        .setColor(client.colors.none)
                        .setTitle(`${client.emotes.close}| Close Ticket`)
                .setDescription(`Dear friend, you requested for closing ${message.guild.members.cache.find(c => c.id === db.get(`TicketControl_${message.channel.id}`))} ticket, are you sure for close here??`)
                      ],
                components: [new MessageActionRow()
                .addComponents([new MessageButton()
              .setStyle("DANGER")
              .setCustomId("cancel")
              .setEmoji(client.emotes.x)
              .setLabel("Don't Close")
              ],[new MessageButton()
              .setStyle("SECONDARY")
              .setCustomId("configTicket")
              .setEmoji(client.emotes.close)
              .setLabel("Close It")
              ])]
           }).then((msg)=>{
         if(msg.embeds[0].title === `${client.emotes.close}| Close Ticket`){

       setTimeout(() => {
           msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for close the ticket channel is ended.⏰\n```")
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
        }, 1000 * 50)
         }
           })
    }else{
           message.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`**My Friend, here is not a ticket channel please use this command in other channel**`)
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: message.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]       
          })
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
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const db = require('quick.db');
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
    name: "open",
    aliases: ['open-ticket','ticket open',"op","opt"],
    cooldown: 5,
    description: "open the user ticket channel.",    
    category: 'Ticket 🎫',
    usage: "",
 run: async function(client, message, args, prefix){
      if(message.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||message.channel.name === db.get(`ticketName_${message.author.id}_${message.guild.id}`)){
        if(!message.member.roles.cache.has(db.get(`TicketAdminRole_${message.guild.id}`))&&!message.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

let embed = new MessageEmbed()
      .setColor(client.colors.none)
      .setTitle(`${client.emotes.open}| Open Ticket`)
      .setDescription(`Dear friend, you requested for openning ${message.guild.members.cache.find(c => c.id === db.get(`TicketControl_${message.channel.id}`))} ticket, are you sure for open here??`)
                      
          message.reply({
                embeds: [embed],
                components: [new MessageActionRow()
                .addComponents([new MessageButton()
              .setStyle("DANGER")
              .setCustomId("cancel")
              .setEmoji(client.emotes.x)
              .setLabel("Don't Open")
              ],[new MessageButton()
              .setStyle("SUCCESS")
              .setCustomId("reopenTicket")
              .setEmoji(client.emotes.open)
              .setLabel("Open It")
              ])]
           }).then((msg)=>{
        setTimeout(() => {
if(msg.embeds[0].title === `${client.emotes.open}| Open Ticket`){
           msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for openning the ticket channel is ended.⏰\n```")
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
}
        }, 1000 * 50)   
           })
          }else {
           errorMessage(client, message, `**My Friend, here is not a ticket channel please use this command in other channel**`)
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
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
    name: "delete",
    aliases: ['del','remove'],
    cooldown: 5,
    description: "remove and delete the ticket channel for user in server.",    
    category: 'Ticket 🎫',
    usage: "",
 run: async function(client, message, args, prefix){

      if(message.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||message.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||message.channel.name === db.get(`ticketName_${message.author.id}_${message.guild.id}`)){
        if(!message.member.roles.cache.has(db.get(`TicketAdminRole_${message.guild.id}`))&&!message.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

let embed = new MessageEmbed()
                 .setColor(client.colors.none)
                 .setTitle(`${client.emotes.trash}| Delete Ticket`)
                 .setDescription(`Dear friend, you requested for delete ${message.guild.members.cache.find(c => c.id === db.get(`TicketControl_${message.channel.id}`))} ticket, are you sure for delete here??`)
                
          message.reply({
                embeds: [embed],
                components: [new MessageActionRow()
                 .addComponents([new MessageButton()
                  .setStyle("SECONDARY")
                  .setCustomId("cancel")
                  .setEmoji(client.emotes.x)
                  .setLabel("Don't Delete")
                 ],[new MessageButton()
                  .setStyle("DANGER")
                  .setCustomId("deleteTicket")
                  .setEmoji(client.emotes.trash)
                  .setLabel("Delete It")
                 ])
                ]
           }).then((msg)=>{
            if(msg.embeds[0].title === `${client.emotes.trash}| Delete Ticket`){

       setTimeout(() => {
           msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for delete the ticket channel is ended.⏰\n```")
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
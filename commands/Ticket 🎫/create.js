const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "ticket",
  aliases: ["createticket", "create", "t", "cr", "tc"],
  cooldown: 5,
  description: "for creating the ticket channel for user in server.",    
  category: 'Ticket 🎫',
  usage: "",
  run: async function(bot, message, args, prefix){

    let embed = new MessageEmbed()
      .setTitle(`${bot.emotes.ticket}| **Request To Create Ticket**`)
      .setColor(bot.colors.none)
      .setTimestamp()
      .setDescription('**your ticket channel will be created but are you sure to do this??\nif your ticket created please wait the moderators or admins to speek there.**')
      .addField(bot.emotes.reason+'| INFOS','if you want to create a ticket channel for yourself, you have to click to this emoji: `"'+bot.emotes.ticket+'"` or else click to `"'+bot.emotes.x+'"`.')
      .setURL(bot.config.discord.server_support)
      .setFooter({
        text: `Request To Create Ticket • ${bot.embed.footerText}`,
        iconURL: message.guild.iconURL({ dynamic: true })
      })
      .setAuthor({
        name: `Requested by ` + message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
  
  message.reply({
      embeds: [embed],
      components: [new MessageActionRow()
          .addComponents(
            [new MessageButton()
            .setCustomId('create')
            .setEmoji(bot.emotes.ticket)
            .setLabel("Create Ticket")
            .setStyle('SUCCESS')],
            [new MessageButton()
              .setCustomId('dont_do')
              .setEmoji(bot.emotes.x)
              .setLabel('Cancel Process')
              .setStyle("DANGER")
          ])
      ]
  }).then(msg=>{
    db.set(`CreateTicketMSG_${message.guild.id}_${message.author.id}`, msg.id)
    setTimeout(()=>{
  if(msg.embeds[0].title === `${bot.emotes.ticket}| **Request To Create Ticket**`){
      embed.setFooter({
        text: `The Time Is Up • for use again: ${prefix}ticket`,
        iconURL: message.guild.iconURL({ dynamic: true })
      })
      msg.edit({
      embeds: [embed],
      components: [new MessageActionRow()
          .addComponents(
            [new MessageButton()
            .setCustomId('create')
            .setEmoji(bot.emotes.ticket)
            .setLabel("Create Ticket")
            .setStyle('SUCCESS')
            .setDisabled(true)],
            [new MessageButton()
              .setCustomId('dont_do')
              .setEmoji(bot.emotes.x)
              .setLabel('Cancel Process')
              .setStyle("DANGER")
              .setDisabled(true)])
      ]       
      })
  }
    },60*1000)
  })
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
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const db = require("quick.db");
const { 
  epochDateNow,
  errorEmbed,
  CustomErrorEmbed,
  logsEmbed
} = require("../../functions/functions");
module.exports = {
    name: "delete",
    aliases: ['del','remove'],
    cooldown: 5,
    description: "remove and delete the ticket channel for user in server.",    
    category: 'Ticket 🎫',
    usage: "",
 run: async function(bot, message, args, prefix, logsChannel){

  let support = message.guild.roles.cache.find(r => r.id === db.fetch(`TicketAdminRole_${message.guild.id}`));
     if (!message.channel.name.includes("ticket-")) {
      if(support){
        if(!message.member.roles.cache.has(support)||!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD||Permissions.FLAGS.ADMINISTRATOR))
        return message.reply({
                   embeds: [errorEmbed(message, "my friend you are don't have this permissions: `\"MANAGE_GUILD\" or \"ADMINISTRATOR\"`.",bot)]
               });
      }
         message.reply({
             embeds: [errorEmbed(
                          message,
                          bot.emotes.entry+"| **My Friend, This channel it dosen't ticket channel.\nI can't delete ticket in this channel for you because here is another channel.\nAlso you can create a ticket.**",
                          bot
                       )]
         })
         return
     } else {
        message.reply({
          embeds: [CustomErrorEmbed(
            message,
            "Request To Delete Ticket",
            "request to delete the ticket channel for you, Are sure?\nif you sure react to `\""+bot.emotes.close+"\"` for close your ticket esle react this.`\""+bot.emotes.x+"\"`",
            bot.emotes.trash,
            bot
          )]
        })
        .then(m =>{
          m.react(bot.emotes.trash)
          m.react(bot.emotes.x)
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
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const { 
  CustomErrorEmbed,
  errorEmbed
} = require("../../functions/functions");
module.exports = {
    name: "close",
    aliases: ['c','cl'],
    cooldown: 5,
    description: "close the ticket channel for user",    
    category: 'Ticket 🎫',
    usage: "",
 run: async function(bot, message, args, prefix, logsChannel){
     if (!message.channel.name.includes("ticket-")) {
         message.reply({
             embeds: [errorEmbed(
                          message,
                          bot.emotes.entry+"| **My Friend, This channel it dosen't ticket channel.\nI can't close ticket in this channel for you because here is another channel.\nAlso you can create a ticket.**",
                          bot
                       )]
         })
         return
     } else {
        message.reply({
          embeds: [CustomErrorEmbed(
            message,
            "Request To Close Ticket",
            "request to close the ticket channel for you, Are sure?\nif you sure react to `\""+bot.emotes.close+"\"` for close your ticket esle react this.`\""+bot.emotes.x+"\"`",
            bot.emotes.close,
            bot
          )]
        })
        .then(m =>{
          m.react(bot.emotes.close)
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
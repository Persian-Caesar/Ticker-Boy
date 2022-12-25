const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
module.exports = {
   name: 'setadmin',
   aliases: ['adminrole', 'admin', 'role'],
   category: 'Setup 💻',
   description: "setup ticket admin role in guild.",
   cooldown: 6,
   run: async function(client, message, args, prefix, logsChannel){
                  let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
                if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_ROLES\" \n```")
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
                   .setDisabled(true))], 
    ephemeral: true,
          })      

    if(!role) 
        return message.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(" please mention some role to setup server ticket admin. ")
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
                   .setDisabled(true))], 
          });
     
if(message.guild.roles.cache.find(c => c.id === db.fetch(`TicketAdminRole_${message.guild.id}`))) return message.reply({
           ephemeral: true,
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`**My Friend, you just have a setup your ticket mod roles befor it to ${message.guild.roles.cache.find(c => c.id === db.fetch(`TicketAdminRole_${message.guild.id}`))}.**`)
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: message.guild.iconURL({ dynamic: true })
            })]
       })

    message.reply({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`\n I just setup your ticket admin role to ${role}.`).setFooter({text: `Successfuly • Requested By ${message.author.tag} `, iconURL: message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.set(`TicketAdminRole_${message.guild.id}`, role.id)
    if(db.fetch(`modlog_${message.guild.id}`)){
  message.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${message.guild.id}`)).send({
    embeds: [new MessageEmbed().setTitle(client.emotes.tick+'| ** Process Is Successfuly**').setColor(client.colors.none).setDescription(`I just setup ticket admin role to ${role} in this guild.`).setFooter({text: `Logs Setuped | Requested By ${message.author.tag} `, iconURL: message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.displayAvatarURL({dynamic:true}))]
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
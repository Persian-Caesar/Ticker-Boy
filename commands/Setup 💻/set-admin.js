const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
   name: 'setadmin',
   aliases: ['adminrole', 'admin', 'role'],
   category: 'Setup 💻',
   description: "setup ticket admin role in guild.",
   cooldown: 6,
   run: async function(client, message, args, prefix, logChannel){
                  let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
                if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_ROLES\" \n```")

    if(!role) 
         errorMessage(client, message, "please mention some role to setup server ticket admin. ")
     
if(message.guild.roles.cache.find(c => c.id === db.fetch(`guild_${message.guild.id}.ticket.admin_role`))) return errorMessage(client, message, `**My Friend, you just have a setup your ticket mod roles befor it to ${message.guild.roles.cache.find(c => c.id === db.fetch(`guild_${message.guild.id}.ticket.admin_role`))}.**`)

    message.reply({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`\n I just setup your ticket admin role to ${role}.`).setFooter({text: `Successfuly • Requested By ${message.author.tag} `, iconURL: message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.set(`guild_${message.guild.id}.ticket.admin_role`, role.id)
    if(db.fetch(`guild_${message.guild.id}.modlog`)){
  message.guild.channels.cache.find(c => c.id === db.fetch(`guild_${message.guild.id}.modlog`)).send({
    embeds: [new MessageEmbed().setTitle(client.emotes.tick+'| ** Process Is Successfuly**').setColor(client.colors.none).setDescription(`I just setup ticket admin role to ${role} in this guild.`).setFooter({text: `Logs Setuped • Requested By ${message.author.tag} `, iconURL: message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.displayAvatarURL({dynamic:true}))]
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
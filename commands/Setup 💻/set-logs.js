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
   name: 'setlogs',
   aliases: ['logs', 'channel', 'log'],
   category: 'Setup 💻',
   description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
   cooldown: 6,
   run: async function(client, message, args, prefix, logsChannel){
                if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
     
    let mentionCH = message.mentions.channels.first()|| client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]);
    if(!mentionCH)
     return errorMessage(client, message, "```js\n please mention some channel befor.\n```")

    let channel = message.guild.channels.cache.find(c => c.id === mentionCH.id);
     
    if(!channel || channel.type !== "GUILD_TEXT") 
        return errorMessage(client, message, "please mention some valid channel to setup server logs.\n valid channel: `\"GUILD_TEXT\"`")
     
if(message.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${message.guild.id}`))){
     return errorMessage(client, message, `**My Friend, you just have a logs channel befor it to ${message.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${message.guild.id}`))}.**`)

}else {
    message.reply({
    embeds: [new MessageEmbed().setTitle('✅| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`process is successfuly.\n I just setup your ticket logs channel to ${channel}.`).setFooter({text: `Successfuly • Requested By ${message.author.tag} `, iconURL: message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.set(`modlog_${message.guild.id}`, channel.id)
  channel.send({
    embeds: [new MessageEmbed().setColor(client.colors.none).setDescription(`just now here is ticket logs channel for send members tickets information setupped to ${channel}.`).setTitle('✅| ** Process Is Successfuly**').setFooter({text: `Logs Setuped • Requested By ${message.author.tag} `, iconURL: message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.displayAvatarURL({dynamic:true}))]
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
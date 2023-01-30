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
    name: "setmenu",
    cooldown: 5,
    aliases: ["set-menu","stm"],
    category: 'Setup 💻',
    usage: '[option-name] [emote]',
    description: "Change bot prefix in server",
   run: async function(client, message, args, prefix, logsChannel){
    try {        
      if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)){
          errorMessage(client, message, "my friend you are don't have this permissions: `\"MANAGE_GUILD\"`.")
      }
      let name = args.slice(0).join(' ');
      //let emote = args.slice(name.length+1).join(' ')
      if (!name) { 
        return errorMessage(client, message, "please place some name for the menu of ticket option.")
      }
      let options = {}
      let content = `${client.emotes.success}| Successfully menu option setuped.`
      if(name){
        options = { label: name, value: name }
        content += `\n> menu name: **${name}**`
      }
      /*if(name&&emote){
        options = { label: name, value: name, emoji: emote }
        content += `\n> menu emoji: **${emote}**`
      }*/
      db.push(`guild_${message.guild.id}.ticket.menu_option`,options)
      message.reply({
        content: content,
      })
     } catch (error) {
      return console.log(error)
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
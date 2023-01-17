const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'say',
  aliases: ['post','send'],
  category: 'Owner 👑',
  description: 'send your message with bot.',
  usage: "",
  cooldown: 6,
run: async function(bot, message, args, prefix){
  if (!bot.config.owner.some(r => r.includes(message.author.id)))
  return errorMessage(bot, message, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${bot.config.owner.map(id => `<@${id}>`)}**`)

     try{
       let text = message.content.split(' ').slice(1).join(' ');
       if(text){
        message.reply({
           content: bot.emotes.typing+"| I sent your message in channel."
        }).then((m)=> setTimeout(()=>{ m.delete(); message.delete() },5000) )//after 3seconds bot will delete the message
       message.channel.send(text)
       }else{
     message.reply({
           content: `${bot.emotes.error}| please write your message after the command to send it.`
         }).then((m)=> setTimeout(()=>{ m.delete(); message.delete() },5000) )//after 3seconds bot will delete the message
       }
     }catch(e) {
          console.error(e)
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
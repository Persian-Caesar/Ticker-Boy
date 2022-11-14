const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const {
   errorEmbed 
} = require("../../functions/functions");
module.exports = {
  name: 'say',
  aliases: ['post','send'],
  category: 'Owner 👑',
  description: 'send your message with bot.',
  usage: "",
  cooldown: 6,
run: async function(bot, message, args, prefix){
  if (!bot.config.owner.some(r => r.includes(message.author.id)))
  return message.reply({
                  embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + message.author.username,
                      iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(`> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${bot.config.owner.map(id => `<@${id}>`)}**`)
                    .setTitle('⛔️| **We Got An Error**')
                    .setColor(bot.colors.none)
                    .setFooter({
                      text: `Error | ${bot.embed.footerText}` ,
                      iconURL: message.guild.iconURL({ dynamic: true })
                    })],
                  components: [new MessageActionRow()
                    .addComponents(new MessageButton()
                      .setStyle("DANGER")
                      .setLabel("Error")
                      .setEmoji("⚠️")
                      .setCustomId("error")
                      .setDisabled(true))
                  ]
              })

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
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
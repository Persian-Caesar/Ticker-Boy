const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const {
   NeedHelpButtons
} = require('../../functions/functions')
module.exports = {
  name: "invite", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: [ "in","add","link" ], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  usage: '',
  description: "get bot invite link.", //the command description for helpcmd [OPTIONAL]
  run: async function(bot, message, args, prefix){
let inviteEmbed = new MessageEmbed()
      .setAuthor({name:`Requested by ${message.author.username}`, iconURL:`${message.author.displayAvatarURL()}`})
      .setThumbnail(bot.user.displayAvatarURL({ format: "png" }))
      .setTitle(`Ba Invite Bot Be Servert Azash Hemaiat Kon☺ ${bot.user.username}`)
      .setDescription(`**Montazer chi hasti🤨? Bodo mano be servert add kon🙂😘 \n\n [Invite Link](https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=412353895745&scope=bot)**`)
      .setURL(`https://discord.gg/5GYNec4urW`)
      .setFooter({
          text:"Created By Mr.SIN RE#1528 :)", 
          iconURL:`https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })
      .setColor(bot.colors.none)
   message.reply({
      components: [NeedHelpButtons()],
      embeds: [inviteEmbed]
     });
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
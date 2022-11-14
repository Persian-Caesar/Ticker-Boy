const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
module.exports = {
  name: "invite", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: [ "in","add","link" ], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  usage: '',
  description: "get bot invite link.", //the command description for helpcmd [OPTIONAL]
  run: async function(bot, message, args, prefix){
let inviteEmbed = new MessageEmbed()
      .setThumbnail(bot.user.displayAvatarURL({ format: "png" }))
      .setTitle(`Invite Me To Your Guild`)
      .setDescription(`**[Invite Me](${bot.config.discord.invite}) to your server by clicking on the My profile, then clicking on the 'Add to Server' button. \nAlternatively, you can click below to [Invite Me](${bot.config.discord.invite}) to your server!**`)
      .setFooter({
          text: bot.embed.footerText, 
          iconURL: bot.embed.footerIcon
        })
      .setURL(`${bot.config.discord.server_support}`)
      .setColor(bot.colors.none)
   message.reply({
        components: [new MessageActionRow()
               .addComponents([new MessageButton()
                 .setStyle('LINK')
                 .setLabel('Invite Me')
                 .setEmoji(bot.emotes.invite)
                 .setURL(`${bot.config.discord.invite}`)
               ],[new MessageButton()
                   .setStyle('LINK')
                   .setLabel('Support Server!')
                   .setEmoji(bot.emotes.help)
                   .setURL(`${bot.config.discord.server_support}`)
               ]) 
             ],
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
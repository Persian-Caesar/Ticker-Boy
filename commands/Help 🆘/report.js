const {
  NeedHelpButtons,
  NeedHelpMenu,
  epochDateNow,
  HelpCategoryEmbed,
  errorEmbed
} = require('../../functions/functions.js');
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
module.exports = {
    name: 'report',
    aliases: ['bug','rp'],
    category: 'Help 🆘',
    utilisation: '{prefix}report',
     description: 'for report bot bugs to developers :)',
  async execute(bot, message, args) { 
const choice = args.slice().join(" ");
    try{
        if (!choice){
 return message.channel.send({
                     embed: errorEmbed(message, 'for report a bugs of bot you have to write your *message* right behind of command.', bot), 
                     components: [NeedHelpButtons(bot)] 
                    })
        }else {
          const sizarTMserver = bot.guilds.cache.get(bot.config.discord.server_id);
          const channelbug = sizarTMserver.channels.cache.get(bot.config.discord.server_channel_report);
          let invite = await message.channel.createInvite({
              maxAge: 0, 
              maxUses: 5
          })
         const soal = new MessageEmbed()
            .setAuthor({
              name: `${message.author.username}`,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setTitle(`This Guy Have a Report, User ID: "${message.author.id}"`)
            .setColor('#2F3136')
            .addField(`> **User :**`,`<:reply_desgine:950701730675445790>**${message.author}**`,true)
            .addField(`> **Send :**` ,`<:reply_desgine:950701730675445790>${choice}`,true) 
            .addField(`> **Server :**`, `<:reply_desgine:950701730675445790>**${invite.url}**`,true)
            .setURL(invite.url)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter({
              text: `Requested By ${message.author.tag}`,
              iconURL: bot.user.displayAvatarURL({ dynamic: true })
            })
          channelbug.send({ embeds: [soal] }).then((msg)=> {
            msg.react(bot.emotes.report)
           })
           message.reply({
            content: bot.emotes.success + `| \`\`\`js\n ${bot.emotes.report}| Successfuly your report or bug message send to My Developers ${bot.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
            components: [NeedHelpButtons(bot)] 
           })     
    }
  }catch(e) {
    console.log(e)
    return message.reply({
            content: `${bot.emotes.error} **| Error, \`\`\`js\n${e}\`\`\`**`,
        }).then(message.member.send({
                content: `Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${bot.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
                components: [NeedHelpButtons(bot)] 
            })
        );
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
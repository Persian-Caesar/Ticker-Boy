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
    name: "setprefix",
    cooldown: 5,
    aliases: ["set-prefix","stp"],
    category: 'Setup 💻',
    usage: '[new-prefix]',
    description: "Change bot prefix in server",
   run: async function(bot, message, args, prefix, logsChannel){
        try {
            
            if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)){
            errorMessage(client, message, "my friend you are don't have this permissions: `\"MANAGE_GUILD\"`.")
            }
            var newPrefix = args.slice().join(' ')
            if (newPrefix && newPrefix.length > 7) { 
                   return errorMessage(bot, message, "this prefix `"+newPrefix+"` is to long.\nplease chose shorter one.")
            }
            if (newPrefix === bot.prefix || !newPrefix) {
                db.set(`guild_${message.guild.id}.prefix`, `${bot.prefix}`);
                message.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor({
                          name: message.guild.name,
                          iconURL: message.guild.iconURL({ dynamic: true })
                        })
                        .setColor(bot.colors.none)
                        .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTimestamp()
                        .setTitle(bot.emotes.setup + '| **Setup Prefix To Default**')
                        .setDescription("**bot prefix in this guild `"+message.guild.name+"` changed to default prefix: `"+bot.prefix+"help`**")
                    ]
                })
              if(logsChannel) logsChannel.send({
                 embeds: [new MessageEmbed()
                        .setAuthor({
                          name: message.guild.name,
                          iconURL: message.guild.iconURL({ dynamic: true })
                        })
                        .setTitle(bot.emotes.setup + '| **Setup Prefix To Default**')
                        .setColor(bot.colors.none)
                        .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
                        .setDescription("**bot prefix in this guild `"+message.guild.name+"` changed to default prefix: `"+bot.prefix+"help`**")
                        .setTimestamp()
                        .addFields(
                          {      
                          name: `**Requested By:**`, 
                          value: message.author.tag, 
                          inline: true
                          },
                          {
                          name: `**User ID:**`, 
                          value: message.author.id, 
                          inline: true
                          },
                          {
                          name: `**Target Channel:**`, 
                          value: `**${message.channel}**`, 
                          inline: true
                          },
                          {
                          name: `**Date:**`, 
                          value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
                          inline: true
                          },
                          {
                          name: `**Reason:**`, 
                          value: `\`\`\`js\n setup prefix\`\`\``, 
                          inline: true
                          }
                        )
                        .setFooter({
                          text: "Logs Information • "+bot.embed.footerText,
                          iconURL: bot.embed.footerIcon
                        })
                         ]
              });
            } else {
                db.set(`guild_${message.guild.id}.prefix`, `${newPrefix}`);
                message.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor({
                          name: `Requested Guild Name` + message.guild.name,
                          iconURL: message.guild.iconURL({ dynamic: true })
                        })
                        .setColor(bot.colors.none)
                        .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTimestamp()
                        .setTitle(bot.emotes.setup + '| **Setup Prefix**')
                        .setDescription("**bot prefix in this guild `"+message.guild.name+"` changed to this prefix: `"+newPrefix+"help`**")
                    ]
                })
              if(logsChannel) logsChannel.send({
                 embeds: [new MessageEmbed()
                        .setAuthor({
                          name: message.guild.name,
                          iconURL: message.guild.iconURL({ dynamic: true })
                        })
                        .setTitle(bot.emotes.setup + '| **Setup Prefix**')
                        .setColor(bot.colors.none)
                        .setThumbnail(message.author.displayAvatarURL({ format: "png", dynamic: true }))
                        .setDescription("**bot prefix in this guild `"+message.guild.name+"` changed to this prefix: `"+newPrefix+"help`**")
                        .setTimestamp()
                        .addFields(
                          {      
                          name: `**Requested By:**`, 
                          value: message.author.tag, 
                          inline: true
                          },
                          {
                          name: `**User ID:**`, 
                          value: message.author.id, 
                          inline: true
                          },
                          {
                          name: `**Target Channel:**`, 
                          value: `**${message.channel}**`, 
                          inline: true
                          },
                          {
                          name: `**Date:**`, 
                          value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
                          inline: true
                          },
                          {
                          name: `**Reason:**`, 
                          value: `\`\`\`js\n setup prefix\`\`\``, 
                          inline: true
                          }
                        )
                        .setFooter({
                          text: "Logs Information • "+bot.embed.footerText,
                          iconURL: bot.embed.footerIcon
                        })]
              });
        }
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
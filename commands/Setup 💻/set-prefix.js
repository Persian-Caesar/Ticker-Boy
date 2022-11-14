const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const db = require('quick.db');
module.exports = {
    name: "setprefix",
    cooldown: 5,
    aliases: ["set-prefix","stp"],
    category: 'Setup 💻',
    usage: '[new-prefix]',
    description: "Change bot prefix in server",
   run: async function(bot, message, args, prefix, logsChannel){
        try {
          let error_embed = new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle(bot.emotes.entry+'| **We Got An Error**')
            .setColor(bot.colors.none)
            .setFooter({
              text: `Error | ${bot.embed.footerText}`,
              iconURL: message.guild.iconURL({ dynamic: true })
            })
            
            if(!message.author.permissions.has(Permissions.FLAGS.MANAGE_GUILD)||!message.author.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            error_embed.setDescription("my friend you are don't have this permissions: `\"MANAGE_GUILD\" or \"ADMINISTRATOR\"`.")
              return message.reply({
                          embeds: [error_embed],
                          components: [new MessageActionRow()
                            .addComponents(new MessageButton()
                              .setStyle("DANGER")
                              .setLabel("Error")
                              .setEmoji("⚠️")
                              .setCustomId("error")
                              .setDisabled(true))
                          ]
              });
            }
            var newPrefix = args.slice().join(' ')
            if (!newPrefix) {
                db.set(`prefix_${message.guild.id}`, bot.prefix);
                message.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor({
                          name: `Requested Guild Name` + message.guild.name,
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
                          name: `Requested Guild Name` + message.guild.name,
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
                          text: "Logs Information | created by Mr.SIN RE#1528",
                          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
                        })]
              });
            } else if (newPrefix) {
                if (newPrefix.length > 7) { 
                    error_embed.setDescription("this prefix `"+newPrefix+"` is to long.\nplease chose shorter one.")
                    message.reply({
                        embeds: [error_embed],
                        components: [new MessageActionRow()
                          .addComponents(new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Error")
                            .setEmoji("⚠️")
                            .setCustomId("error")
                            .setDisabled(true))
                        ]
                    })
                }
                db.set(`prefix_${message.guild.id}`, newPrefix);
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
                          name: `Requested Guild Name` + message.guild.name,
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
                          text: "Logs Information | created by Mr.SIN RE#1528",
                          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
                        })]
              });
        }
       } catch (error) {
       return;
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
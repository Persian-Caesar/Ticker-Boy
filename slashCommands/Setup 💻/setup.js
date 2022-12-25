const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions
} = require('discord.js');
const db = require('quick.db');
module.exports = {
  name: 'setup',
  category: 'Setup 💻',
  cooldown: 1,
  userPermissions: [""],
  description: "setup system in target server.",
  botPermissions: [""],
  options: [{
      name: "logs",
      description: "setup ticket log channel.",
      type: "SUB_COMMAND",
      options: [{
         name: "channel",
         description: "select or mention ticket logs channel for setupping.",
         type: "CHANNEL",
         channelTypes: ["GUILD_TEXT"],
         required: true
      }]
   },{
    name: "admin",
    type: "SUB_COMMAND",
    description: "setup ticket admin role in guild",
    options: [{
         name: "role",
         description: "select or mention some roles for setup it to ticket admin.",
         type: "ROLE",
         required: true
      }],
   },{
    name: 'ticket',
    type: "SUB_COMMAND",
    description: "setup ticket system.",
    options: [{
    name: "channel",
    description: "Select a channel to setupping ticket system.",
    type: "CHANNEL",
    channelTypes: ["GUILD_TEXT"],
    required: false
    }]
  },{
    name: 'prefix',
    type: "SUB_COMMAND",
    description: "setup bot prefix in guild.",
    options: [{
      name: "prefix_text",
      description: "write server prefix in .",
      type: "STRING",
      required: true
    }],
  }],

  run: async (client, interaction) => {

let Sub = interaction.options.getSubcommand();
  switch (Sub) {
  case "prefix": {
    try {
          let logsChannel = interaction.guild.channels.cache.find(c => c.id === db.get(`modlog_${interaction.guild.id}`));
          let newPrefix = interaction.options.getString('prefix_text')  
          let error_embed = new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })
            
            if(!interaction.user.permissions.has(Permissions.FLAGS.MANAGE_GUILD)){
            error_embed.setDescription("my friend you are don't have this permissions: `\"MANAGE_GUILD\" or \"ADMINISTRATOR\"`.")
              return interaction.reply({
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
            if (newPrefix === client.prefix) {
                db.set(`prefix_${interaction.guild.id}`, `${client.prefix}`);
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor({
                          name: `Requested Guild Name` + interaction.guild.name,
                          iconURL: interaction.guild.iconURL({ dynamic: true })
                        })
                        .setColor(client.colors.none)
                        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTimestamp()
                        .setTitle(client.emotes.setup + '| **Setup Prefix To Default**')
                        .setDescription("**bot prefix in this guild `"+interaction.guild.name+"` changed to default prefix: `"+client.prefix+"help`**")
                    ]
                })
              if(logsChannel) logsChannel.send({
                 embeds: [new MessageEmbed()
                        .setAuthor({
                          name: `Requested Guild Name` + interaction.guild.name,
                          iconURL: interaction.guild.iconURL({ dynamic: true })
                        })
                        .setTitle(client.emotes.setup + '| **Setup Prefix To Default**')
                        .setColor(client.colors.none)
                        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setDescription("**bot prefix in this guild `"+interaction.guild.name+"` changed to default prefix: `"+client.prefix+"help`**")
                        .setTimestamp()
                        .addFields(
                          {      
                          name: `**Requested By:**`, 
                          value: interaction.user.tag, 
                          inline: true
                          },
                          {
                          name: `**User ID:**`, 
                          value: interaction.user.id, 
                          inline: true
                          },
                          {
                          name: `**Target Channel:**`, 
                          value: `**${interaction.channel}**`, 
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
                          text: "Logs Information • "+client.embed.footerText,
                          iconURL: client.embed.footerIcon
                        })
                 ]
              });
            } else {
                if (newPrefix.length > 7) { 
                    error_embed.setDescription("this prefix `"+newPrefix+"` is to long.\nplease chose shorter one.")
                    interaction.reply({
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
                db.set(`prefix_${interaction.guild.id}`, `${newPrefix}`);
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor({
                          name: `Requested Guild Name` + interaction.guild.name,
                          iconURL: interaction.guild.iconURL({ dynamic: true })
                        })
                        .setColor(client.colors.none)
                        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTimestamp()
                        .setTitle(client.emotes.setup + '| **Setup Prefix**')
                        .setDescription("**bot prefix in this guild `"+interaction.guild.name+"` changed to this prefix: `"+newPrefix+"help`**")
                    ]
                })
              if(logsChannel) logsChannel.send({
                 embeds: [new MessageEmbed()
                        .setAuthor({
                          name: `Requested Guild Name` + interaction.guild.name,
                          iconURL: interaction.guild.iconURL({ dynamic: true })
                        })
                        .setTitle(client.emotes.setup + '| **Setup Prefix**')
                        .setColor(client.colors.none)
                        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setDescription("**bot prefix in this guild `"+interaction.guild.name+"` changed to this prefix: `"+newPrefix+"help`**")
                        .setTimestamp()
                        .addFields(
                          {      
                          name: `**Requested By:**`, 
                          value: interaction.user.tag, 
                          inline: true
                          },
                          {
                          name: `**User ID:**`, 
                          value: interaction.user.id, 
                          inline: true
                          },
                          {
                          name: `**Target Channel:**`, 
                          value: `**${interaction.channel}**`, 
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
                          text: "Logs Information • "+client.embed.footerText,
                          iconURL: client.embed.footerIcon
                        })]
              });
        }
       } catch (error) {
       return;
      }
  }break;
  case "ticket": {

  let channel =  interaction.options.getChannel("channel")||interaction.channel;
  if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) 
  return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))], 
            ephemeral: true,
         })      
  interaction.reply({
    embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Menu Is Successfuly Setuped**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup server ticket menu in ${channel} is successfully setuped.**`)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })
            ],
    ephemeral: true,
  })
    
  channel.send({
        embeds: [new MessageEmbed()
                   .setTitle(`${client.emotes.ticket}| Ticket System`)
                   .addField(`${client.emotes.reason}Description:`,`Do you need help ?? we are here!! This channel is for making tickets and communicating with the admin team. To make a ticket, select your reason from the menu below to address your problem. For guidance, asking questions, reporting members, etc., you can open a ticket by Be in touch with the admin team. Also, after clicking the button below, select the reason for opening your ticket correctly, otherwise your ticket will not be processed. All tickets will be saved, so please stop opening tickets without any reason and in violation of server rules. Avoid tickets, otherwise you will be banned from making tickets`)
                   .setColor(client.colors.none)
          ],
         components: [new MessageActionRow()
          .addComponents([new MessageButton()
            .setCustomId('create_ticket')
            .setEmoji(client.emotes.ticket)
            .setLabel("Create Ticket")
            .setStyle('SUCCESS')]),new MessageActionRow()
            .addComponents([new MessageButton()
              .setStyle("LINK")
              .setEmoji(client.emotes.support)
              .setLabel("Support")
              .setURL(client.config.discord.server_support)
          ])
         ] 
  })
  }break;
  case "logs": {
                if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))], 
    ephemeral: true,
          })      
  let channel =  interaction.options.getChannel("channel")
if(interaction.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${interaction.guild.id}`))){
     return interaction.reply({
           ephemeral: true,
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`**My Friend, you just have a logs channel befor it to ${interaction.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${interaction.guild.id}`))}.**`)
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })]
       })
}else {
    interaction.reply({
    embeds: [new MessageEmbed().setTitle('✅| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`process is successfuly.\n I just setup your ticket logs channel to ${channel}.`).setFooter({text: `Successfuly • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.set(`modlog_${interaction.guild.id}`, channel.id)
  channel.send({
    embeds: [new MessageEmbed().setColor(client.colors.none).setDescription(`just now here is ticket logs channel for send members tickets information setupped to ${channel}.`).setTitle('✅| ** Process Is Successfuly**').setFooter({text: `Logs Setuped • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))]
  })
}
  }break;
  case "admin": {
  let role = interaction.options.getRole("role")
                if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_ROLES\" \n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))], 
    ephemeral: true,
          })      
if(interaction.guild.roles.cache.find(c => c.id === db.fetch(`TicketAdminRole_${interaction.guild.id}`))) return interaction.reply({
           ephemeral: true,
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`**My Friend, you just have a setup your ticket mod roles befor it to ${interaction.guild.roles.cache.find(c => c.id === db.fetch(`TicketAdminRole_${interaction.guild.id}`))}.**`)
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })]
       })

    interaction.reply({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`\n I just setup your ticket admin role to ${role}.`).setFooter({text: `Successfuly • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.set(`TicketAdminRole_${interaction.guild.id}`, role.id)
    if(db.fetch(`modlog_${interaction.guild.id}`)){
  interaction.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${interaction.guild.id}`)).send({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.none).setDescription(`I just setup ticket admin role to ${role} in this guild.`).setFooter({text: `Logs Setuped • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))]
  })
    }

  }break;
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
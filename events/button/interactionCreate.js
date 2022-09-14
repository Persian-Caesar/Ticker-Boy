const { 
  MessageSelectMenu,
  MessageEmbed, 
  MessageButton, 
  MessageActionRow,
  Modal,
  Permissions,
  TextInputComponent
} = require("discord.js");
const db = require('quick.db');
const clc = require("cli-color");
const ms = require('ms')
module.exports = async (client, interaction) => {
    if(!interaction.isButton())return;    
  //ticket
let logsChannel = interaction.guild.channels.cache.find(c => c.id === db.get(`modlog_${interaction.guild.id}`));
let ticketName = db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`);
  if(interaction.customId === "cancel"){
        interaction.update({
                         embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.x + '| **Canceled The Process**')
                    .setColor(client.colors.none)
                    .setDescription(`You have canceled your request to work some thing and now the work have bin canceled for you. Good luck and victory.`)                    
                    .setFooter({
                      text: "Canceled | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                   components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Canceled")
                                       .setCustomId("dont_close")
                   .setEmoji(client.emotes.x)
                   .setDisabled(true)
                   )]
      
    })
  }
  if(interaction.customId === "dont_do"){
    interaction.update({
          embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.x + '| **Canceled The Making A Ticket**')
                    .setColor(client.colors.none)
                    .addField(`Language: PER:flag_ir:`,`شما درخواست ساخت تیکت خود را لغو کردید و اکنون دیگر تیکتی برای شما ساخته نمیشود موفق و پیروز باشید.🤗`)
                    .addField(`Language: EN:flag_us:`,`You have canceled your request to make a ticket and now a ticket can no longer be made for you. Good luck and victory.🤗`)                    
                    .setFooter({
                      text: "Canceled | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
          components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Canceled")
                   .setCustomId("dont_do")
                   .setEmoji(client.emotes.x)
                   .setDisabled(true)
          )]
      
    })
  }
if (interaction.customId == 'create') {
    interaction.update({
          embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.ticket + '| **Create Ticket**')
                    .setColor(client.colors.none)
                    .addField(`Language: PER:flag_ir:`,`دوست عزیز شما درخواستی برای ساخت تیکت را داده اید. اگر موافق ساخت تیکت خود هستید در زیر پیام به لیست کلیک کنید و دلیل ساخت تیکت خود را تعیین کنید ولی در صورت مخالف بودن به دکمه قرمز رنگ کلیک کنید، موفق و پیروز باشید.😎`)
                    .addField(`Language: EN:flag_us:`,`Dear friend, you have made a request to make a ticket. If you agree to make your ticket, click on the menu below the message and specify the reason for making your ticket, but if you disagree, click on the red button, be successful and victorious.😎`)                    
                    .setFooter({
                      text: "Create Ticket | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
         components: [new MessageActionRow()
          .addComponents([new MessageSelectMenu()
            .setPlaceholder(`${client.emotes.ticket}| Select Your Ticket Reason`)
            .setOptions([
              {
                label: 'Need Help',
                value: 'need_help',
                emoji: client.emotes.help,
              },
              {
                label: 'Report Bot/Admin/Member',
                value: 'report_bam',
                emoji: client.emotes.report
              },
              {
                label: 'Exchange',
                value: 'exchange',
                emoji: client.emotes.exchange
              },
              {
                label: 'Admin Program',
                value: 'admin',
                emoji: client.emotes.admin
              }
            ])
            .setMinValues(1)
            .setMaxValues(1)
            .setCustomId("ticket_menu")  
          ]),new MessageActionRow()
            .addComponents([new MessageButton()
              .setStyle("DANGER")
              .setLabel("Canceled")
              .setCustomId("dont_do")
              .setEmoji(client.emotes.x)],[new MessageButton()
              .setStyle("LINK")
              .setEmoji(client.emotes.support)
              .setLabel("Support")
              .setURL("https://dsc.gg/sizar-team")
          ])
         ]
    })
}
       if (interaction.customId == 'create_need_help_ticket') {
 if (!interaction.guild.channels.cache.find(x => x.name === ticketName)) {
           interaction.guild.channels.create(`${client.emotes.help}︱ticket-${interaction.user.tag}`, {
               permissionOverwrites: [{
                       id: interaction.user.id,
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   },
                   {
                       id: db.get(`TicketAdminRole_${interaction.guild.id}`),
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   }, 
                   {
                       id: interaction.guild.roles.everyone,
                       deny: ["VIEW_CHANNEL"]
                   }
               ],
               type: 'GUILD_TEXT',
               reason: `create a Support And Help ticket`,
               topic: `\n**ID:** ${interaction.user.id} \n**Tag:** ${interaction.user.tag} \n**Reason:** \`Support And Help\`\n**Use It For Close Ticket:** \`/ticket close\``

           }).then(async(channel)=> {
           db.set(`ticketName_${interaction.user.id}_${interaction.guild.id}`, channel.name);
           db.set(`TicketControl_${channel.id}`, interaction.user.id);
               channel.send({
                   content:  `<@${interaction.user.id}>`,
                   embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Process Is Successfuly**')
                    .setColor(client.colors.none)
                    .addField(`Language: PER:flag_ir:`,`
سلام به چنل **ساپورت و کمک رسانی** (تیکت) خوش اومدید لطفا دلیل باز کردن تیکتتان را به صورت خلاصه توضیح دهید تا ادمین های سرور در سریع ترین زمان ممگن به تیکت شما رسیدگی کنند (لطفا از منشن کردن ادمین ها خودداری کنید)`)
                    .addField(`Language: EN:flag_us:`,`
Hello to the **support and help** channel (ticket), please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible (please refrain from mentioning admins)`)                    
                    .addField(`**Reason:**`, `\`\`\`js\n Support And Help\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                   components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("SECONDARY")
                   .setLabel("Close Ticket")
                   .setEmoji(client.emotes.close)
                   .setCustomId("configTicket"))]
               }).then(msg =>{ 
           channel.messages.pin(msg.id)
db.set(`TicketMSG_${interaction.channel.id}_${interaction.guild.id}`, msg.id)})
  let message = {
    components: [new MessageActionRow()
             .addComponents(new MessageButton()
             .setStyle("SUCCESS")
             .setLabel("Ticket Created")
             .setEmoji(client.emotes.ticket)
             .setCustomId("create_need_help_ticket")
             .setDisabled(true)
             )],
     embeds: [new MessageEmbed()
      .setAuthor({
        name: `Requested Guild Name` + interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true })
      })
      .setTitle(client.emotes.success + '| **Your Ticket Is Ready**')
      .setColor(client.colors.none)
      .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
              .addField(`Language: PER:flag_ir:`,`
چنل تیکت شما ساخته شد و اکنون آماده است.\n لطفا منتظر مدیرتور ها ویا ادمین ها باشید با آنلا صحبت کنید`)
              .addField(`Language: EN:flag_us:`,`
your ticket channel created and ready.\nplease wait the moderators or admins to speek there.`)                    
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
        value: `**${channel}**`, 
        inline: true
        },
        {
        name: `**Date:**`, 
        value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
        inline: true
        },
        {
        name: `**Reason:**`, 
        value: `\`\`\`js\n create a Support And Help ticket\`\`\``, 
        inline: true
        }
      )
      .setFooter({
        text: "Ticket Information | created by Mr.SIN RE#1528",
        iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
      })]
 }
      interaction.channel.messages.fetch(db.get(`CreateTicketMSG_${interaction.guild.id}_${interaction.user.id}`)).then(msg =>{
        msg.update(message)
      })
       interaction.update(message)
   if(logsChannel) return logsChannel.send({
       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.help + '| **Request To Create Need Help Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`one ticket channel will be created and user stay wait the moderators or admins to talk there.`)
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
          value: `**${channel}**`, 
          inline: true
          },
          {
          name: `**Date:**`, 
          value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
          inline: true
          },
          {
          name: `**Reason:**`, 
          value: `\`\`\`js\n Support And Help\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
       });
           });
       }else{
   return interaction.update({
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.username,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${interaction.guild.channels.cache.find(x => x.name === ticketName)}**`)
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]       
        })
       }
      
       }else if (interaction.customId == 'create_exchange') {
 if (!interaction.guild.channels.cache.find(x => x.name === ticketName)) {
           interaction.guild.channels.create(`${client.emotes.exchange}︱ticket-${interaction.user.tag}`, {
               permissionOverwrites: [{
                       id: interaction.user.id,
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   },
                   {
                       id: db.get(`TicketAdminRole_${interaction.guild.id}`),
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   }, 
                   {
                       id: interaction.guild.roles.everyone,
                       deny: ["VIEW_CHANNEL"]
                   }
               ],
               type: 'GUILD_TEXT',
               reason: `create a Exchange ticket`,
               topic: `\n**ID:** ${interaction.user.id} \n**Tag:** ${interaction.user.tag} \n**Reason:** \`Exchange\`\n**Use It For Close Ticket:** \`/ticket close\``

           }).then(async(channel)=> {
           db.set(`ticketName_${interaction.user.id}_${interaction.guild.id}`, channel.name);
           db.set(`TicketControl_${channel.id}`, interaction.user.id);
               channel.send({
                   content:  `<@${interaction.user.id}>`,
                   embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Process Is Successfuly**')
                    .setColor(client.colors.none)
                    .addField(`Language: PER:flag_ir:`,`سلام به چنل **اکسچنج و تبادل** (تیکت) خوش اومدید لطفا دلیل باز کردن تیکتتان را به صورت خلاصه توضیح دهید تا ادمین های سرور در سریع ترین زمان ممکن به تیکت شما رسیدگی کنند (لطفا از منشن ادمین ها خودداری کنید)`)
                    .addField(`Language: EN:flag_us:`,`Hello to the **exchange** channel (ticket), please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible (please refrain from mentioning admins)`)                    
                    .addField(`**Reason:**`, `\`\`\`js\n Exchange\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                   components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("SECONDARY")
                   .setLabel("Close Ticket")
                   .setEmoji(client.emotes.close)
                   .setCustomId("configTicket"))]
               }).then(msg =>{ 
           channel.messages.pin(msg.id)
db.set(`TicketMSG_${interaction.channel.id}_${interaction.guild.id}`, msg.id)})
      let message = {
        components: [new MessageActionRow()
                 .addComponents(new MessageButton()
                 .setStyle("SUCCESS")
                 .setLabel("Ticket Created")
                 .setEmoji(client.emotes.ticket)
                 .setCustomId("create_exchange")
                 .setDisabled(true)
                 )],
         embeds: [new MessageEmbed()
          .setAuthor({
            name: `Requested Guild Name` + interaction.guild.name,
            iconURL: interaction.guild.iconURL({ dynamic: true })
          })
          .setTitle(client.emotes.success + '| **Your Ticket Is Ready**')
          .setColor(client.colors.none)
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                  .addField(`Language: PER:flag_ir:`,`
چنل تیکت شما ساخته شد و اکنون آماده است.\n لطفا منتظر مدیرتور ها ویا ادمین ها باشید با آنلا صحبت کنید`)
                  .addField(`Language: EN:flag_us:`,`
your ticket channel created and ready.\nplease wait the moderators or admins to speek there.`)                    
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
            value: `**${channel}**`, 
            inline: true
            },
            {
            name: `**Date:**`, 
            value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
            inline: true
            },
            {
            name: `**Reason:**`, 
            value: `\`\`\`js\n create a Exchange ticket\`\`\``, 
            inline: true
            }
          )
          .setFooter({
            text: "Ticket Information | created by Mr.SIN RE#1528",
            iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
          })]
     }
      interaction.channel.messages.fetch(db.get(`CreateTicketMSG_${interaction.guild.id}_${interaction.user.id}`)).then(msg =>{
        msg.edit(message)
      })
      interaction.update(message)
   if(logsChannel) return logsChannel.send({
       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.exchange + '| **Request To Create Exchange Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`one ticket channel will be created and user stay wait the moderators or admins to talk there.`)
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
          value: `**${channel}**`, 
          inline: true
          },
          {
          name: `**Date:**`, 
          value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
          inline: true
          },
          {
          name: `**Reason:**`, 
          value: `\`\`\`js\n Exchange\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
       });
           });
       }else{
   return interaction.update({
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.username,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${interaction.guild.channels.cache.find(x => x.name === ticketName)}**`)
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]       
        })
       }
      
       } if (interaction.customId == 'create_report_bam') {
 if (!interaction.guild.channels.cache.find(x => x.name === ticketName)) {
           interaction.guild.channels.create(`${client.emotes.report}︱ticket-${interaction.user.tag}`, {
               permissionOverwrites: [{
                       id: interaction.user.id,
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   },
                   {
                       id: db.get(`TicketAdminRole_${interaction.guild.id}`),
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   }, 
                   {
                       id: interaction.guild.roles.everyone,
                       deny: ["VIEW_CHANNEL"]
                   }
               ],
               type: 'GUILD_TEXT',
               reason: `create a Report ticket`,
               topic: `\n**ID:** ${interaction.user.id} \n**Tag:** ${interaction.user.tag} \n**Reason:** \`Report\`\n**Use It For Close Ticket:** \`/ticket close\``

           }).then(async(channel)=> {
           db.set(`ticketName_${interaction.user.id}_${interaction.guild.id}`, channel.name);
           db.set(`TicketControl_${channel.id}`, interaction.user.id);
               channel.send({
                   content:  `<@${interaction.user.id}>`,
                   embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Process Is Successfuly**')
                    .setColor(client.colors.none)
                    .addField(`Language: PER:flag_ir:`,`
سلام به چنل **گزارش ادمین ، بات یا ممبر ها** (تیکت) خوش اومدید لطفا دلیل باز کردن تیکتتان را به صورت خلاصه توضیح دهید تا ادمین های سرور در سریع ترین زمان ممگن به تیکت شما رسیدگی کنند (لطفا از منشن کردن ادمین ها خودداری کنید)`)
                    .addField(`Language: EN:flag_us:`,`
Hello to the **report admins, bots or members** channel (ticket), please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible (please refrain from mentioning admins)`)                    
                    .addField(`**Reason:**`, `\`\`\`js\n Report\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                   components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("SECONDARY")
                   .setLabel("Close Ticket")
                   .setEmoji(client.emotes.close)
                   .setCustomId("configTicket"))]
               }).then(msg =>{ 
           channel.messages.pin(msg.id)
db.set(`TicketMSG_${interaction.channel.id}_${interaction.guild.id}`, msg.id)})
      let message = {
        components: [new MessageActionRow()
                 .addComponents(new MessageButton()
                 .setStyle("SUCCESS")
                 .setLabel("Ticket Created")
                 .setEmoji(client.emotes.ticket)
                 .setCustomId("create_report_bam")
                 .setDisabled(true)
                 )],
         embeds: [new MessageEmbed()
          .setAuthor({
            name: `Requested Guild Name` + interaction.guild.name,
            iconURL: interaction.guild.iconURL({ dynamic: true })
          })
          .setTitle(client.emotes.success + '| **Your Ticket Is Ready**')
          .setColor(client.colors.none)
          .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                  .addField(`Language: PER:flag_ir:`,`
چنل تیکت شما ساخته شد و اکنون آماده است.\n لطفا منتظر مدیرتور ها ویا ادمین ها باشید با آنلا صحبت کنید`)
                  .addField(`Language: EN:flag_us:`,`
your ticket channel created and ready.\nplease wait the moderators or admins to speek there.`)                    
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
            value: `**${channel}**`, 
            inline: true
            },
            {
            name: `**Date:**`, 
            value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
            inline: true
            },
            {
            name: `**Reason:**`, 
            value: `\`\`\`js\n create a Report ticket\`\`\``, 
            inline: true
            }
          )
          .setFooter({
            text: "Ticket Information | created by Mr.SIN RE#1528",
            iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
          })]
     }
      interaction.channel.messages.fetch(db.get(`CreateTicketMSG_${interaction.guild.id}_${interaction.user.id}`)).then(msg =>{
        msg.edit(message)
      })
      interaction.update(message)
   if(logsChannel) return logsChannel.send({
       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.report + '| **Request To Create Report Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`one ticket channel will be created and user stay wait the moderators or admins to talk there.`)
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
          value: `**${channel}**`, 
          inline: true
          },
          {
          name: `**Date:**`, 
          value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
          inline: true
          },
          {
          name: `**Reason:**`, 
          value: `\`\`\`js\n Report\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
       });
           });
       }else{
   return interaction.update({
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.username,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${interaction.guild.channels.cache.find(x => x.name === ticketName)}**`)
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]       
        })
       }
      
       } else if (interaction.customId == 'create_admin') {
 if (!interaction.guild.channels.cache.find(x => x.name === ticketName)) {
           interaction.guild.channels.create(`${client.emotes.admin}︱ticket-${interaction.user.tag}`, {
               permissionOverwrites: [{
                       id: interaction.user.id,
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   },
                   {
                       id: db.get(`TicketAdminRole_${interaction.guild.id}`),
                       allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                   }, 
                   {
                       id: interaction.guild.roles.everyone,
                       deny: ["VIEW_CHANNEL"]
                   }
               ],
               type: 'GUILD_TEXT',
               reason: `create a Admin Program ticket`,
               topic: `\n**ID:** ${interaction.user.id} \n**Tag:** ${interaction.user.tag} \n**Reason:** \`Admin Program\`\n**Use It For Close Ticket:** \`/ticket close\``

           }).then(async(channel)=> {
           db.set(`ticketName_${interaction.user.id}_${interaction.guild.id}`, channel.name);
           db.set(`TicketControl_${channel.id}`, interaction.user.id);
               channel.send({
                   content:  `<@${interaction.user.id}>`,
                   embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Process Is Successfuly**')
                    .setColor(client.colors.none)
                    .addField(`Language: PER:flag_ir:`,`
سلام به چنل **ثبت نام برای ادمینی** (تیکت) خوش اومدید لطفا دلیل باز کردن تیکتتان را به صورت خلاصه توضیح دهید تا ادمین های سرور در سریع ترین زمان ممگن به تیکت شما رسیدگی کنند (لطفا از منشن کردن ادمین ها خودداری کنید)`)
                    .addField(`Language: EN:flag_us:`,`
Hello to the **register for admin** channel (ticket), please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible (please refrain from mentioning admins)`)                    
                    .addField(`**Reason:**`, `\`\`\`js\n Admin Program\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                   components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("SECONDARY")
                   .setLabel("Close Ticket")
                   .setEmoji(client.emotes.close)
                   .setCustomId("configTicket"))]
               }).then(msg =>{ 
           channel.messages.pin(msg.id)
db.set(`TicketMSG_${interaction.channel.id}_${interaction.guild.id}`, msg.id)})
      let message = {
          components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("SUCCESS")
                   .setLabel("Ticket Created")
                   .setEmoji(client.emotes.ticket)
                   .setCustomId("create_report_bam")
                   .setDisabled(true)
                   )],
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested Guild Name` + interaction.guild.name,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })
            .setTitle(client.emotes.success + '| **Your Ticket Is Ready**')
            .setColor(client.colors.none)
            .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .addField(`Language: PER:flag_ir:`,`
چنل تیکت شما ساخته شد و اکنون آماده است.\n لطفا منتظر مدیرتور ها ویا ادمین ها باشید با آنلا صحبت کنید`)
                    .addField(`Language: EN:flag_us:`,`
your ticket channel created and ready.\nplease wait the moderators or admins to speek there.`)                    
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
              value: `**${channel}**`, 
              inline: true
              },
              {
              name: `**Date:**`, 
              value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
              inline: true
              },
              {
              name: `**Reason:**`, 
              value: `\`\`\`js\n create a Admin Program ticket\`\`\``, 
              inline: true
              }
            )
            .setFooter({
              text: "Ticket Information | created by Mr.SIN RE#1528",
              iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
            })]
       }
      interaction.channel.messages.fetch(db.get(`CreateTicketMSG_${interaction.guild.id}_${interaction.user.id}`)).then(msg =>{
        msg.edit(message)
      })
      interaction.update(message)
   if(logsChannel) return logsChannel.send({
       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.admin + '| **Request To Create Admin Program Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`one ticket channel will be created and user stay wait the moderators or admins to talk there.`)
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
          value: `**${channel}**`, 
          inline: true
          },
          {
          name: `**Date:**`, 
          value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
          inline: true
          },
          {
          name: `**Reason:**`, 
          value: `\`\`\`js\n Admin Program\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
       });
           });
       }else{
   return interaction.update({
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.username,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${interaction.guild.channels.cache.find(x => x.name === ticketName)}**`)
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]       
        })
       }
      
       } else if (interaction.customId == 'configTicket') {
          let message = {
            components: [new MessageActionRow()
                 .addComponents(new MessageButton()
                 .setStyle("SECONDARY")
                 .setLabel("Close Ticket")
                 .setEmoji(client.emotes.close)
                 .setCustomId("configTicket")
                 .setDisabled(true))
                  .addComponents(
                     new MessageButton()
                       .setStyle("SUCCESS")
                       .setEmoji(client.emotes.open)
                       .setLabel("Open Ticket")
                       .setCustomId("reopenTicket")
                   )
                   .addComponents(
                     new MessageButton()
                       .setStyle("DANGER")
                       .setEmoji(client.emotes.trash)
                       .setLabel("Delete Ticket")
                       .setCustomId("deleteTicket")
                   )],
         embeds: [new MessageEmbed()
                  .setAuthor({
                    name: `Requested by ` + interaction.user.username,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                  })
                  .setTitle(client.emotes.close + '| **Ticket Is Successfuly Closed**')
                  .setColor(client.colors.none)
                  .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} now have bin Closed By <@!${interaction.user.id}> .**`)
                  .addField(`**Reason:**`, `\`\`\`js\n close the ticket\`\`\``)
                  .setFooter({
                    text: "Successfuly | created by Mr.SIN RE#1528",
                    iconURL: interaction.guild.iconURL({ dynamic: true })
                  })]
          }
          let ticket_message = db.get(`TicketMSG_${interaction.channel.id}_${interaction.guild.id}`);
          interaction.update(message)
          if(ticket_message)
          interaction.channel.messages.fetch(ticket_message).then(msg =>{
            msg.edit(message)
          })
          interaction.channel.send({
           embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.close + '| **Ticket Is Successfuly Closed**')
                    .setColor(client.colors.none)
                    .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} now have bin Closed By <@!${interaction.user.id}> .**`)
                    .addField(`**Reason:**`, `\`\`\`js\n close the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
               components: [
                   new MessageActionRow()
                     .addComponents(new MessageButton()
                   .setStyle("SECONDARY")
                   .setLabel("Close Ticket")
                   .setEmoji(client.emotes.close)
                   .setCustomId("configTicket")
                   .setDisabled(true))
                 ]
          })
          interaction.channel.permissionOverwrites.set([{
                   id: db.fetch(`TicketControl_${interaction.channel.id}`),
                   deny: ['SEND_MESSAGES'],
                   deny: ['VIEW_CHANNEL']
               },
               {
                   id: db.fetch(`TicketAdminRole_${interaction.guild.id}`),
                   allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
               }, {
                   id: interaction.guild.roles.everyone,
                   deny: ["VIEW_CHANNEL"]
               }
          ]);
       if(logsChannel) logsChannel.send({
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.close + '| **Request For Close Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`this guy ${interaction.user.tag} requested to close this guy ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket and I close the ticket for him.`)
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
          value: `\`\`\`js\n close the ticket\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
       });
         
       } else if (interaction.customId == "deleteTicket") {
          let message = {
          components: [
                new MessageActionRow()
                  .addComponents(
                    new MessageButton()
                      .setStyle("DANGER")
                      .setEmoji(client.emotes.trash)
                      .setLabel("Delete Ticket")
                      .setCustomId("deleteTicket")
                      .setDisabled(true)
                  )
              ],
              embeds: [new MessageEmbed()
                 .setAuthor({
                   name: `Requested by ` + interaction.user.username,
                   iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                 })
                 .setTitle(client.emotes.trash + '| **Ticket Is Successfuly Deleted**')
                 .setColor(client.colors.none)
                 .setDescription(`this user ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket have bin deleted by ${interaction.user} in **<t:${(Date.parse(new Date()) / 1000)}:R>**.\nplease wait.`)
                 .addField(`**Reason:**`, `\`\`\`js\n delete the ticket\`\`\``)
                 .setFooter({
                   text: "Successfuly | created by Mr.SIN RE#1528",
                   iconURL: interaction.guild.iconURL({ dynamic: true })
                 })],
          }
          if(!interaction.member.roles.cache.has(db.get(`TicketAdminRole_${interaction.guild.id}`))&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])&&!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return interaction.reply({        
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]       
          })
          interaction.channel.send({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.trash + '| **Ticket Is Successfuly Deleted**')
                    .setColor(client.colors.none)
                    .setDescription(`this user ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket have bin deleted by ${interaction.user} in **<t:${(Date.parse(new Date()) / 1000)}:R>**.\nplease wait.`)
                    .addField(`**Reason:**`, `\`\`\`js\n delete the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
             components: [
                   new MessageActionRow()
                     .addComponents((
                       new MessageButton()
                         .setStyle("DANGER")
                         .setEmoji(client.emotes.trash)
                         .setLabel("Delete Ticket")
                         .setCustomId("deleteTicket")
                         .setDisabled(true))
                     )
                 ]
          });
          interaction.update(message)
          let ticket_message = db.get(`TicketMSG_${interaction.channel.id}_${interaction.guild.id}`);

          if(ticket_message)
           interaction.channel.messages.fetch(ticket_message).then(msg =>{
             msg.edit(message)
           })
       setTimeout(() => {
               interaction.channel.delete();
           }, 1000 * 5);
       db.delete(`ticketName_${interaction.user.id}_${interaction.guild.id}`);
       db.delete(`CreateTicketMSG_${interaction.guild.id}_${interaction.user.id}`)
       db.delete(`TicketMSG_${interaction.channel.id}_${interaction.guild.id}`)
   if(logsChannel) logsChannel.send({
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.trash + '| **Request To Delete The Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`this guy ${interaction.user.tag} requested to delete this guy ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket and I delete the ticket for him.`)
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
          value: `\`\`\`js\n delete the ticket\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
                   });
           db.delete(`TicketControl_${interaction.channel.id}`);
       } else if (interaction.customId == "reopenTicket") {
          if(!interaction.member.roles.cache.has(db.get(`TicketAdminRole_${interaction.guild.id}`))&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])&&!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return interaction.reply({        
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.username,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
            .setFooter({
              text: "Error | created by Mr.SIN RE#1528",
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]       
          })
           interaction.update({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.open + '| **Ticket Is Successfuly Open**')
                    .setColor(client.colors.none)
                    .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} now have bin user ticket have bin Opened by <@!${interaction.user.id}> .**`)
                    .addField(`**Reason:**`, `\`\`\`js\n open the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                components: [
                   new MessageActionRow()
                     .addComponents(
                       new MessageButton()
                         .setStyle("SUCCESS")
                         .setEmoji(client.emotes.open)
                         .setLabel("Open Ticket")
                         .setCustomId("reopenTicket").setDisabled(true)
                     )
                     .addComponents((
                       new MessageButton()
                         .setStyle("DANGER")
                         .setEmoji(client.emotes.trash)
                         .setLabel("Delete Ticket")
                         .setCustomId("deleteTicket"))
                     )
                    .addComponents(new MessageButton()
                   .setStyle("SECONDARY")
                   .setLabel("Close Ticket")
                   .setEmoji(client.emotes.close)
                   .setCustomId("configTicket")
                   )
                 ]
           });
             interaction.channel.send({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.open + '| **Ticket Is Successfuly Open**')
                    .setColor(client.colors.none)
                    .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} now have bin user ticket have bin Opened by <@!${interaction.user.id}> .**`)
                    .addField(`**Reason:**`, `\`\`\`js\n open the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                components: [
                   new MessageActionRow()
                     .addComponents(
                       new MessageButton()
                         .setStyle("SUCCESS")
                         .setEmoji(client.emotes.open)
                         .setLabel("Open Ticket")
                         .setCustomId("reopenTicket").setDisabled(true)
                     )
                 ]
           });
           interaction.channel.permissionOverwrites.set([{
                   id: db.fetch(`TicketControl_${interaction.channel.id}`),
                   allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
               },
               {
                   id: db.fetch(`TicketAdminRole_${interaction.guild.id}`),
                   allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
               }, {
                   id: interaction.guild.roles.everyone,
                   deny: ["VIEW_CHANNEL"]
               }
           ]);
         if(logsChannel) logsChannel.send({  
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.open + '| **Request To Open The Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`this guy ${interaction.user.tag} requested to open this guy ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket and I open the ticket for him.`)
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
          value: `\`\`\`js\n open the ticket\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
                   });
       } else if (interaction.customId == 'renameTicketTrue') {
                interaction.channel.setName(db.fetch(`RenameTicket_${interaction.channel.id}`));
  db.set(`ticketName_${interaction.user.id}_${interaction.guild.id}`, db.fetch(`RenameTicket_${interaction.channel.id}`))
                interaction.update({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.name,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.rename + '| **Ticket Is Successfuly Reanmed**')
                    .setColor(client.colors.none)
                    .setDescription(`**this ticket name have bin changed successfuly${client.emotes.success}.\nthis ticket name is changed to:\`${db.fetch(`RenameTicket_${interaction.channel.id}`)}\`**`)
                    .addField(`**Reason:**`, `\`\`\`js\n rename the last ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
         components: [
          new MessageActionRow()
         .addComponents(
          [new MessageButton()
           .setStyle("SUCCESS")
           .setEmoji(client.emotes.rename)
           .setLabel("Change Name")
           .setCustomId("renameTicketTrue")
           .setDisabled(true)
         ])]
                })

         if(logsChannel) logsChannel.send({  
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.rename + '| **Request To Rename The Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`this user ${interaction.user.tag} request to rename the this user ticket ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} and ticket have bin renamed to \`${db.fetch(`RenameTicket_${interaction.channel.id}`)}\` by me.`)
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
          value: `\`\`\`js\n rename the last ticket\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
                   });
       } else if(interaction.customId == "addmemberTicket"){

                    txt = '<@' + db.get(`TicketControlNewMember_${interaction.channel.id}`) + '>'
           interaction.channel.permissionOverwrites.set([{
                   id: db.fetch(`TicketControl_${interaction.channel.id}`),
                   allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
               },
               {
                   id: db.fetch(`TicketAdminRole_${interaction.guild.id}`),
                   allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
               }, {
                    id: db.get(`TicketControlNewMember_${interaction.channel.id}`),
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                }, {
                    id: interaction.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                }]).then(() => {
                    interaction.update({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.rename + '| **Add People Is Successfuly**')
                    .setColor(client.colors.none)
                    .setDescription("**I add this people** *"+txt+"* **to your ticket bro.**")
                    .addField(`**Reason:**`, `\`\`\`js\n add people in the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
         components: [
          new MessageActionRow()
         .addComponents(
          [new MessageButton()
           .setStyle("SUCCESS")
           .setEmoji(client.emotes.plus)
           .setLabel("Add Member")
           .setCustomId("addmemberTicket")
           .setDisabled(true)
         ])]
                })
                })
         if(logsChannel) logsChannel.send({  
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle('📇| **Request To Adding People To Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription('this guy ' + interaction.member.tag + "requested to adding people to his ticket and I add this people the ticket for him:\n*"+txt+"*")
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
          value: `\`\`\`js\n add people in to the ticket\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information | created by Mr.SIN RE#1528",
          iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`
        })]
                   });

       }else if(interaction.customId == "canceladdmemberTicket"){
  db.delete(`TicketControlNewMember_${interaction.channel.id}`)
                    interaction.update({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.name,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.x + '| **Canceling The Adding People To Ticket**')
                    .setColor(client.colors.none)
                    .setDescription("**user stop the adding people to his ticket channel.**")
                    .setFooter({
                      text: "Cancel | created by Mr.SIN RE#1528",
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                   components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Canceled")
                                       .setCustomId("dont_close")
                   .setEmoji(client.emotes.x)
                   .setDisabled(true)
                   )]
                })
       }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
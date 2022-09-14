const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions
} = require('discord.js');
const db = require('quick.db');
module.exports = {
  name: 'ticket',
  description: "working with ticket system.",
  category: 'Ticket 🎫',
  cooldown: 1,
  userPermissions: [""],
  botPermissions: [""],
  options: [{
      name: "create",
      description: "create ticket channel for user.",
      type: "SUB_COMMAND",
    },{
       name: "close",
       description: "close user ticket.",
       type: "SUB_COMMAND",
    },{
        name: "delete",
        description: "delete and removing the user ticket channel.",
        type: "SUB_COMMAND",
    },
    {
        name: "rename",
        description: "rename the user ticket channel name.",
        type: "SUB_COMMAND",
        options: [{
           name: "name",
           description: "Provide the channel name of the Target Ticket channel.",
           type: "STRING",
           required: true
        }]
    },{
       name: "open",
       description: "open the user ticket channel.",
       type: "SUB_COMMAND",
    },{
       name: "invite",
       description: "adding a target user in to the user ticket channel.",
       type: "SUB_COMMAND",
       options: [{
          name: "member",
          description: "Select a member to adding in to the ticket channel.",
          type: 'USER',
          required: true
       }]
    }],

  run: async (client, interaction) => {

let Sub = interaction.options.getSubcommand();
  switch (Sub) {
        case "create": {
                          
      interaction.reply({
          ephemeral: true,
          embeds: [new MessageEmbed()
            .setTitle(`${client.emotes.ticket}| Ticket System`)
            .addField(`Language: PER:flag_ir:`,`نیاز به کمک دارید؟؟ ما اینجا هستیم!! این چنل برای ساخت تیکت و ارتباط با تیم ادمینی میباشد برای ساخت تیکت از منوی زیر دلیل خودتون رو انتخاب کنید تا به مشکل شما رسیدگی شود  جهت گرفتن راهنمایی، پرسش سوال، ریپورت کردن ممبر ها و... میتونید با باز کردن یک تیکت با تیم ادمینی در ارتباط باشید همچنین پس از زدن روی دکمه زیر دلیل باز کردن تیکتتون رو به درستی انتخاب کنید وگرنه به تیکت شما رسیدگی نمی شود  تمامی تیکت ها ذخیره می شوند پس لطفا از باز کردن تیکت های بی دلیل و الکی و نقض قوانین سرور در تیکت ها خودداری کنید وگرنه از ساخت تیکت محروم می شوید`)
            .addField(`Language: EN:flag_us:`,`Do you need help ?? we are here!! This channel is for making tickets and communicating with the admin team. To make a ticket, select your reason from the menu below to address your problem. For guidance, asking questions, reporting members, etc., you can open a ticket by Be in touch with the admin team. Also, after clicking the button below, select the reason for opening your ticket correctly, otherwise your ticket will not be processed. All tickets will be saved, so please stop opening tickets without any reason and in violation of server rules. Avoid tickets, otherwise you will be banned from making tickets`)
            .setColor(client.colors.none)
          ],
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
               .setStyle("LINK")
               .setEmoji(client.emotes.support)
               .setLabel("Support")
               .setURL("https://dsc.gg/sizar-team")
             ])
       ]
      })
        }break;
        case "close": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
       interaction.reply({
                embeds: [new MessageEmbed()
                        .setColor(client.colors.none)
                        .setTitle(`${client.emotes.close}| Close Ticket`)
                .setDescription(`Dear friend, you requested for closing ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket, are you sure for close here??`)
                      ],
                components: [new MessageActionRow()
                .addComponents([new MessageButton()
              .setStyle("DANGER")
              .setCustomId("cancel")
              .setEmoji(client.emotes.x)
              .setLabel("Don't Close")
              ],[new MessageButton()
              .setStyle("SECONDARY")
              .setCustomId("configTicket")
              .setEmoji(client.emotes.close)
              .setLabel("Close It")
              ])]
           })
    }else{
           interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, here is not a ticket channel please use this command in other channel**`)
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
        }break;
        case "open": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
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
          interaction.reply({
                embeds: [new MessageEmbed()
                        .setColor(client.colors.none)
                        .setTitle(`${client.emotes.open}| Open Ticket`)
                .setDescription(`Dear friend, you requested for openning ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket, are you sure for open here??`)
                      ],
                components: [new MessageActionRow()
                .addComponents([new MessageButton()
              .setStyle("DANGER")
              .setCustomId("cancel")
              .setEmoji(client.emotes.x)
              .setLabel("Don't Open")
              ],[new MessageButton()
              .setStyle("SUCCESS")
              .setCustomId("reopenTicket")
              .setEmoji(client.emotes.open)
              .setLabel("Open It")
              ])]
           })
          }else {
           interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, here is not a ticket channel please use this command in other channel**`)
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
        }break;
        case "delete": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
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
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]       
          })

          interaction.reply({
                embeds: [new MessageEmbed()
                        .setColor(client.colors.none)
                        .setTitle(`${client.emotes.trash}| Delete Ticket`)
                .setDescription(`Dear friend, you requested for delete ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} ticket, are you sure for delete here??`)
                      ],
                components: [new MessageActionRow()
                .addComponents([new MessageButton()
              .setStyle("SECONDARY")
              .setCustomId("cancel")
              .setEmoji(client.emotes.x)
              .setLabel("Don't Delete")
              ],[new MessageButton()
              .setStyle("DANGER")
              .setCustomId("deleteTicket")
              .setEmoji(client.emotes.trash)
              .setLabel("Delete It")
              ])]
           })  
        }else {
           interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, here is not a ticket channel please use this command in other channel**`)
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
         }
        }break;
        case "rename": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
      let ticketName = interaction.options.getString("name");
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
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]       
          })

     interaction.reply({
         embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle(client.emotes.rename+'| **Request To Change Ticket Name**')
            .setColor(client.colors.none)
            .setDescription("are you sure to change your ticket channel name??")
            .setFooter({
              text: "Change Name | created by Mr.SIN RE#1528",
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
         ],
         [new MessageButton()
           .setStyle("DANGER")
           .setEmoji(client.emotes.x)
           .setLabel("Cancel")
           .setCustomId("cancel")
         ]
         )]
     })
       db.set(`RenameTicket_${interaction.channel.id}`, ticketName)
        setTimeout(() => {
           interaction.editReply({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for changing the ticket channel name is ended.⏰\n```")
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
db.delete(`RenameTicket_${interaction.channel.id}`)
        }, 1000 * 50)
        }else{
return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, here is not a ticket channel please use this command in other channel**`)
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
        }
        }break;    
        case "invite": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
      let member = interaction.options.getMember('member');
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
                   .setEmoji(client.emotes.error)
                   .setCustomId("error")
                   .setDisabled(true))]       
          })
        interaction.reply({
                   embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('📇| **Request To Adding People To Ticket**')
            .setColor(client.colors.none)
            .setDescription("are you sure to change your ticket channel name??")
            .setFooter({
              text: "Change Name | created by Mr.SIN RE#1528",
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
         ],
         [new MessageButton()
           .setStyle("DANGER")
           .setEmoji(client.emotes.x)
           .setLabel("Cancel")
           .setCustomId("canceladdmemberTicket")
         ]
         )]
        })
        db.set(`TicketControlNewMember_${interaction.channel.id}`, member.id)
        setTimeout(() => {
           interaction.editReply({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for changing the ticket channel name is ended.⏰\n```")
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
             db.delete(`TicketControlNewMember_${interaction.channel.id}`)
        }, 1000 * 50)
        }else {
           interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.name,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, here is not a ticket channel please use this command in other channel**`)
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
         }
        }break;
 }
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
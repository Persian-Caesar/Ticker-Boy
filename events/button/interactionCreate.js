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
const ms = require('ms');
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, interaction) => {
try{
  if(!interaction.isButton())return;    
//ticket system
let logsChannel = await interaction.guild.channels.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.modlog`));
let admin_role_has = await db.fetch(`guild_${interaction.guild.id}.ticket.admin_role`);
let admin_role = await db.get(`guild_${interaction.guild.id}.ticket.admin_role`);
let ticket_menu_option_has = await db.fetch(`guild_${interaction.guild.id}.ticket.menu_option`); 
let ticket_menu_option = await db.get(`guild_${interaction.guild.id}.ticket.menu_option`);
let channel_perm = {
  close: [{
    id: db.fetch(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`),
    deny: ['SEND_MESSAGES','VIEW_CHANNEL'],
  },{
    id: interaction.guild.roles.everyone,
    deny: ["VIEW_CHANNEL"]
  }],
  open: [{
    id: db.fetch(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`),
    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
  },{
    id: interaction.guild.roles.everyone,
    deny: ["VIEW_CHANNEL"]
  }],
  invite: [{
    id: db.fetch(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`),
    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
  },{
    id: db.get(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`),
    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
  },{
    id: interaction.guild.roles.everyone,
    deny: ["VIEW_CHANNEL"]
  }]
};

if(admin_role_has){
  channel_perm.close.push({
    id: admin_role,
    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
  })
  channel_perm.open.push({
    id: admin_role,
    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
  })
  channel_perm.invite.push({
    id: admin_role,
    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
  })
}
if(interaction.customId === "premium"){
        interaction.reply({
                         embeds: [new MessageEmbed().setTitle(client.emotes.premium + '| **Premium Info**').setColor(client.colors.aqua).setDescription(`In soon...`)],
          ephemeral: true
    })
}  
if(interaction.customId === "cancel"){
        interaction.update({
                         embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.x + '| **Canceled The Process**')
                    .setColor(client.colors.none)
                    .setDescription(`You have canceled your request to work some thing and now the work have bin canceled for you. Good luck and victory.`)                    
                    .setFooter({
                      text: "Canceled • "+client.embed.footerText,
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
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.x + '| **Canceled The Making A Ticket**')
                    .setColor(client.colors.none)
                    .addField(`${client.emotes.reason}Description:`,`You have canceled your request to make a ticket and now a ticket can no longer be made for you. Good luck and victory.🤗`)                    
                    .setFooter({
                      text: "Canceled • "+client.embed.footerText,
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
   if(!ticket_menu_option_has) return errorMessage(client, interaction, `please setup guild menu option`)
   let menu = new MessageSelectMenu()
            .setPlaceholder(`${client.emotes.ticket}| Select Your Ticket Reason`)
            .setOptions(ticket_menu_option)
            .setMinValues(1)
            .setMaxValues(1)
            .setCustomId("ticket_menu")  

  let cancel = new MessageButton()
              .setStyle("DANGER")
              .setLabel("Canceled")
              .setCustomId("dont_do")
             .setEmoji(client.emotes.x)
  
    return interaction.update({
          ephemeral: true,
          embeds: [new MessageEmbed().setColor(client.colors.none).setDescription(`${client.emotes.tickets}| Hello, please select some option for your ticket reason from the menu below.`)],
          components: [new MessageActionRow()
          .addComponents([menu]),new MessageActionRow()
            .addComponents([cancel],[new MessageButton()
              .setStyle("LINK")
              .setEmoji(client.emotes.support)
              .setLabel("Support")
              .setURL(client.config.discord.server_support)
          ])
         ]
    })
}
if(interaction.customId == "create_ticket"){
   if(!ticket_menu_option_has) return errorMessage(client, interaction, `please setup guild menu option`)
   let menu = new MessageSelectMenu()
            .setPlaceholder(`${client.emotes.ticket}| Select Your Ticket Reason`)
            .setOptions(ticket_menu_option)
            .setMinValues(1)
            .setMaxValues(1)
            .setCustomId("ticket_menu")  

  let cancel = new MessageButton()
              .setStyle("DANGER")
              .setLabel("Canceled")
              .setCustomId("dont_do")
             .setEmoji(client.emotes.x)
  
    return interaction.reply({
          ephemeral: true,
          content: `${client.emotes.tickets}| Hello, please select some option for your ticket reason from the menu below.`,
          components: [new MessageActionRow()
          .addComponents([menu]),new MessageActionRow()
            .addComponents([cancel],[new MessageButton()
              .setStyle("LINK")
              .setEmoji(client.emotes.support)
              .setLabel("Support")
              .setURL(client.config.discord.server_support)
          ])
         ]
    })
}
  
if (interaction.customId == 'configTicket') {
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
                    name: `Requested by ` + interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                  })
                  .setTitle(client.emotes.close + '| **Ticket Is Successfuly Closed**')
                  .setColor(client.colors.none)
                  .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`TicketControl_${interaction.channel.id}`))} now have bin Closed By <@!${interaction.user.id}> .**`)
                  .addField(`**Reason:**`, `\`\`\`js\n close the ticket\`\`\``)
                  .setFooter({
                    text: "Successfuly • "+client.embed.footerText,
                    iconURL: interaction.guild.iconURL({ dynamic: true })
                  })]
          }
          let ticket_message = db.get(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`);
          interaction.update(message)
          if(ticket_message)
          interaction.channel.messages.cache.find(m=> m.id === ticket_message).then(msg =>{
            msg.edit(message)
          })
          interaction.channel.send({
           embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.close + '| **Ticket Is Successfuly Closed**')
                    .setColor(client.colors.none)
                    .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} now have bin Closed By <@!${interaction.user.id}> .**`)
                    .addField(`**Reason:**`, `\`\`\`js\n close the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
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
          interaction.channel.permissionOverwrites.set(channel_perm.close);
       if(logsChannel) logsChannel.send({
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.close + '| **Request For Close Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`this guy ${interaction.user.tag} requested to close this guy ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} ticket and I close the ticket for him.`)
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
          text: "Logs Information • "+client.embed.footerText,
          iconURL: client.embed.footerIcon
        })]
       });
         
       } 
if (interaction.customId == "deleteTicket") {
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
                   name: `Requested by ` + interaction.user.tag,
                   iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                 })
                 .setTitle(client.emotes.trash + '| **Ticket Is Successfuly Deleted**')
                 .setColor(client.colors.none)
                 .setDescription(`this user ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} ticket have bin deleted by ${interaction.user} in **<t:${Math.floor((new Date().getTime() + Math.floor(ms("5s")))/1000)}:R>**.\nplease wait.`)
                 .addField(`**Reason:**`, `\`\`\`js\n delete the ticket\`\`\``)
                 .setFooter({
                   text: "Successfuly • "+client.embed.footerText,
                   iconURL: interaction.guild.iconURL({ dynamic: true })
                 })],
          }
          if(!interaction.member.roles.cache.has(admin_role)&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
  
          interaction.channel.send({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.username,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.trash + '| **Ticket Is Successfuly Deleted**')
                    .setColor(client.colors.none)
                    .setDescription(`this user ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} ticket have bin deleted by ${interaction.user} in **<t:${Math.floor((new Date().getTime() + Math.floor(ms("5s")))/1000)}:R>**.\nplease wait.`)
                    .addField(`**Reason:**`, `\`\`\`js\n delete the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
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
          let ticket_message = db.get(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`);

          if(ticket_message)
           interaction.channel.messages.cache.fetch(ticket_message).then(msg =>{
             msg.edit(message)
           })
   if(logsChannel) logsChannel.send({
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.trash + '| **Request To Delete The Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`this guy ${interaction.user.tag} requested to delete this guy ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} ticket and I delete the ticket for him.`)
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
          text: "Logs Information • "+client.embed.footerText,
          iconURL: client.embed.footerIcon
        })]
                   });
    
       setTimeout(() => {
           interaction.channel.delete();
           db.delete(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`);
           db.delete(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`)
           db.delete(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`),
            db.delete(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`)
           }, 1000 * 5);
}
if (interaction.customId == "reopenTicket") {
          if(!interaction.member.roles.cache.has(admin_role)&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

           interaction.update({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.open + '| **Ticket Is Successfuly Open**')
                    .setColor(client.colors.none)
                    .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} now have bin user ticket have bin Opened by <@!${interaction.user.id}> .**`)
                    .addField(`**Reason:**`, `\`\`\`js\n open the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
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
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.open + '| **Ticket Is Successfuly Open**')
                    .setColor(client.colors.none)
                    .setDescription(`**This ticket created by ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} now have bin user ticket have bin Opened by <@!${interaction.user.id}> .**`)
                    .addField(`**Reason:**`, `\`\`\`js\n open the ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
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
           interaction.channel.permissionOverwrites.set(channel_perm.open);
         if(logsChannel) logsChannel.send({  
                       embeds: [new MessageEmbed()
        .setAuthor({
          name: `Requested Guild Name` + interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(client.emotes.open + '| **Request To Open The Ticket**')
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`this guy ${interaction.user.tag} requested to open this guy ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} ticket and I open the ticket for him.`)
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
          text: "Logs Information • "+client.embed.footerText,
          iconURL: client.embed.footerIcon
        })]
                   });
       }
if (interaction.customId == 'renameTicketTrue') {
            if(!interaction.member.roles.cache.has(admin_role)&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
                interaction.channel.setName(db.fetch(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`));
  db.set(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`, db.fetch(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`))
                interaction.update({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.rename + '| **Ticket Is Successfuly Reanmed**')
                    .setColor(client.colors.none)
                    .setDescription(`**this ticket name have bin changed successfuly${client.emotes.success}.\nthis ticket name is changed to:\`${db.fetch(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`)}\`**`)
                    .addField(`**Reason:**`, `\`\`\`js\n rename the last ticket\`\`\``)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
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
        .setDescription(`this user ${interaction.user.tag} request to rename the this user ticket ${interaction.guild.members.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`))} and ticket have bin renamed to \`${db.fetch(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`)}\` by me.`)
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
          text: "Logs Information • "+client.embed.footerText,
          iconURL: client.embed.footerIcon
        })]
                   });
       }
if(interaction.customId == "addmemberTicket"){
          if(!interaction.member.roles.cache.has(admin_role)&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
      txt = '<@' + db.get(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`) + '>'
           interaction.channel.permissionOverwrites.set(channel_perm.invite).then(() => {
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
                      text: "Successfuly • "+client.embed.footerText,
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
          text: "Logs Information • "+client.embed.footerText,
          iconURL: client.embed.footerIcon
        })]
                   });

       }
if(interaction.customId == "canceladdmemberTicket"){
           db.delete(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`)
           interaction.update({
               embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.x + '| **Canceling The Adding People To Ticket**')
                    .setColor(client.colors.none)
                    .setDescription("**user stop the adding people to his ticket channel.**")
                    .setFooter({
                      text: "Cancel • "+client.embed.footerText,
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
}catch(e){
  console.log(e)
  errorMessage(client, interaction, '```js\n'+e+'```')
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
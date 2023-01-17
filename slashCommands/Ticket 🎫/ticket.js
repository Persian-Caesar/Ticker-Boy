const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions
} = require('discord.js');
const db = require('quick.db');
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
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
    let embed = new MessageEmbed()
      .setTitle(`${client.emotes.ticket}| **Request To Create Ticket**`)
      .setColor(client.colors.none)
      .setTimestamp()
      .setDescription('**your ticket channel will be created but are you sure to do this??\nif your ticket created please wait the moderators or admins to speek there.**')
      .addField(client.emotes.reason+'| INFOS','if you want to create a ticket channel for yourself, you have to click to this emoji: `"'+client.emotes.ticket+'"` or else click to `"'+client.emotes.x+'"`.')
      .setURL(client.config.discord.server_support)
      .setFooter({
        text: `Request To Create Ticket • ${client.embed.footerText}`,
        iconURL: interaction.guild.iconURL({ dynamic: true })
      })
      .setAuthor({
        name: `Requested by ` + interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
  
  interaction.reply({
      ephemeral: true,
      embeds: [embed],
      components: [new MessageActionRow()
          .addComponents(
            [new MessageButton()
            .setCustomId('create')
            .setEmoji(client.emotes.ticket)
            .setLabel("Create Ticket")
            .setStyle('SUCCESS')],
            [new MessageButton()
              .setCustomId('dont_do')
              .setEmoji(client.emotes.x)
              .setLabel('Cancel Process')
              .setStyle("DANGER")
          ])
      ]
  }).then(msg=>{
    db.set(`CreateTicketMSG_${interaction.guild.id}_${interaction.user.id}`, msg.id)
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
           let msg = await interaction.fetchReply()

        setTimeout(() => {
if(msg.embeds[0].title === `${client.emotes.close}| Close Ticket`){
          msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for close the ticket channel is ended.⏰\n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
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
        }, 1000 * 50)
    }else{
           errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
         }
        }break;
        case "open": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
          if(!interaction.member.roles.cache.has(db.get(`TicketAdminRole_${interaction.guild.id}`))&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])&&!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

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
           let msg = await interaction.fetchReply()


        setTimeout(() => {
if(msg.embeds[0].title === `${client.emotes.open}| Open Ticket`){
          msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for delete the ticket channel is ended.⏰\n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
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
        }, 1000 * 50)
          }else {
           errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
         }
        }break;
        case "delete": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
          if(!interaction.member.roles.cache.has(db.get(`TicketAdminRole_${interaction.guild.id}`))&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])&&!interaction.member.permissions.has([Permissions.FLAGS.ADMINISTRATOR])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")


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
           let msg = await interaction.fetchReply()


        setTimeout(() => {
if(msg.embeds[0].title === `${client.emotes.trash}| Delete Ticket`){
          msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for delete the ticket channel is ended.⏰\n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
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
        }, 1000 * 50)
        }else {
           errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
         }
        }break;
        case "rename": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
      let ticketName = interaction.options.getString("name");
          if(!interaction.member.roles.cache.has(db.get(`TicketAdminRole_${interaction.guild.id}`))&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

     interaction.reply({
         embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle(client.emotes.rename+'| **Request To Change Ticket Name**')
            .setColor(client.colors.none)
            .setDescription("are you sure to change your ticket channel name??")
            .setFooter({
              text: "Change Name • "+client.embed.footerText,
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
     interaction.reply({ 
      embeds: [embed],
      components: [button] 
     })
     let msg = await interaction.fetchReply()

        setTimeout(() => {
if(msg.embeds[0].title === client.emotes.rename+'| **Request To Change Ticket Name**'){
          msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for changing the ticket channel name is ended.⏰\n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
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
}
        }, 1000 * 50)
        }else{
return errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
        }
        }break;    
        case "invite": {
      if(interaction.channel.name.startsWith(`${client.emotes.help}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.exchange}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.report}︱ticket-`)||interaction.channel.name.startsWith(`${client.emotes.admin}︱ticket-`)||interaction.channel.name === db.get(`ticketName_${interaction.user.id}_${interaction.guild.id}`)){
      let member = interaction.options.getMember('member');
          if(!interaction.member.roles.cache.has(db.get(`TicketAdminRole_${interaction.guild.id}`))&&!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_CHANNELS])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

let embed = new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle(client.emotes.print+'| **Request To Adding People To Ticket**')
            .setColor(client.colors.none)
            .setDescription("are you sure to add some one in to this ticket channel??")
            .setFooter({
              text: "Adding People • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })

let button = new MessageActionRow()
         .addComponents([new MessageButton()
           .setStyle("SUCCESS")
           .setEmoji(client.emotes.plus)
           .setLabel("Add Member")
           .setCustomId("addmemberTicket")
         ],[new MessageButton()
           .setStyle("DANGER")
           .setEmoji(client.emotes.x)
           .setLabel("Cancel")
           .setCustomId("canceladdmemberTicket")
         ])
     interaction.reply({ 
       embeds: [embed],
       components: [button]
     })
     let msg = await interaction.fetchReply()
       db.set(`TicketControlNewMember_${interaction.channel.id}`, member.id)
        setTimeout(() => {
if(msg.embeds[0].title === client.emotes.print+'| **Request To Adding People To Ticket**'){
          msg.edit({
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyour time for adding people in to the ticket channel is ended.⏰\n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
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
        }
        }, 1000 * 50)
        
        }else {
           errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
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
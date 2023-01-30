const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions,
  Modal,
  TextInputComponent
} = require('discord.js');
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
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
      }],
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
    }],
  },{
    name: 'prefix',
    type: "SUB_COMMAND",
    description: "setup bot prefix in guild.",
    options: [{
      name: "input",
      description: "write server prefix.",
      type: "STRING",
      required: false
    }],
  },{
    name: 'parent',
    type: "SUB_COMMAND",
    description: "setup tickets category.",
    options: [{
      name: "category",
      description: "Select a category to setupping tickets categories.",
      type: "CHANNEL",
      channelTypes: ["GUILD_CATEGORY"],
      required: true
    }]
  },{
    name: "menu",
    description: "setup ticket system menu options and category.",
    type: "SUB_COMMAND",
    options: [{
      name: "name",
      description: "write category of menu option name.",
      type: "STRING",
      required: true
    },{
      name: "emote",
      description: "add some emote for setup caategory menu option.",
      type: "STRING",
      required: false
    }]
  }],

  run: async (client, interaction) => {

let Sub = interaction.options.getSubcommand();
  switch (Sub) {
    case "prefix": {
    try {
          let logsChannel = interaction.guild.channels.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.modlog`));
          let newPrefix = interaction.options.getString('input')  
            
            if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)){
             return errorMessage(client, interaction, "my friend you are don't have this permissions: `\"MANAGE_GUILD\"`.")
            }
            if (newPrefix && newPrefix.length > 7) {
                  return errorMessage(client, interaction, "this prefix `"+newPrefix+"` is to long.\nplease chose shorter one.")
                }
            if (newPrefix === client.prefix || !newPrefix) {
                db.set(`guild_${interaction.guild.id}.prefix`, `${client.prefix}`);
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setAuthor({
                          name: interaction.guild.name,
                          iconURL: interaction.guild.iconURL({ dynamic: true })
                        })
                        .setColor(client.colors.none)
                        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTimestamp()
                        .setTitle(client.emotes.setup + '| **Setup Prefix To Default**')
                        .setDescription("**bot prefix in this guild `"+interaction.guild.name+"` changed to default prefix: `"+client.prefix+"help`**")
                    ],
                    ephemeral: true
                })
              if(logsChannel) logsChannel.send({
                 embeds: [new MessageEmbed()
                        .setAuthor({
                          name: interaction.guild.name,
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
                db.set(`guild_${interaction.guild.id}.prefix`, `${newPrefix}`);
                interaction.reply({
                    ephemeral: true,
                    embeds: [new MessageEmbed()
                        .setAuthor({
                          name: interaction.guild.name,
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
                          name: interaction.guild.name,
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
           errorMessage(client, interaction, `\`\`\`js\n${error}\`\`\``)
           console.log(error)
      }
  }break;
    case "ticket": {
  let channel =  interaction.options.getChannel("channel")||interaction.channel;
  if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) 
return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
        let embed = new MessageEmbed()
                  .setColor(client.colors.none)
      
        interaction.reply({
          ephemeral: true,
          embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.setup + '| **Setup Ticket System**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup your guild ticket system in ${channel} with default or customize.**`)
                    .setFooter({
                      text: "Setting • "+client.embed.footerText,
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })
            ],
          components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Setup Ticket To Default").setStyle('PRIMARY')],[new MessageButton().setCustomId('ticket_setup_custom').setEmoji(client.emotes.hamer).setLabel("Setup Ticket To Customize").setStyle('SUCCESS')]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
        }).then(async (m)=>{
          let msg = interaction.fetchReply()

        //use buttons and modals function
        let collector = await interaction.channel.createMessageComponentCollector({ time: 30000 })
        collector.on('collect', async (collect)=>{
          if(!collect.user.id === interaction.user.id){
            errorMessage(client, collect, `**${client.emotes.error}| This component only for ${interaction.user} and you can't use it.\nuse "\`${prefix}setup\`" for setup the ticket system**`)
          }
          if(collect.isButton()){
            if(collect.customId === "ticket_setup_custom"){
        const ticket_modal = new Modal()
          .setCustomId("ticket_modal")
          .setTitle("Setup Ticket")
                    
        ticket_modal.addComponents(new MessageActionRow().addComponents([new TextInputComponent().setCustomId("ticket_title").setLabel("Embed Title").setStyle("SHORT").setPlaceholder("Place Ticket Embed Title Here ...").setRequired(false)]),new MessageActionRow().addComponents([new TextInputComponent().setCustomId("ticket_description").setLabel("Embed Description").setStyle("PARAGRAPH").setPlaceholder("Place Ticket Embed Description Here ...").setRequired(true)]))
        await collect.showModal(ticket_modal)
            }
            else if(collect.customId === "ticket_default"){
              embed.setTitle(`${client.emotes.ticket}| Ticket System`)
              embed.addField(`${client.emotes.reason}Description:`,`Do you need help ?? we are here!! This channel is for making tickets and communicating with the admin team. To make a ticket, select your reason from the menu below to address your problem. For guidance, asking questions, reporting members, etc., you can open a ticket by Be in touch with the admin team. Also, after clicking the button below, select the reason for opening your ticket correctly, otherwise your ticket will not be processed. All tickets will be saved, so please stop opening tickets without any reason and in violation of server rules. Avoid tickets, otherwise you will be banned from making tickets`)
              collect.update({
                embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Ticket Is Successfuly Setuped To Default**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup server ticket system in ${channel} to default type is successfully.**`)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })
            ],
                components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Ticket Setup To Default").setStyle('PRIMARY').setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
              })
              await channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('create_ticket').setEmoji(client.emotes.ticket).setLabel("Create Ticket").setStyle('SUCCESS')])] 
              })
              embed = new MessageEmbed()
              collector.stop()
            }
          }
        })
        client.on('interactionCreate', async (collect)=>{
      if(collect.isModalSubmit()){
        if(collect.customId === 'ticket_modal'){
          let title = collect.fields.getTextInputValue('ticket_title')
          let description = collect.fields.getTextInputValue('ticket_description')
          if(description){
            embed.setDescription(description)
          }
          if(title){
            embed.setTitle(title)
          }
          collect.update({
                embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Ticket Is Successfuly Setuped To Customize**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup server ticket system in ${channel} to custom type is successfully.**`)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })
            ],
            components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_setup_custom').setEmoji(client.emotes.system).setLabel("Ticket Setup To Customize").setStyle('SUCCESS').setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
          })
          collect.reply({
            ephemeral: true,
            content: '👌🏻 done'
          })
          await channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('create_ticket').setEmoji(client.emotes.ticket).setLabel("Create Ticket").setStyle('SUCCESS')])] 
              })
          embed = new MessageEmbed()
          collector.stop()
         }
        }
        })
        collector.on('end', (collect)=>{
          if(!msg.embeds[0].title === client.emotes.success + '| **Ticket Is Successfuly Setuped To Default**' || !msg.embeds[0].title === client.emotes.success + '| **Ticket Is Successfuly Setuped To Customize**'){
          interaction.editReply({
                      embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.alert + '| **Time For Setup Ticket System Is Up**')
                    .setColor(client.colors.none)
                    .setDescription(`**your time for setup guild ticket system is ended.**`)
                    .setFooter({
                      text: "Timesup • "+client.embed.footerText,
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })
            ],
            components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Setup Ticket To Default").setStyle('PRIMARY').setDisabled(true)],[new MessageButton().setCustomId('ticket_setup_custom').setEmoji(client.emotes.hamer).setLabel("Setup Ticket To Customize").setStyle('SUCCESS').setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
          })
          }
        })
        })
  }break;
    case "logs": {
                if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
  let channel =  interaction.options.getChannel("channel")
if(interaction.guild.channels.cache.find(c => c.id === db.fetch(`guild_${interaction.guild.id}.modlog`))){
     return errorMessage(client, interaction, `**My Friend, you just have a logs channel befor it to ${interaction.guild.channels.cache.find(c => c.id === db.fetch(`guild_${interaction.guild.id}.modlog`))}.**`)
}else {
    interaction.reply({
    embeds: [new MessageEmbed().setTitle('✅| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`process is successfuly.\n I just setup your ticket logs channel to ${channel}.`).setFooter({text: `Successfuly • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.set(`guild_${interaction.guild.id}.modlog`, channel.id)
  channel.send({
    embeds: [new MessageEmbed().setColor(client.colors.none).setDescription(`just now here is ticket logs channel for send members tickets information setupped to ${channel}.`).setTitle('✅| ** Process Is Successfuly**').setFooter({text: `Logs Setuped • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))]
  })
}
  }break;
    case "admin": {
  let role = interaction.options.getRole("role")
                if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_ROLES\" \n```")
      
if(interaction.guild.roles.cache.find(c => c.id === db.fetch(`guild_${interaction.guild.id}.ticket.admin_role`))) return errorMessage(client, interaction, `**My Friend, you just have a setup your ticket mod roles befor it to ${interaction.guild.roles.cache.find(c => c.id === db.fetch(`guild_${interaction.guild.id}.ticket.admin_role`))}.**`)

    interaction.reply({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`\n I just setup your ticket admin role to ${role}.`).setFooter({text: `Successfuly • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.set(`guild_${interaction.guild.id}.ticket.admin_role`, role.id)
    if(db.fetch(`guild_${interaction.guild.id}.modlog`)){
  interaction.guild.channels.cache.find(c => c.id === db.fetch(`guild_${interaction.guild.id}.modlog`)).send({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.none).setDescription(`I just setup ticket admin role to ${role} in this guild.`).setFooter({text: `Logs Setuped • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))]
  })
    }

  }break;
    case "parent": {
     if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
    let category =  interaction.options.getChannel("category");
    if(interaction.guild.channels.cache.find(c => c.id === db.fetch(`guild_${interaction.guild.id}.ticket.category`))){
      return errorMessage(client, interaction, `**My Friend, you just have a category befor it to ${interaction.guild.channels.cache.find(c => c.id === db.fetch(`guild_${interaction.guild.id}.ticket.category`))}.**`)
    }else {
     interaction.reply({
       embeds: [new MessageEmbed().setTitle('✅| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`process is successfuly.\n I just setup your tickets category to ${category}.`).setFooter({text: `Successfuly • Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))],
        ephemeral: true,
     })
     db.set(`guild_${interaction.guild.id}.ticket.category`, category.id)
   }
   }break;
    case "menu": {
      if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
      
      let name = interaction.options.getString("name")
      let emote = interaction.options.getString("emote")
      let options = {}
      let content = `${client.emotes.success}| Successfully menu option setuped.`
      if(name){
        options = { label: name, value: name }
        content += `\n> menu name: **${name}**`
      }
      if(name&&emote){
        options = { label: name, value: name, emoji: emote }
        content += `\n> menu emoji: **${emote}**`
      }
      db.push(`guild_${interaction.guild.id}.ticket.menu_option`,options)
      interaction.reply({
        content: content,
        ephemeral: true
      })
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
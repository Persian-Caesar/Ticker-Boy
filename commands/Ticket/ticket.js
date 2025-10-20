const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  PermissionsBitField,
  TextInputStyle,
  ButtonStyle,
  ChannelType,
  ComponentType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require('discord.js');
const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const Transcript = require('discord-html-transcripts');
module.exports = {
  name: 'ticket',
  description: "Ticket system command.",
  category: 'Ticket 🎫',
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks", "ManageChannels", "ViewChannel", "ReadMessageHistory"],
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "create",
    description: "Create a ticket channel.",
    type: ApplicationCommandOptionType.Subcommand,
  },{
    name: "close",
    description: "Close the ticket.",
    type: ApplicationCommandOptionType.Subcommand,
  },{
    name: "delete",
    description: "Delete and removing the ticket channel.",
    type: ApplicationCommandOptionType.Subcommand,
  },{
    name: "rename",
    description: "Rename the ticket channel name.",
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: "name",
      description: "Provide the channel name of the Target Ticket channel.",
      type: ApplicationCommandOptionType.String,
      required: true
    }]
  },{
    name: "open",
    description: "Open the ticket channel.",
    type: ApplicationCommandOptionType.Subcommand,
  },{
    name: "invite",
    description: "Adding a target user in to the ticket channel.",
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: "member",
      description: "Select a member to adding in to the ticket channel.",
      type: ApplicationCommandOptionType.User,
      required: true
    }]
  },{
    name: "transcript",
    description: "Create a transcript from the channel.",
    type: ApplicationCommandOptionType.Subcommand,
  },{
    name: "setup",
    description: "Setup ticket system message in channel.",
    type: ApplicationCommandOptionType.Subcommand,
    options: [{
      name: "channel",
      description: "Select one channel for setup ticket message.",
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildText],
      required: false
    }]
  }],

  run: async (client, interaction) => {
    let db = client.db;
    let Sub = interaction.options.getSubcommand();
    let admin_role = await db.get(`guild_${interaction.guild.id}.ticket.admin_role`);
    let ticketName = await db.get(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`);
    let ticketControl = await db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`);
    switch (Sub) {
      case "create": {
        let embed = new EmbedBuilder()
          .setTitle(`${client.emotes.ticket}| **Create Ticket**`)
          .setColor(client.colors.none)
          .setTimestamp()
          .setDescription(`If you want to create a ticket channel for yourself, you have to click to this emoji: \`"${client.emotes.ticket}"\` or else click to \`"${client.emotes.x}"\``)
          .setURL(client.config.discord.server_support)
          .setFooter({
            text: `Create Ticket • Requested by ${interaction.user.tag} • ${client.embed.footerText}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
          })
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

        interaction.reply({
          ephemeral: true,
          embeds: [embed],
          components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('create').setEmoji(client.emotes.ticket).setLabel("Create Ticket").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('dont_do').setEmoji(client.emotes.x).setLabel('Cancel Process').setStyle(ButtonStyle.Danger))]
        })
        //db.set(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`, msg.id)
        setTimeout(() => {
          interaction.editReply({
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
          })
        }, 60 * 1000)
      } break;
      case "close": {
        if (interaction.channel.name.startsWith(`ticket-`) || interaction.channel.name === ticketName) {
          interaction.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setTitle(`${client.emotes.close}| Close Ticket`).setDescription(`Dear friend, you requested for closing ${interaction.guild.members.cache.find(c => c.id === ticketControl)} ticket, are you sure for close here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Close"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("configTicket").setEmoji(client.emotes.close).setLabel("Close It"))]
          })
          setTimeout(() => {
            interaction.editReply({
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
            })
          }, 60 * 1000)
        } else {
          errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
        }
      } break;
      case "open": {
        if (interaction.channel.name.startsWith(`ticket-`) || interaction.channel.name === ticketName) {
          if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")

          interaction.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setTitle(`${client.emotes.open}| Open Ticket`).setDescription(`Dear friend, you requested for openning ${interaction.guild.members.cache.find(c => c.id === ticketControl)} ticket, are you sure for open here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("reopenTicket").setEmoji(client.emotes.open).setLabel("Open It"))]
          })
          setTimeout(() => {
            interaction.editReply({
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
            })
          }, 60 * 1000)
        } else {
          errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
        }
      } break;
      case "delete": {
        if(interaction.channel.name.startsWith(`ticket-`) || interaction.channel.name === ticketName) {
          if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
          interaction.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setTitle(`${client.emotes.trash}| Delete Ticket`).setDescription(`Dear friend, you requested for delete ${interaction.guild.members.cache.find(c => c.id === ticketControl)} ticket, are you sure for delete here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Delete"), new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("deleteTicket").setEmoji(client.emotes.trash).setLabel("Delete It"))]
          })
          setTimeout(() => {
            interaction.editReply({
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
            })
          }, 60 * 1000)
        } else {
          errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
        }
      } break;
      case "rename": {
        if (interaction.channel.name.startsWith(`ticket-`) || interaction.channel.name === ticketName) {
          let ticketName = interaction.options.getString("name");
          if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")

          interaction.reply({
            embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ` + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.rename + '| **Request To Change Ticket Name**').setColor(client.colors.none).setDescription("are you sure to change your ticket channel name??").setFooter({ text: "Change Name • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.rename).setLabel("Change Name").setCustomId("renameTicketTrue"), new ButtonStyle().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.x).setLabel("Cancel").setCustomId("cancel"))]
          })
          await db.set(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`, ticketName)
          interaction.reply({
            embeds: [embed],
            components: [button]
          })
          setTimeout(async() => {
            interaction.editReply({
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
            })
            await db.delete(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`)
          }, 60 * 1000)
        } else {
          return errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
        }
      } break;
      case "invite": {
        if (interaction.channel.name.startsWith(`ticket-`) || interaction.channel.name === ticketName) {
          let member = interaction.options.getMember('member');
          if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")

          let embed = new EmbedBuilder()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle(client.emotes.print + '| **Request To Adding People To Ticket**')
            .setColor(client.colors.none)
            .setDescription("are you sure to add some one in to this ticket channel??")
            .setFooter({
              text: "Adding People • " + client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })

          let button = new ActionRowBuilder()
            .addComponents([new ButtonBuilder()
              .setStyle(ButtonStyle.Success)
              .setEmoji(client.emotes.plus)
              .setLabel("Add Member")
              .setCustomId("addmemberTicket")
              , new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setEmoji(client.emotes.x)
                .setLabel("Cancel")
                .setCustomId("canceladdmemberTicket")
            ])
          interaction.reply({
            embeds: [embed],
            components: [button]
          })
          await db.set(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`, member.id)
          setTimeout(async() => {
            interaction.editReply({
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
            })
            await db.delete(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`)
          }, 60 * 1000)

        } else {
          errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
        }
      } break;
      case "transcript": {
       if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
       if(interaction.channel.name.startsWith(`ticket-`) || interaction.channel.name === ticketName) {
        let file = await Transcript.createTranscript(interaction.channel, {
          limit: -1,
          returnType: 'attachment',
          filename: `TicketTranscript-${interaction.channel.name}.html`,
          saveImages: false,
          footerText: `Exported {number} message{s}.`,
          poweredBy: false
        })
        await interaction.reply({
          embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`Creating transcript of ${interaction.channel} for you and this will send you from dm so please wait.`).setTitle(`${client.emotes.hamer}| Build Transcript For You`)],
          ephemeral: true
        })
        await interaction.user.send({
          files: [file],
          embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`Creating the \`${interaction.channel.name}\` tikcet of ${interaction.guild.name} transcript have successfull.`).setTitle(`${client.emotes.success}| Successfully Transcript Created`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        })
       }else{
          errorMessage(client, interaction, `**My Friend, here is not a ticket channel please use this command in other channel**`)
       }
      }break;
      case "setup": {
        let channel =  interaction.options.getChannel("channel")||interaction.channel;
  if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      
        interaction.reply({
          ephemeral: true,
          embeds: [new EmbedBuilder().setFooter({ text: `Setup Ticket • Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(`${client.emotes.setup}| **Ticket System Setting**`).setColor(client.colors.none).setDescription(`**setup your guild ticket system in ${channel} with default or customize.**`).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
          components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Setup Ticket To Default").setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId('ticket_setup_custom').setEmoji(client.emotes.hamer).setLabel("Setup Ticket To Customize").setStyle(ButtonStyle.Success)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support)])],
          fetchReply: true
        }).then(async(msg)=>{
        let time = 120000;
        await msg.createMessageComponentCollector({ time: time }).on('collect', async (collect)=>{
          if(!collect.guild.id === interaction.guild.id) return;
          if(!collect.user.id === interaction.user.id){
            return errorMessage(client, collect, `**${client.emotes.error}| This component only for ${interaction.user} and you can't use it.\nuse "\`</ticket setup:${client.application.commands.cache.find(c => c.name === "ticket").id}>\`" for setup the ticket system**`)
          }
          if(collect.isButton()){
            if(collect.customId === "ticket_setup_custom"){
        const ticket_modal = new ModalBuilder()
          .setCustomId("ticket_modal")
          .setTitle("Setup Ticket")
                    
        ticket_modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_title").setLabel("Embed Title").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Title Here ...").setRequired(false)), new ActionRowBuilder().addComponents([new TextInputBuilder().setCustomId("ticket_description").setLabel("Embed Description").setStyle(TextInputStyle.Paragraph).setPlaceholder("Place Ticket Embed Description Here ...").setRequired(true)]), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_color").setLabel("Embed Color").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Color Hex Code Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_name").setLabel("Button Name").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Name Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_emoji").setLabel("Button Emoji").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Emoji Here ...").setRequired(false)))
        await collect.showModal(ticket_modal)
            }
            else if(collect.customId === "ticket_default"){
              let embed = new EmbedBuilder().setColor(client.colors.none)
              embed.setTitle(`${client.emotes.ticket}| Ticket System`)
              embed.setDescription(`To create a ticket channel click to ${client.emotes.mail}`)
              embed.setFooter({
                text: `${client.embed.footerText}`,
                iconURL: collect.guild.iconURL({ dynamic: true })
              })
              collect.update({
                embeds: [new EmbedBuilder().setFooter({ text: `Setup Ticket • Requested by ${collect.user.tag}`, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true })).setTitle(client.emotes.success + '| **Ticket Is Successfuly Setuped To Default**').setColor(client.colors.none).setDescription(`**setup server ticket system in ${channel} to default type is successfully.**`)],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Ticket Setup To Default").setStyle(ButtonStyle.Primary).setDisabled(true)),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support))] 
              })
              await channel.send({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('create_ticket').setEmoji(client.emotes.mail).setLabel("Create Ticket").setStyle(ButtonStyle.Success))] 
              })
            }
          }
          })
        await interaction.awaitModalSubmit({ time: time }).then(async(collect)=>{
            try{
              if(!collect.guild.id === interaction.guild.id) return;
          if(!collect.user.id === interaction.user.id) return errorMessage(client, collect, `This message only for ${collect.user} and you can't use it.`)
      if(collect.isModalSubmit()){
        if(collect.customId === 'ticket_modal'){
          let title = collect.fields.getTextInputValue('ticket_title')
          let description = collect.fields.getTextInputValue('ticket_description')
          let color = collect.fields.getTextInputValue('ticket_color')
          let button_name = collect.fields.getTextInputValue('ticket_button_name')
          let button_emoji = collect.fields.getTextInputValue('ticket_button_emoji')
          let embed = new EmbedBuilder()
          let button = new ButtonBuilder().setCustomId('create_ticket').setStyle(ButtonStyle.Success)
          button.setLabel(`${button_name? button_name : "Create Ticket"}`)
          button.setEmoji(`${button_emoji? button_emoji : client.emotes.ticket}`)
          embed.setColor(`${color? color : client.colors.none}`)
          
          if(description){
            embed.setDescription(description)
          }
          if(title){
            embed.setTitle(title)
          }
          await collect.update({
                embeds: [new EmbedBuilder().setFooter({ text: `Setup Ticket • Requested by ${collect.user.tag}`, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true })).setTitle(client.emotes.success + '| **Ticket Is Successfuly Setuped To Customize**').setColor(client.colors.none).setDescription(`**setup server ticket system in ${channel} to custom type is successfully.**`)],
            components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId('ticket_setup_custom').setEmoji(client.emotes.system).setLabel("Ticket Setup To Customize").setStyle(ButtonStyle.Success).setDisabled(true)]),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support))] 
          })
          await channel.send({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(button)] 
          })
         }
        }
              
              }catch(e){
           //errorMessage(client, collect, `\`\`\`js\n${e}\n\`\`\``)
         }
        })
        setTimeout(()=>{
          interaction.editReply({
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))]
          })
        }, time)
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

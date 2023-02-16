const {
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  PermissionsBitField
} = require("discord.js");
const {
  errorMessage,
  logMessage
} = require(`${process.cwd()}/functions/functions`);
const Transcript = require('discord-html-transcripts');
module.exports = async (client, interaction) => {
  try {
    if (!interaction.isButton()) return;
    //ticket system
    let db = client.db;
    let ticketName = await db.get(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`);
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find(c => c.id === log);
    let admin_role_has = await db.has(`guild_${interaction.guild.id}.ticket.admin_role`);
    let admin_role = await db.get(`guild_${interaction.guild.id}.ticket.admin_role`);
    let ticket_menu_option_has = await db.has(`guild_${interaction.guild.id}.ticket.menu_option`);
    let ticket_menu_option = await db.get(`guild_${interaction.guild.id}.ticket.menu_option`);
    let ticket_control = await db.get(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`);
    let channel_perm = {
      close: [{
        id: ticket_control,
        deny: [PermissionsBitField.Flags.ViewChannel],
      }, {
        id: interaction.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      }],
      open: [{
        id: ticket_control,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      }, {
        id: interaction.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      }],
      invite: [{
        id: ticket_control,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      }, {
        id: await db.get(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`),
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      }, {
        id: interaction.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      }]
    };

    if (admin_role_has) {
      channel_perm.close.push({
        id: admin_role,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      })
      channel_perm.open.push({
        id: admin_role,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      })
      channel_perm.invite.push({
        id: admin_role,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      })
    }
    if (interaction.customId === "premium") {
      interaction.reply({
        embeds: [new EmbedBuilder().setTitle(client.emotes.premium + '| **Premium Info**').setColor(client.colors.aqua).setDescription(`In soon...`)],
        ephemeral: true
      })
    }
    if (interaction.customId === "cancel" || interaction.customId === "dont_do") {
      interaction.update({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ` + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.x + '| **Canceled The Process**').setColor(client.colors.none).setDescription(`You have canceled your request to work some thing and now the work have bin canceled for you. Good luck and victory.`).setFooter({ text: "Canceled • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Canceled").setCustomId("dont_close").setEmoji(client.emotes.x).setDisabled(true))]
      })
    }
    if (interaction.customId === "report") {
      const content = new TextInputBuilder()
        .setCustomId('report')
        .setLabel("What do you want to report?")
        .setRequired(true)
        .setPlaceholder('Enter some text!')
        .setStyle(TextInputStyle.Paragraph)

      const modal = new ModalBuilder()
        .setCustomId('reporting')
        .setTitle('Reporting Bugs or Other Things')
        .addComponents(new ActionRowBuilder().addComponents(content));

      await interaction.showModal(modal);
    }
    if (interaction.customId == "create") {
      if(interaction.guild.channels.cache.find(x => x.name === ticketName)) return errorMessage(client, interaction, `️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${interaction.guild.channels.cache.find(x => x.name === ticketName)}**`)
      if(!ticket_menu_option_has) return interaction.update({
        content: ``,
        ephemeral: true,
        embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`${client.emotes.tickets}| Hello, please select option to create a ticket channel from the menu below.`)],
        components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setPlaceholder(`${client.emotes.ticket}| Select Me!!`).addOptions([{ label: `Create Ticket With No Reason`, value: `No Reason`, emoji: `${client.emotes.tickets}` }]).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Canceled").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(client.config.discord.server_support))]
      })
      else return interaction.update({
        content: ``,
        ephemeral: true,
        embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`${client.emotes.tickets}| Hello, please select some option for your ticket reason from the menu below.`)],
        components: [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`${client.emotes.ticket}| Select Your Ticket Reason`).setOptions(ticket_menu_option).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Canceled").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support)])]
      })
    }
    if (interaction.customId == "create_ticket") {
      if(interaction.guild.channels.cache.find(x => x.name === ticketName)) return errorMessage(client, interaction, `️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${interaction.guild.channels.cache.find(x => x.name === ticketName)}**`)
      if (!ticket_menu_option_has) return interaction.reply({
        content: ``,
        ephemeral: true,
        embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`${client.emotes.tickets}| Hello, please select option to create a ticket channel from the menu below.`)],
        components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setPlaceholder(`${client.emotes.ticket}| Select Me!!`).addOptions([{ label: `Create Ticket With No Reason`, value: `No Reason`, emoji: `${client.emotes.tickets}` }]).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Canceled").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support))]
      })
      else return interaction.reply({
        content: ``,
        ephemeral: true,
        embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`${client.emotes.tickets}| Hello, please select some option for your ticket reason from the menu below.`)],
        components: [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`${client.emotes.ticket}| Select Your Ticket Reason`).setOptions(ticket_menu_option).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Canceled").setCustomId("dont_do").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(client.config.discord.server_support)])]
      })
    }

    //Config Ticket Button
    if(interaction.customId === "close"){
      interaction.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setTitle(`${client.emotes.close}| Close Ticket`).setDescription(`Dear friend, you requested for closing ${interaction.guild.members.cache.find(c => c.id === ticket_control)} ticket, are you sure for close here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Close"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("configTicket").setEmoji(client.emotes.close).setLabel("Close It"))]
          })
    }
    if (interaction.customId == 'configTicket') {
      interaction.update({
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("configTicket").setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.open).setLabel("Open Ticket").setCustomId("open")).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("delete"))],
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.close + '| **Ticket Is Successfuly Closed**').setColor(client.colors.none).setDescription(`**This ticket created by <@!${ticket_control}> now have bin Closed By <@!${interaction.user.id}> .**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n close the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })]
      })
      //let ticket_message = await db.get(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`);
      //if (ticket_message) return interaction.channel.messages.cache.find(m => m.id === ticket_message).edit(message)
      interaction.channel.permissionOverwrites.set(channel_perm.close);
      let file = await Transcript.createTranscript(interaction.channel, {
          limit: -1,
          returnType: 'attachment',
          filename: `ticketLog-${interaction.channel.name}.html`,
          saveImages: false,
          footerText: `Exported {number} message{s}.`,
          poweredBy: false
      })
      await interaction.guild.members.cache.find(m=> m.id === ticket_control).send({
          files: [file],
          embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`The \`${interaction.channel.name}\` tikcet channel from **${interaction.guild.name}** have bin closed for you by ${interaction.user}.`).setTitle(`${client.emotes.close}| Ticket Closed`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
      if(logsChannel) logMessage(client, interaction, logsChannel, `this guy ${interaction.user.tag} requested to close this guy <@!${ticket_control}> ticket and I close the ticket for him.`, `Ticket Closed`, client.emotes.close)
    }
    if(interaction.customId === "delete"){
      interaction.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setTitle(`${client.emotes.trash}| Delete Ticket`).setDescription(`Dear friend, you requested for delete ${interaction.guild.members.cache.find(c => c.id === ticket_control)} ticket, are you sure for delete here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Delete"), new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("deleteTicket").setEmoji(client.emotes.trash).setLabel("Delete It"))]
          })
    }
    if(interaction.customId == "deleteTicket"){
      if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      
      interaction.update({
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("deleteTicket").setDisabled(true))],
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.trash + '| **Ticket Is Successfuly Deleted**').setColor(client.colors.none).setDescription(`this user <@!${ticket_control}> ticket have bin deleted by ${interaction.user} in **<t:${Math.floor((new Date().getTime() + Math.floor(5 * 1000)) / 1000)}:R>**.\nplease wait.`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n delete the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
      //if(await db.has(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`)) return interaction.channel.messages.cache.fetch(await db.get(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`)).then(msg => msg.edit(message))
      let file = await Transcript.createTranscript(interaction.channel, {
          limit: -1,
          returnType: 'attachment',
          filename: `ticketLog-${interaction.channel.name}.html`,
          saveImages: false,
          footerText: `Exported {number} message{s}.`,
          poweredBy: false
      })
      await interaction.user.send({
          files: [file],
          embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`The \`${interaction.channel.name}\` tikcet channel of ${interaction.guild.members.cache.find(m=> m.id === ticket_control)} from **${interaction.guild.name}** have bin deleted by you.`).setTitle(`${client.emotes.trash}| Successfully Ticket Deleted`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
      if (logsChannel) logMessage(client, interaction, logsChannel, `this guy ${interaction.user.tag} requested to delete this guy <@!${ticket_control}> ticket and I delete the ticket for him.`, `Ticket Deleted`, client.emotes.trash, true, file)
      setTimeout(async() => {
        interaction.channel.delete();
        await db.delete(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`);
        await db.delete(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`)
        await db.delete(`guild_${interaction.guild.id}.ticket.control_${interaction.channel.id}`),
        await db.delete(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`)
      }, 1000 * 5);
    }
    if(interaction.customId === "open"){
      interaction.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setTitle(`${client.emotes.open}| Open Ticket`).setDescription(`Dear friend, you requested for openning ${interaction.guild.members.cache.find(c => c.id === ticket_control)} ticket, are you sure for open here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("reopenTicket").setEmoji(client.emotes.open).setLabel("Open It"))]
          })
    }
    if(interaction.customId == "reopenTicket"){
      if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      interaction.update({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.open + '| **Ticket Is Successfuly Open**').setColor(client.colors.none).setDescription(`**This ticket created by <@!${ticket_control}> now have bin user ticket have bin Opened by <@!${interaction.user.id}> .**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n open the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("close")).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.open).setLabel("Open Ticket").setCustomId("reopenTicket").setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("delete"))],
      });
      interaction.channel.permissionOverwrites.set(channel_perm.open);
      if (logsChannel) logMessage(client, interaction, logsChannel, `this guy ${interaction.user.tag} requested to open this guy <@!${ticket_control}> ticket and I open the ticket for him.`, `Ticket Opend`, client.emotes.open)
    }
    if (interaction.customId == 'renameTicketTrue') {
      if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      interaction.channel.setName(await db.get(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`));
      await db.set(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`, interaction.channel.name)
      interaction.update({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.rename + '| **Ticket Is Successfuly Reanmed**').setColor(client.colors.none).setDescription(`**this ticket name have bin changed successfuly${client.emotes.success}.\nthis ticket name is changed to: \`${await db.get(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`)}\`**`).addFields([{ name: `**Reason:**`, value: `\`\`\`js\n rename the last ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.rename).setLabel("Change Name").setCustomId("renameTicketTrue").setDisabled(true))]
      })

      if (logsChannel) logMessage(client, interaction, logsChannel, `this user ${interaction.user.tag} request to rename the this user ticket <@!${ticket_control}> and ticket have bin renamed to \`${await db.get(`guild_${interaction.guild.id}.ticket.rename_${interaction.channel.id}`)}\` by me.`, `Ticket Renamed`, client.emotes.rename)
    }
    if (interaction.customId == "addmemberTicket") {
      if (!interaction.member.roles.cache.has(admin_role) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
      txt = '<@' + await db.get(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`) + '>'
      interaction.channel.permissionOverwrites.set(channel_perm.invite).then(() => {
        interaction.update({
          embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.plus + '| **Add People Is Successfuly**').setColor(client.colors.none).setDescription("**I add this people** *" + txt + "* **to your ticket bro.**").addFields([{ name: `**Reason:**`, value: `\`\`\`js\n add people in the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
          components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.plus).setLabel("Add Member").setCustomId("addmemberTicket").setDisabled(true)])]
        })
      })
      if (logsChannel) logMessage(client, interaction, logsChannel, `this guy ${interaction.user.tag} requested to adding people to his ticket and I add this people the ticket for him: *${txt}*`, `Ticket Invte People`, client.emotes.plus)

    }
    if (interaction.customId == "canceladdmemberTicket") {
      await db.delete(`guild_${interaction.guild.id}.ticket.new_member_${interaction.channel.id}`)
      interaction.update({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ` + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.x + '| **Canceling The Adding People To Ticket**').setColor(client.colors.none).setDescription("**user stop the adding people to his ticket channel.**").setFooter({ text: "Cancel • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Canceled").setCustomId("dont_close").setEmoji(client.emotes.x).setDisabled(true))]
      })
    }
  } catch (e) {
    console.log(e)
    //errorMessage(client, interaction, '```js\n' + e + '```')
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
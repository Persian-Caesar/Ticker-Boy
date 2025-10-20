const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  PermissionsBitField,
  Client
} = require("discord.js");
const {
  createTranscript
} = require('discord-html-transcripts');
const config = require("../../config");
const {
  logMessage,
  errorMessage
} = require(`./functions`);
module.exports = {

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  createCmd: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = data ? await data.find(t => t.user == interaction.user.id) : null;
    let userTicketChannel = interaction.guild.channels.cache.get(ticket?.channelId);
    let ticket_close = ticket?.closed;
    let ticket_menu_option_has = await db.has(`guild_${interaction.guild.id}.panel.menu_options`);
    let ticket_menu_option = (await db.get(`guild_${interaction.guild.id}.panel.menu_options`))?.map(m => m.data);
    let ticket_type = await db.get(`guild_${interaction.guild.id}.ticket_type`) ? await db.get(`guild_${interaction.guild.id}.ticket_type`) : "Reason - Menu - UserTag (Default)";//"NoReason - Button - Counter (Default)";
    if (!ticket_close && userTicketChannel) return await errorMessage(client, interaction, `️My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}`);
    if (ticket_type === "Reason - Menu - UserTag (Default)") {
      let row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select!!`).setOptions([{ label: "NoReason", value: "NoReason", emoji: client.emotes.tickets }]).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Cancel").setCustomId("cancel").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(config.discord.support.invite)])];
      if (ticket_menu_option_has) {
        row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select!!`).setOptions(ticket_menu_option).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Cancel").setCustomId("cancel").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(config.discord.support.invite)])];
      };

      await interaction.deferUpdate()
      return interaction.editReply({
        content: ` `,
        embeds: [],
        components: row
      })
    }
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  create: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = await data?.find(t => t.user == interaction.user.id);
    let userTicketChannel = interaction.guild.channels.cache.find((c) => c.id === ticket?.channelId);
    let ticket_close = ticket?.closed;
    let ticket_menu_option_has = await db.has(`guild_${interaction.guild.id}.panel.menu_options`);
    let ticket_menu_option = (await db.get(`guild_${interaction.guild.id}.panel.menu_options`))?.map(m => m.data);
    let ticket_type = await db.get(`guild_${interaction.guild.id}.ticket_type`) ? await db.get(`guild_${interaction.guild.id}.ticket_type`) : "Reason - Menu - UserTag (Default)";//"NoReason - Button - Counter (Default)";
    if (!ticket_close && userTicketChannel) return await errorMessage(client, interaction, `️My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}`);
    if (ticket_type === "Reason - Menu - UserTag (Default)") {
      let row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select!!`).setOptions([{ label: "NoReason", value: "NoReason", emoji: client.emotes.tickets }]).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Cancel").setCustomId("cancel").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(config.discord.support.invite)])];
      if (ticket_menu_option_has) {
        row = [new ActionRowBuilder().addComponents([new StringSelectMenuBuilder().setPlaceholder(`Select `).setOptions(ticket_menu_option).setMinValues(1).setMaxValues(1).setCustomId("ticket_menu")]), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Cancel").setCustomId("cancel").setEmoji(client.emotes.x), new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.help).setLabel("Support").setURL(config.discord.support.invite)])];
      }

      await interaction.deferReply({ ephemeral: true })
      return interaction.followUp({
        content: ` `,
        embeds: [],
        components: row
      })
    }
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  close: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = await data?.find(t => t.channelId == interaction.channel.id);
    let ticketName = ticket.channelName;
    let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket.user);
    let ticket_new_user = interaction.guild.members.cache.find(m => m.id === ticket.newUser);
    let claimed = ticket.claimed;
    let closeCategoryHas = await db.has(`guild_${interaction.guild.id}.categories.close`);
    let closeCategory = await db.get(`guild_${interaction.guild.id}.categories.close`);
    let check_admin_roles = await db.has(`guild_${interaction.guild.id}.admin_roles`);
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);

    let logsChannel = interaction.guild.channels.cache.get(await db.get(`guild_${interaction.guild.id}.modlog`));
    let channel_perm = [{
      id: interaction.guild.roles.everyone,
      deny: [PermissionsBitField.Flags.ViewChannel]
    }];
    if (check_admin_roles) {
      await admin_roles?.forEach(role => {
        channel_perm.push({
          id: role,
          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
        })
      })
    }
    await interaction.deferUpdate()
    await interaction.editReply({
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("ticket-configTicket").setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.open).setLabel("Open Ticket").setCustomId("ticket-open")).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("ticket-delete"))],
      embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.close + '| Ticket Is Successfuly Closed').setColor(client.colors.theme).setDescription(`This ticket created by ${ticket_user?.user} now have bin Closed By ${interaction.user}.`).addFields([{ name: `Reason:`, value: `\`\`\`js\n close the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })]
    })
    let newName = ticketName.toString().replace("ticket-", "closed-");
    await interaction.channel.setName(`${newName}`);
    await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
    await db.push(`guild_${interaction.guild.id}.tickets`, {
      channelId: interaction.channel.id,
      channelName: newName,
      user: ticket_user?.user.id,
      newUser: ticket_new_user?.user.id,
      closed: true,
      claimed: claimed
    });
    channel_perm.push({
      id: ticket_user?.user.id,
      deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
    })
    if (ticket_new_user?.user.id) {
      channel_perm.push({
        id: ticket_new_user?.user.id,
        deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      })
    };
    if (closeCategoryHas) {
      await interaction.channel.setParent(closeCategory)
    };
    await interaction.channel.permissionOverwrites.set(channel_perm);
    if (logsChannel) await logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Closed`, client.emotes.close);
    let file = await createTranscript(interaction.channel, {
      limit: -1,
      returnType: 'attachment',
      filename: `transcript-${interaction.channel.name}.html`,
      saveImages: false,
      footerText: `Exported {number} message{s}.`,
      poweredBy: false
    })
    await ticket_user?.user.send({
      files: [file],
      embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`The \`${interaction.channel.name}\` tikcet channel from **${interaction.guild.name}** have bin closed for you by ${interaction.user}.`).setTitle(`${client.emotes.close}| Ticket Closed`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
    }).catch();
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  open: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = await data?.find(t => t.channelId == interaction.channel.id);
    let ticketName = ticket.channelName;
    let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket.user);
    let ticket_new_user = interaction.guild.members.cache.find(m => m.id === ticket.newUser);
    let claimed = ticket.claimed;
    let openCategoryHas = await db.has(`guild_${interaction.guild.id}.categories.open`);
    let openCategory = await db.get(`guild_${interaction.guild.id}.categories.open`);
    let check_admin_roles = await db.has(`guild_${interaction.guild.id}.admin_roles`);
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find((c) => c.id === log);
    let channel_perm = [{
      id: interaction.guild.roles.everyone,
      deny: [PermissionsBitField.Flags.ViewChannel]
    }];
    if (check_admin_roles) {
      await admin_roles?.forEach(role => {
        channel_perm.push({
          id: role,
          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
        })
      })
    }
    await interaction.deferUpdate();
    await interaction.editReply({
      embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.open + '| Ticket Is Successfuly Open').setColor(client.colors.theme).setDescription(`This ticket created by ${ticket_user} now have bin user ticket have bin Opened by ${interaction.user}.`).addFields([{ name: `Reason:`, value: `\`\`\`js\n open the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("ticket-close")).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.open).setLabel("Open Ticket").setCustomId("ticket-reopenTicket").setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("ticket-delete"))],
    });
    let newName = ticketName.toString().replace("closed-", "ticket-");
    await interaction.channel.setName(`${newName}`);
    await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
    await db.push(`guild_${interaction.guild.id}.tickets`, {
      channelId: interaction.channel.id,
      channelName: newName,
      user: ticket_user?.user.id,
      newUser: ticket_new_user?.user.id,
      closed: false,
      claimed: claimed
    });
    channel_perm.push({
      id: ticket_user?.user.id,
      allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
    });
    if (ticket_new_user?.user.id) {
      channel_perm.push({
        id: ticket_new_user?.user.id,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      });
    };
    if (openCategoryHas) {
      await interaction.channel.setParent(openCategory)
    };
    await interaction.channel.permissionOverwrites.set(channel_perm);
    if (logsChannel) await logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Opend`, client.emotes.open);
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  claim: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = await data?.find(t => t.channelId == interaction.channel.id);
    let ticketName = ticket.channelName;
    let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket.user);
    let ticket_new_user = interaction.guild.members.cache.find(m => m.id === ticket.newUser);
    let ticket_close = ticket.closed;
    let admin_roles_has = await db.has(`guild_${interaction.guild.id}.admin_roles`);
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find((c) => c.id === log);
    await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
    await db.push(`guild_${interaction.guild.id}.tickets`, {
      channelId: interaction.channel.id,
      channelName: ticketName,
      user: ticket_user?.user.id,
      newUser: ticket_new_user?.user.id,
      closed: ticket_close,
      claimed: interaction.user.id
    });
    if (admin_roles_has) {
      admin_roles?.forEach(async role => {
        await interaction.channel.permissionOverwrites.edit(role, { ViewChannel: false })
      })
    }
    await interaction.channel.permissionOverwrites.edit(interaction.user.id, {
      ViewChannel: true,
      SendMessages: true
    }).then(async () => {
      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.claim + '| Ticket Is Successfuly Claimed').setColor(client.colors.theme).setDescription(`This ticket created by ${ticket_user?.user} now have bin Claimed by ${interaction.user} .`).addFields([{ name: `Reason:`, value: `\`\`\`js\n claim the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Claim Ticket").setEmoji(client.emotes.claim).setCustomId("ticket-claimTicket").setDisabled(true))],
      });
    });
    if (logsChannel) await logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Cliamed`, client.emotes.claim);
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  unclaim: async function (client, interaction) {
    let db = client.db;
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find((c) => c.id === log);
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  rename: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = await data?.find(t => t.channelId == interaction.channel.id);
    let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket.user);
    let ticket_new_user = interaction.guild.members.cache.find(m => m.id === ticket.newUser);
    let ticket_close = ticket.closed;
    let claimed = ticket.claimed;
    let newName = await db.get(`guild_${interaction.guild.id}.name_${interaction.channel.id}`);
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find((c) => c.id === log);
    await interaction.channel.setName(newName);
    await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
    await db.push(`guild_${interaction.guild.id}.tickets`, {
      channelId: interaction.channel.id,
      channelName: newName,
      user: ticket_user?.user.id,
      newUser: ticket_new_user?.user.id,
      closed: ticket_close,
      claimed: claimed
    });
    await interaction.deferUpdate();
    await interaction.editReply({
      embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.rename + '| Ticket Is Successfuly Reanmed').setColor(client.colors.theme).setDescription(`this ticket name have bin changed successfuly${client.emotes.success}.\nthis ticket name is changed to: \`${newName}\``).addFields([{ name: `Reason:`, value: `\`\`\`js\n rename the last ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.rename).setLabel("Change Name").setCustomId("ticket-renameTicketTrue").setDisabled(true))]
    });
    if (logsChannel) await logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Renamed`, client.emotes.rename);
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  add: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = await data?.find(t => t.channelId == interaction.channel.id);
    let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket.user);
    let ticket_close = ticket.closed;
    let claimed = ticket.claimed;
    let user = await db.get(`guild_${interaction.guild.id}.new_member_${interaction.channel.id}`);
    let member = interaction.guild.members.cache.find((m) => m.id === user);
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find((c) => c.id === log);
    await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
    await db.push(`guild_${interaction.guild.id}.tickets`, {
      channelId: interaction.channel.id,
      channelName: ticketName,
      user: ticket_user?.user.id,
      newUser: member.user.id,
      closed: ticket_close,
      claimed: claimed
    });
    await interaction.channel.permissionOverwrites.edit(member.user.id, { ViewChannel: true, SendMessages: true })
      .then(async () => {
        await interaction.deferUpdate()
        await interaction.editReply({
          embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(`${client.emotes.plus}| Add People Is Successfuly`).setColor(client.colors.theme).setDescription(`I add this people *${member.user}* to your ticket bro.`).addFields([{ name: `Reason:`, value: `\`\`\`js\n add people in the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
          components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.plus).setLabel("Add Member").setCustomId("ticket-addmemberTicket").setDisabled(true)])]
        });
      });
    if (logsChannel) await logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**\n\n**Ticket New User:\n${member.user ? member.user : member} | ${member.user ? member.user.tag : member.name} | ${member.user ? member.user.id : member.id}**`, `Ticket Invte People`, client.emotes.plus);
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @returns 
   */
  del: async function (client, interaction) {
    let db = client.db;
    let data = await db.get(`guild_${interaction.guild.id}.tickets`);
    let ticket = await data?.find(t => t.channelId == interaction.channel.id);
    let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket.user);
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find((c) => c.id === log);
    await interaction.deferUpdate();
    await interaction.editReply({
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji(client.emotes.trash).setLabel("Delete Ticket").setCustomId("ticket-deleteTicket").setDisabled(true))],
      embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.trash + '| Ticket Is Successfuly Deleted').setColor(client.colors.theme).setDescription(`this user ${ticket_user?.user} ticket have bin deleted by ${interaction.user} in **<t:${Math.floor((new Date().getTime() + Math.floor(5 * 1000)) / 1000)}:R>**.\nplease wait.`).addFields([{ name: `Reason:`, value: `\`\`\`js\n delete the ticket\`\`\`` }]).setFooter({ text: "Successfuly • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
    });
    let file = await createTranscript(interaction.channel, {
      limit: -1,
      returnType: 'attachment',
      filename: `transcript-${interaction.channel.name}.html`,
      saveImages: false,
      footerText: `Exported {number} message{s}.`,
      poweredBy: false
    });
    await interaction.user.send({
      files: [file],
      embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`The \`${interaction.channel.name}\` tikcet channel of ${ticket_user} from **${interaction.guild.name}** have bin deleted by you.`).setTitle(`${client.emotes.trash}| Successfully Ticket Deleted`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })]
    }).catch();
    if (logsChannel) await logMessage(client, interaction, logsChannel, `**Ticket User:\n${ticket_user?.user} | ${ticket_user?.user.tag} | ${ticket_user?.user.id}**`, `Ticket Deleted`, client.emotes.trash, true, file);
    setTimeout(async () => {
      await db.set(`guild_${interaction.guild.id}.tickets`, data.filter(t => t.channelId !== interaction.channel.id));
      interaction.channel.delete();
    }, 1000 * 5);
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/
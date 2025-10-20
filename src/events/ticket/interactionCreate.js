const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");
const {
  logMessage
} = require("../../functions/functions");
const {
  close,
  open,
  claim,
  rename,
  add,
  del,
  create,
  createCmd
} = require("../../functions/ticket");
const error = require("../../functions/error");
const errorMessage = require("../../functions/errorMessage");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Interaction} interaction 
 * @returns {void}
 */
module.exports = async (client, interaction) => {
  try {
    let db = client.db;
    if (interaction.isButton()) {
      if (interaction.customId.startsWith('ticket-')) {

        //ticket system
        let data = await db.get(`guild_${interaction.guild.id}.tickets`);
        let ticket = data ? await data.find(t => t.channelId === interaction.channel.id) : null;
        // let userTicketChannel = interaction.guild.channels.cache.find((c) => c.id === ticket?.channelId);
        // let ticket_close = ticket?.closed;
        // let log = await db.get(`guild_${interaction.guild.id}.modlog`);
        let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
        // let ticket_menu_option_has = await db.has(`guild_${interaction.guild.id}.panel.menu_options`);
        // let ticket_menu_option = (await db.get(`guild_${interaction.guild.id}.panel.menu_options`))?.map(m => m.data);
        // let ticket_type = await db.get(`guild_${interaction.guild.id}.ticket_type`) ? await db.get(`guild_${interaction.guild.id}.ticket_type`) : "Reason - Menu - UserTag (Default)";//"NoReason - Button - Counter (Default)";
        let ticket_user = interaction.guild.members.cache.find(m => m.id === ticket?.user);

        //===== Create ticket
        if (interaction.customId == "ticket-cmdTicketCreate") {
          await createCmd(client, interaction);
        }
        if (interaction.customId == "ticket-create") {
          await create(client, interaction);
        }

        //Config Ticket Buttons
        //==== close ticket
        if (interaction.customId === "ticket-close") {
          await interaction.deferReply();
          await interaction.followUp({
            embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.close}| Close Ticket`).setDescription(`Dear friend, you requested for closing ${ticket_user?.user} ticket, are you sure for close here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Close"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("ticket-configTicket").setEmoji(client.emotes.close).setLabel("Close It"))]
          });
          setTimeout(async () => {
            await interaction.deleteReply().catch();
          }, 2 * 60 * 1000);
        }
        if (interaction.customId == 'ticket-configTicket') {
          await close(client, interaction);
        }

        //==== open ticket
        if (interaction.customId === "ticket-open") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await interaction.deferReply();
          await interaction.followUp({
            embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.open}| Open Ticket`).setDescription(`Dear friend, you requested for openning ${ticket_user} ticket, are you sure for open here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Open"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("ticket-reopenTicket").setEmoji(client.emotes.open).setLabel("Open It"))]
          });
          setTimeout(async () => {
            await interaction.deleteReply().catch();
          }, 2 * 60 * 1000);
        }
        if (interaction.customId == "ticket-reopenTicket") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```")
          await open(client, interaction);
        }

        //==== claim ticket
        if (interaction.customId === "ticket-claim") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await interaction.deferReply();
          await interaction.followUp({
            embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.claim}| Claim Ticket`).setDescription(`Dear friend, you requested for claim ${ticket_user?.user} ticket, are you sure for claim the ticket??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Claim"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("ticket-claimTicket").setEmoji(client.emotes.claim).setLabel("Claim It"))]
          });
          setTimeout(async () => {
            await interaction.deleteReply().catch();;
          }, 2 * 60 * 1000);
        }
        if (interaction.customId == "ticket-claimTicket") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await claim(client, interaction);
        }

        //==== reanme ticklet
        if (interaction.customId == "ticket-renameTicketTrue") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await rename(client, interaction);
        }
        if (interaction.customId == "ticket-renameTicketFalse") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await db.delete(`guild_${interaction.guild.id}.name_${interaction.channel.id}`);
          await interaction.deferUpdate();
          await interaction.deleteReply();
        }

        //====== add member
        if (interaction.customId == "ticket-addmemberTicket") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await add(client, interaction);
        }
        if (interaction.customId == "ticket-canceladdmemberTicket") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await db.delete(`guild_${interaction.guild.id}.new_member_${interaction.channel.id}`);
          await interaction.deferUpdate();
          await interaction.deleteReply();
        }

        //==== delete ticket
        if (interaction.customId === "ticket-delete") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await interaction.deferReply();
          await interaction.followUp({
            embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.trash}| Delete Ticket`).setDescription(`Dear friend, you requested for delete ${ticket_user?.user} ticket, are you sure for delete here??`)],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Delete"), new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("ticket-deleteTicket").setEmoji(client.emotes.trash).setLabel("Delete It"))]
          });
          setTimeout(async () => {
            await interaction.deleteReply().catch();
          }, 2 * 60 * 1000);
        }
        if (interaction.customId == "ticket-deleteTicket") {
          if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return await errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
          await del(client, interaction);
        }
      }
    };
    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "ticket_menu") {
        let cmd = client.application.commands.cache.find(c => c.name === "close");
        let data = await db.get(`guild_${interaction.guild.id}.tickets`);
        let ticket = data ? await data.find(t => t.user == interaction.user.id) : null;
        let userTicketChannel = interaction.guild.channels.cache.get(ticket?.channelId);
        let ticket_close = ticket?.closed;
        let claim_has = await db.get(`guild_${interaction.guild.id}.ticket_claim`);
        let logsChannel = interaction.guild.channels.cache.get(await db.get(`guild_${interaction.guild.id}.modlog`));
        let check_admin_roles = await db.has(`guild_${interaction.guild.id}.admin_roles`);
        let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
        let openCategoryHas = await db.has(`guild_${interaction.guild.id}.categories.open`);
        let openCategory = await db.get(`guild_${interaction.guild.id}.categories.open`);
        let channel_perm = [{
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
        }, {
          id: interaction.guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel]
        }];
        if (check_admin_roles) {
          admin_roles?.forEach(role => {
            channel_perm.push({
              id: role,
              allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
            })
          })
        }
        if (!ticket_close && userTicketChannel) return await errorMessage(client, interaction, `️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}**`);
        interaction.values.forEach(async (value) => {
          await interaction.guild.channels.create({
            name: `ticket-${interaction.user.tag}`,
            type: ChannelType.GuildText,
            reason: `create a ${value} ticket`,
            topic: `**ID:** ${interaction.user.id}\n\n**Tag:** ${interaction.user.tag}\n\n**Reason:** __${value}__\n\n**Use It For Close Ticket:** __</${cmd.name}:${cmd.id}>__`

          }).then(async (channel) => {
            if (openCategoryHas) {
              await channel.setParent(openCategory)
            }
            await channel.permissionOverwrites.set(channel_perm);
            await db.push(`guild_${interaction.guild.id}.tickets`, {
              channelId: channel.id,
              channelName: channel.name,
              user: interaction.user.id,
              newUser: null,
              closed: false,
              claimed: null
            });
            let row = new ActionRowBuilder();
            if (claim_has) {
              row.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Claim Ticket").setEmoji(client.emotes.claim).setCustomId("ticket-claim"))
            };
            await channel.send({
              content: `<@${interaction.user.id}>`,
              embeds: [new EmbedBuilder().setFooter({ text: `Ticket Information • Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setDescription(`Welcome to the ticket channel. please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible. (please refrain from mentioning admins)\n\n**The Ticket Reason: \n${client.emotes.reply} \`${value}\`**`).setTitle(`${client.emotes.success}| Successfully Ticket Created`).setColor(client.colors.theme).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
              components: [row.addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("ticket-close"))]
            }).then(async (msg) => {
              await channel.messages.pin(msg.id)
            });
            if (logsChannel) await logMessage(client, interaction, logsChannel, `**Ticket Channel:**\n**${channel} | ${channel.name} | ${channel.id}**`, `Create ${value} Ticket`, client.emotes.ticket);
            await interaction.deferUpdate({ fetchReply: true });
            return interaction.editReply({
              content: ` `,
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Ticket Created").setEmoji(client.emotes.mail).setCustomId("ticket-create").setDisabled(true))],
              embeds: [new EmbedBuilder().setTitle(`${client.emotes.success}| **Your Ticket Is Ready**`).setColor(client.colors.theme).setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp().setDescription(`your ticket channel have bin created and please wait the moderators or admins to speek there.\n\n**The Channel: ${channel} | ${channel.name} | ${channel.id}\n\nYour Ticket Reason:  \n${client.emotes.reply} \`${value}\`**`).setFooter({ text: `Requested by ${interaction.user.tag} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })]
            });
          });
        });
      }
    }
  } catch (e) {
    console.log(e)
    error(e)
    //await errorMessage(client, interaction, '```js\n' + e + '```')
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
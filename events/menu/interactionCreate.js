const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  SelectMenuBuilder,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");
const {
  logMessage,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, interaction) => {
  let db = client.db;
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId === "ticket_menu") {
    let cmd = client.application.commands.cache.find(c => c.name === "ticket");
    let log = await db.get(`guild_${interaction.guild.id}.modlog`);
    let logsChannel = await interaction.guild.channels.cache.find(c => c.id === log);
    let check_admin_role = await db.has(`guild_${interaction.guild.id}.ticket.admin_role`);
    let admin_role = await db.get(`guild_${interaction.guild.id}.ticket.admin_role`);
    let ticket_category_has = await db.has(`guild_${interaction.guild.id}.ticket.category`);
    let ticket_category = await db.get(`guild_${interaction.guild.id}.ticket.category`);
    let channel_perm = {
      create: [{
        id: interaction.user.id,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      }, {
        id: interaction.guild.roles.everyone,
        deny: [PermissionsBitField.Flags.ViewChannel]
      }],
    };
    if (check_admin_role) {
      channel_perm.create.push({
        id: admin_role,
        allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel]
      })
    }
    interaction.values.some(async (value) => {
        interaction.guild.channels.create({
          name: `ticket-${interaction.user.tag}`,
          type: ChannelType.GuildText,
          reason: `create a ${value} ticket`,
          topic: `\n**ID:** ${interaction.user.id} \n**Tag:** ${interaction.user.tag} \n**Reason:** __${value}__\n**Use It For Close Ticket:** __</${cmd.name + " close"}:${cmd.id}>__`

        }).then(async (channel) => {
          if (ticket_category_has) {
            channel.setParent(ticket_category)
          }
          channel.permissionOverwrites.set(channel_perm.create)
          await db.set(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`, channel.name);
          await db.set(`guild_${interaction.guild.id}.ticket.control_${channel.id}`, interaction.user.id);
          channel.send({
            content: `<@${interaction.user.id}>`,
            embeds: [new EmbedBuilder().setFooter({ text: `Ticket Information • Requested by ${interaction.user.tag}`,  iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setDescription(`Welcome to the ticket channel. please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible. (please refrain from mentioning admins)\n\n**The Ticket Reason: \n${client.emotes.reply} \`${value}\`**`).setTitle(`${client.emotes.success}| Successfully Ticket Created`).setColor(client.colors.none).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Close Ticket").setEmoji(client.emotes.close).setCustomId("close"))]
          }).then(msg => {
            channel.messages.pin(msg.id)
            //db.set(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`, msg.id)
          })
          let message = {
            content: ` `,
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Ticket Created").setEmoji(client.emotes.mail).setCustomId("create_need_help_ticket").setDisabled(true))],
            embeds: [new EmbedBuilder().setTitle(`${client.emotes.success}| **Your Ticket Is Ready**`).setColor(client.colors.none).setThumbnail(interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp().setDescription(`your ticket channel have bin created and please wait the moderators or admins to speek there.\n\n**The Channel: ${channel} | ${channel.name} | ${channel.id}\n\nYour Ticket Reason: \`${value}\`**`).setFooter({ text: `Requested by ${interaction.user.tag} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })]
          }
          //if(await db.has(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`)) return interaction.channel.messages.fetch(await db.get(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`)).then(msg=> msg.edit(message))
          interaction.update(message)
          if (logsChannel) logMessage(client, interaction, logsChannel, `the ticket channel created and user stay wait the moderators or admins to talk there.\n\n**Ticket Channel:**\n**${channel} | ${channel.name} | ${channel.id}**`, `Create ${value} Ticket`, client.emotes.ticket)
        });
    })
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
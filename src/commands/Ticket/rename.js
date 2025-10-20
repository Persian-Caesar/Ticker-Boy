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
const editResponse = require('../../functions/editResponse');
const {
  errorMessage
} = require(`${process.cwd()}/src/functions/functions`);
module.exports = {
  name: "rename",
  description: "Rename the ticket channel name.",
  category: 'Ticket 🎫',
  aliases: ['re', 'rename ticket'],
  usage: "[put-name]",
  cooldown: 1,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "ManageChannels", "ViewChannel", "ReadMessageHistory"],
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "input",
    description: "Provide the channel name of the Target Ticket channel.",
    type: ApplicationCommandOptionType.String,
    required: true
  }],
  only_message: true,
  only_slash: true,
  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @param {string} args 
   * @param {string} lang 
   * @param {string} prefix 
   * @returns 
   */
  run: async (client, interaction, args, lang, prefix) => {
    let db = client.db;
    let author = interaction.guild.members.cache.find(m => m.id === interaction.member.id);
    let ticketName = interaction.user ? interaction.options.getString("input") : args.join(" ");
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    let ticketChannel = (await db.get(`guild_${interaction.guild.id}.tickets`)).find(c => c.channelId === interaction.channel.id);
    if (interaction.channel.name !== ticketChannel?.channelName) return errorMessage(client, interaction, `My Friend, here is not a ticket channel please use this command in other channel.`);
    if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
    if (!ticketName) return errorMessage(client, interaction, "Please enter ticket new name.");
    await db.set(`guild_${interaction.guild.id}.name_${interaction.channel.id}`, ticketName)
    let message = {
      embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ` + author.user.tag, iconURL: author.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.rename + '| Request To Change Ticket Name').setColor(client.colors.theme).setDescription("are you sure to change your ticket channel name??").setFooter({ text: "Change Name • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.rename).setLabel("Change Name").setCustomId("ticket-renameTicketTrue"), new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.x).setLabel("Cancel").setCustomId("ticket-renameTicketFalse"))]
    };
    let msg = interaction.user ? await interaction.followUp(message).then(async () => await interaction.fetchReply()) : await interaction.reply(message).then(m => m);
    setTimeout(async () => {
      await db.delete(`guild_${interaction.guild.id}.name_${interaction.channel.id}`);
      return await editResponse({
        interaction,
        message: msg,
        data: {
          components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true))]
        }
      });
    }, 60 * 1000);
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
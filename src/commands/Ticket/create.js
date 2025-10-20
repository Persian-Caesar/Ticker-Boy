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
  name: "create",
  description: "Create a ticket channel.",
  category: 'Ticket 🎫',
  aliases: ['ticket', 'create ticket', 't'],
  usage: "",
  cooldown: 1,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "ManageChannels", "ViewChannel", "ReadMessageHistory"],
  type: ApplicationCommandType.ChatInput,
  options: [],
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
    let ticket = (await db.get(`guild_${interaction.guild.id}.tickets`))?.find(c => c.user === author.user.id);
    let userTicketChannel = await interaction.guild.channels.cache.find(c => c.id === ticket?.channelId);
    let ticket_close = ticket?.closed;
    if (!ticket_close && userTicketChannel) return errorMessage(client, interaction, `️My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${userTicketChannel}`);
    let message = {
      embeds: [new EmbedBuilder().setTitle(`${client.emotes.ticket}| Create Ticket`).setColor(client.colors.theme).setTimestamp().setDescription(`If you want to create a ticket channel for yourself, you have to click to this emoji: "${client.emotes.ticket}" or else click to "${client.emotes.x}"`).setURL(config.discord.support.invite).setFooter({ text: `Create Ticket • Requested by ${author.user.tag} • ${client.embed.footerText}`, iconURL: author.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('ticket-cmdTicketCreate').setEmoji(client.emotes.ticket).setLabel("Create Ticket").setStyle(ButtonStyle.Success), new ButtonBuilder().setCustomId('cancel').setEmoji(client.emotes.x).setLabel('Cancel Process').setStyle(ButtonStyle.Danger))],
    };
    let msg = interaction.user ? await interaction.followUp(message).then(async () => await interaction.fetchReply()) : await interaction.reply(message).then(m => m);
    setTimeout(async () => {
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
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/
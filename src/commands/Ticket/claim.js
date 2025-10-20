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
  name: "claim",
  description: "Claim the ticket channel.",
  category: 'Ticket 🎫',
  aliases: ['cla', 'claim ticket'],
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
    // let author = interaction.guild.members.cache.find(m => m.id === interaction.member.id);
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    let claim_has = await db.get(`guild_${interaction.guild.id}.ticket_claim`);
    let ticketChannel = (await db.get(`guild_${interaction.guild.id}.tickets`)).find(c => c.channelId === interaction.channel.id);
    let ticketControl = ticketChannel?.user;
    if (interaction.channel.name !== ticketChannel?.channelName) return errorMessage(client, interaction, `My Friend, here is not a ticket channel please use this command in other channel.`);
    if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
    if (!claim_has) return errorMessage(client, interaction, `In this guild, the ticket claim system is disabled and you can't use it.`)
    let message = {
      embeds: [new EmbedBuilder().setColor(client.colors.theme).setTitle(`${client.emotes.claim}| Claim Ticket`).setDescription(`Dear friend, you requested for claim ${interaction.guild.members.cache.find(c => c.id === ticketControl)} ticket, are you sure for claim the ticket??`)],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId("cancel").setEmoji(client.emotes.x).setLabel("Don't Claim"), new ButtonBuilder().setStyle(ButtonStyle.Success).setCustomId("ticket-claimTicket").setEmoji(client.emotes.claim).setLabel("Claim It"))]
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
    }, 60 * 1000)
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
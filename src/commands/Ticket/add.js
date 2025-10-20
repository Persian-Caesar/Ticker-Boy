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
  name: 'add',
  description: "Adding a target user in to the ticket channel.",
  category: 'Ticket 🎫',
  aliases: ['ad', 'add user'],
  usage: "[mention-user]",
  cooldown: 1,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks", "ManageChannels", "ViewChannel", "ReadMessageHistory"],
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "member",
    description: "Select a member to adding in to the ticket channel.",
    type: ApplicationCommandOptionType.User,
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
    let member = interaction.user ? interaction.options.getMember('member') : interaction.mentions.users.first() || interaction.guild.members.cache.find(m => m.id === args[0]) || interaction.guild.members.cache.find(m => m.username === args.join(" "));
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    let ticketChannel = (await db.get(`guild_${interaction.guild.id}.tickets`))?.find(c => c.channelId === interaction.channel.id) || null;
    if (interaction.channel.name !== ticketChannel?.channelName) return errorMessage(client, interaction, `My Friend, here is not a ticket channel please use this command in other channel.`);
    if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
    if (!member) return errorMessage(client, interaction, `Mention user for add him on the ticket channel.`);
    await db.set(`guild_${interaction.guild.id}.new_member_${interaction.channel.id}`, member.id)
    let message = {
      embeds: [new EmbedBuilder().setAuthor({ name: `Requested by ` + author.user.tag, iconURL: author.user.displayAvatarURL({ dynamic: true }) }).setTitle(client.emotes.print + '| Request To Adding People To Ticket').setColor(client.colors.theme).setDescription("are you sure to add some one in to this ticket channel??").setFooter({ text: "Adding People • " + client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji(client.emotes.plus).setLabel("Add Member").setCustomId("ticket-addmemberTicket"), new ButtonBuilder().setStyle(ButtonStyle.Danger).setEmoji(client.emotes.x).setLabel("Cancel").setCustomId("ticket-canceladdmemberTicket")])]
    };
    let msg = interaction.user ? await interaction.followUp(message).then(async () => await interaction.fetchReply()) : await interaction.reply(message).then(m => m);
    setTimeout(async () => {
      await db.delete(`guild_${interaction.guild.id}.new_member_${interaction.channel.id}`);
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
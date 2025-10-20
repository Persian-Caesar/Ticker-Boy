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
} = require(`${process.cwd()}/src/functions/functions`);
const Transcript = require('discord-html-transcripts');
module.exports = {
  name: "transcript",
  description: "Create a transcript from the channel.",
  category: 'Ticket 🎫',
  aliases: ['trans', 'transcript ticket'],
  usage: "",
  cooldown: 10,
  user_permissions: ["SendMessages", "ManageChannels"],
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
    let admin_roles = await db.get(`guild_${interaction.guild.id}.admin_roles`);
    if (!interaction.member.roles.cache.some(r => admin_roles?.includes(r.id)) && !interaction.member.permissions.has([PermissionsBitField.Flags.ManageChannels])) return errorMessage(client, interaction, "```js\nyou are not have permissions for use this.\nPermissions Need: \"ManageChannels\" \n```");
    let file = await Transcript.createTranscript(interaction.channel, {
      limit: -1,
      returnType: 'attachment',
      filename: `transcript-${interaction.channel.name}.html`,
      saveImages: false,
      footerText: `Exported {number} - message {s} - ©️ Persian Caesar`,
      poweredBy: false
    });
    await author.user.send({
      files: [file],
      embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(`Creating the \`${interaction.channel.name}\` tikcet of ${interaction.guild.name} transcript have successfull.`).setTitle(`${client.emotes.success}| Successfully Transcript Created`).setAuthor({ name: `${interaction.channel.name} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
    });
    let message = {
      embeds: [new EmbedBuilder().setColor(client.colors.theme).setDescription(`Creating transcript of ${interaction.channel} for you and this will send you from dm so please wait as it may take a long time.`).setTitle(`${client.emotes.hamer}| Build Transcript For You`)],
      ephemeral: true
    };
    interaction.user ? await interaction.followUp(message).then(async () => await interaction.fetchReply()) : await interaction.reply(message).then(m => m);
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
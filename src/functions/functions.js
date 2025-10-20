const {
  ButtonBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandOptionType,
  Client,
  Message,
  Component,
  GuildChannel,
  WebhookClient
} = require("discord.js");
const config = require("../../config");
const colors = require("../storage/colors.json");
module.exports = {

  /**
   * 
   * @param {string} e 
   * @returns 
   */
  Error: function(e) {
    let webhook = new WebhookClient({ url: config.discord.support.webhook.url });
    let embed = new EmbedBuilder()
      .setTitle(`An error occurred`)
      .setDescription(`\`\`\`js\n${e.stack}\`\`\``)
      .setColor(colors.red);
    embed.addFields([{ name: `Name:`, value: `${e.name}` }]);
    if (e.code) embed.addFields([{ name: `Code:`, value: `${e.code}` }]);
    if (e.status) embed.addFields([{ name: `httpStatus:`, value: `${e.status}` }]);
    embed.addFields([{ name: `Timestamp:`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**` }]);
      
    webhook.edit({
        channelId: config.discord.support.log_channel
    })
    webhook.send({
      embeds: [embed],
      username: config.discord.support.webhook.username,
      avatarURL: config.discord.support.webhook.avatar,
      threadId: config.discord.support.log_channel
    });
  },

  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @param {GuildChannel} channel 
   * @param {string} description 
   * @param {string} reason 
   * @param {string} emote 
   * @param {boolean} has_file 
   * @param {ArrayBuffer} file 
   * @returns 
   */
  logMessage: async function(client, interaction, channel, description, reason, emote, has_file, file) {
    let member = interaction.guild.members.cache.find(m => m.id === interaction.member.id);
    if (has_file) {
      return channel.send({
        files: [file],
        embeds: [new EmbedBuilder().setTitle(`${emote}| ${reason}`).setColor(client.colors.none).setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true })).setDescription(`${description}`).setTimestamp().addFields([{ name: `**Requested By:**`, value: `**${member.user} | ${member.user.tag} | ${member.user.id}**`, inline: false }, { name: `**Target Channel:**`, value: `**${interaction.channel} | ${interaction.channel.name} | ${interaction.channel.id}**`, inline: false }, { name: `**Date:**`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`, inline: false }, { name: `**Reason:**`, value: `\`\`\`js\n${reason}\`\`\``, inline: false }]).setFooter({ text: `${interaction.guild.name} • Logs Information`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
    } else {
      return channel.send({
        embeds: [new EmbedBuilder().setTitle(`${emote}| ${reason}`).setColor(client.colors.none).setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true })).setDescription(`${description}`).setTimestamp().addFields([{ name: `**Requested By:**`, value: `**${member.user} | ${member.user.tag} | ${member.user.id}**`, inline: false }, { name: `**Target Channel:**`, value: `**${interaction.channel} | ${interaction.channel.name} | ${interaction.channel.id}**`, inline: false }, { name: `**Date:**`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`, inline: false }, { name: `**Reason:**`, value: `\`\`\`js\n${reason}\`\`\``, inline: false }]).setFooter({ text: `${interaction.guild.name} • Logs Information`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
    }
  },

  

  /**
   * 
   * @param {number} ms 
   */
  wait: async function(ms) {
    let start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  },

  /**
   * 
   * @param {number} number 
   */
  checkPing: async function(number) {
    let reaction = "🟢 Excellent";
    if (Number(number) > 70) reaction = "🟢 Good";
    if (Number(number) > 170) reaction = "🟡 Not Bad";
    if (Number(number) > 350) reaction = "🔴 Soo Bad";
    return reaction;
  },

  /**
   * 
   * @param {number} min 
   * @param {number} max 
   * @returns 
   */
  randomRange: async function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
const {
  errorMessage
} = require(`${process.cwd()}/src/functions/functions`);
const Discord = require("discord.js");
const config = require("../../../config");
module.exports = {
  name: 'invite',
  description: 'Invite the bot to your own guild.',
  category: 'Information 📊',
  // type: Discord.ApplicationCommandType.ChatInput,
  cooldown: 2,
  aliases: ['in', 'invite me'],
  usage: "",
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "ephemeral",
    description: "Hide this message from everyone.",
    type: Discord.ApplicationCommandOptionType.String,
    choices: [{
      name: 'Enable',
      value: 'true'
    }, {
      name: 'Disable',
      value: 'false'
    }],
    required: false
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
    let mes = client.languages[lang].commands.invite;
    let message = {
      components: [new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel(mes.button.btn1).setEmoji(client.emotes.invite).setURL(`${config.discord.default_invite.replace("{clientId}", client.user.id)}`)).addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel(mes.button.btn2).setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`))],
      embeds: [new Discord.EmbedBuilder().setThumbnail(client.user.displayAvatarURL({ format: "png" })).setTitle(mes.embed.title).setDescription(mes.embed.description.replaceAll("{link}", config.discord.default_invite.replace("{clientId}", client.user.id))).setURL(`${config.discord.support.invite}`).setColor(client.colors.theme)]
    };
    interaction.user ? await interaction.followUp(message) : await interaction.reply(message).then(m => m);
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
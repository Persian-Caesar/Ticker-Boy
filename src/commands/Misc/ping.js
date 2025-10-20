const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  Client,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const editResponse = require("../../functions/editResponse");
const {
  checkPing
} = require(`${process.cwd()}/src/functions/functions.js`);
module.exports = {
  name: "ping",
  description: "Get bot latency and ping.",
  category: "Information 📊",
  type: ApplicationCommandType.ChatInput,
  cooldown: 2,
  aliases: ["pong"],
  usage: "",
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "ephemeral",
    description: "Hide this message from everyone.",
    type: ApplicationCommandOptionType.String,
    choices: [{
      name: "Enable",
      value: "true"
    }, {
      name: "Disable",
      value: "false"
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
   * @returns {void}
   */
  run: async (client, interaction, args, lang, prefix) => {
    const mes = client.languages[lang].commands.ping;
    const member = interaction.guild.members.cache.get(interaction.member.id);
    const message = {
      embeds: [new EmbedBuilder().setColor(client.colors.theme).setDescription(mes.embed1.description).setTimestamp()],
      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setDisabled(true).setStyle(ButtonStyle.Primary).setCustomId("loading").setEmoji("🔃").setLabel(mes.button.btn1))]
    };
    const msg = interaction.user ? await interaction.followUp(message) : await interaction.reply(message).then(m => m);
    return await editResponse({
      interaction,
      message: msg,
      data: {
        embeds: [new EmbedBuilder().setThumbnail(client.user.displayAvatarURL()).setColor(client.colors.theme).setDescription(mes.embed2.description.replaceAll("{emote_ping}", client.emotes.ping)).addFields([{ name: mes.embed2.field1.name, value: mes.embed2.field1.value.replaceAll("{ping}", Date.now() - interaction.createdTimestamp).replaceAll("{checkping}", await checkPing(`${Date.now() - interaction.createdTimestamp}`)), inline: false }, { name: mes.embed2.field2.name, value: mes.embed2.field2.value.replaceAll("{ping}", Math.round(client.ws.ping)).replaceAll("{checkping}", await checkPing(`${Math.round(client.ws.ping)}`)), inline: false }]).setTimestamp().setFooter({ text: mes.embed2.footer.replaceAll("{user}", member.user.tag), iconURL: `${member.user.displayAvatarURL()}` })],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setDisabled(true).setStyle(ButtonStyle.Success).setCustomId("pong").setEmoji(client.emotes.ping).setLabel(mes.button.btn2))]
      }
    });
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
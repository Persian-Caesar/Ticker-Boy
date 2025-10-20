const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const {
  errorMessage
} = require(`${process.cwd()}/src/functions/functions`);
module.exports = {
  name: 'dbset',
  description: 'Setup datas on db storage.',
  category: 'Owner 👑',
  cooldown: 1,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  aliases: ["ds"],
  usage: "",
  only_message: true,
  only_slash: false,
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
    try {
      if (!client.config.owner.some(r => r.includes(interaction.author.id))) return; //errorMessage(client, interaction, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`);
      let arg = args[0];
      if (!arg) return errorMessage(client, interaction, `> do not forget database arg.`);
      let setup = args.slice(1).join(" ")
      if (!setup) return errorMessage(client, interaction, `> do not forget database setupping datas.`);
      await client.db.set(arg, JSON.stringify(setup)).then(() => {
        interaction.reply({
          content: `Data is successfully setuped.`
        })
      })
    } catch (e) {
      errorMessage(client, interaction, `\`\`\`js\n${e}\n\`\`\``)
    }
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
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
  name: 'serverleave',
  description: 'Leaving guilds with id or guilds below 50 members.',
  category: 'Owner 👑',
  cooldown: 1,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  aliases: ["sv"],
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
      await interaction.reply({ content: `Trying to leave guilds with less than 50 members...` })
        .then(async (msg) => {
          try {
            client.guilds.cache.forEach(guild => {
              if (guild.memberCount < 50) {
                if (client.config.whitelist_guilds.some(r => r.includes(guild.id))) return;
                setTimeout(() => {
                  guild.leave()
                }, 5000)
              }
            })
            await msg.edit({ content: `process is successfully, I have leave guilds for you.` })
          } catch (e) {
            await msg.edit({ content: `\`\`\`js\n${e}\`\`\`` })
            console.log(e)
          }
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
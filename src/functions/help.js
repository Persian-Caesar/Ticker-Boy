const {
  EmbedBuilder,
  Client,
  Message,
  Component
} = require("discord.js");
const selectLanguage = require("./selectLanguage");
const config = require("../../config");
module.exports = {
  /*HelpCategoryEmbed: async function(prefix, CategoryName, client, message, component) {
    let db = client.db;
    let lang = await db.has(`guild_${message.guild.id}.language`) ? await db.get(`guild_${message.guild.id}.language`) : client.config.default_language;
    let mes = client.languages[lang].commands.help;
    let member = message.guild.members.cache.find(m => m.id === message.member.id);
    let embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: `${mes.embed1.author.replace("{username}", client.user.username)}`
      })
      .setTitle(`${CategoryName}`)
      .setFooter({
        text: `${mes.embed1.footer.replace("{user}", member.user.tag)}`,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setColor(client.colors.theme)

    let value_1 = "";
    let value_2 = "";
    client.commands.filter(c => c.category === CategoryName).forEach((cmd) => {
      value_1 += `\n\n**${prefix}${cmd.name} ${cmd.usage ? cmd.usage : ""}**\n${mes.embed3.field1.value.replaceAll("{aliases}", cmd.aliases ? cmd.aliases.map(a => `\`${a}\``).join(', ') : "`no aliases`").replaceAll("{description}", cmd.description)}`
    })
    client.slashCommands.filter(c => c.category === CategoryName).forEach((cmd) => {
      let cm = client.application.commands.cache.find(c => c.name === cmd.name)
      let name = []
      let bb = cm.options ? cm.options.some(op => op.type === ApplicationCommandOptionType.Subcommand) ? cm.options.map((option) => { name.push(cm.name + " " + option.name) }) : name.push(`${cm.name}`) : name.push(`${cm.name}`)
      name.forEach(nm => {
        value_2 += `\n\n**${`</${nm}:${cm.id}>`}**\n${mes.embed3.field2.value.replaceAll("{description}", cm.options.some(op => op.type === ApplicationCommandOptionType.Subcommand) ? cm.options.map(op => op.name === nm.slice(`${cm.name} `.length) ? op.description : "").join("") : `${cm.description}`)}`;
      })
    })
    embed.addFields([{
      name: `${mes.embed3.field1.name}`,
      value: `${value_1 ? value_1 : mes.embed3.field1.value2}`,
      inline: false
    }, {
      name: `${mes.embed3.field2.name}`,
      value: `${value_2 ? value_2 : mes.embed3.field2.value2}`,
      inline: false
    }]);
    return message.update({
      embeds: [embed],
      components: component
    })
  },*/

  /**
   * 
   * @param {string} prefix 
   * @param {string} CategoryName 
   * @param {Client} client 
   * @param {Message} message 
   * @param {Component} component 
   * @returns 
   */
  HelpCategoryEmbed: async function (prefix, CategoryName, client, message, component) {
    let db = client.db;
    let lang = await db.has(`guild_${message.guild.id}.language`) ? await db.get(`guild_${message.guild.id}.language`) : config.source.default_language;
    let mes = selectLanguage(lang).commands.help;
    let member = message.guild.members.cache.find(m => m.id === message.member.id);
    let embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: `${mes.embed1.author.replace("{username}", client.user.username)}`
      })
      .setTitle(`${CategoryName}`)
      .setFooter({
        text: `${mes.embed1.footer.replace("{user}", member.user.tag)}`,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setColor(client.colors.theme)

    let value = "";
    client.commands.filter(c => c.category === CategoryName).forEach((cmd) => {
      let cm = client.application.commands.cache.find(c => c.name === cmd.name);
      value += `\n\n**${cm ? `</${cmd.name}:${cm.id}> | ` : ""}${prefix}${cmd.name} ${cmd.usage ? cmd.usage : ""}**\n${mes.embed3.description.value.replaceAll("{aliases}", cmd.aliases ? cmd.aliases.map(a => `\`${a}\``).join(', ') : "`no aliases`").replaceAll("{description}", cmd.description)}`;
    });
    embed.setDescription(`${value ? value : mes.embed3.description.name}`);
    return message.update({
      embeds: [embed],
      components: component
    })
  },
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
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const {
   errorEmbed 
} = require("../../functions/functions");
module.exports = {
  name: 'serverlist',
  aliases: ['list','slist','sl'],
  category: 'Owner 👑',
  description: 'list of all servers bot join.',
  usage: "",
  cooldown: 6,
run: async function(bot, message, args, prefix){
  if (!bot.config.owner.some(r => r.includes(message.author.id)))
  return message.reply({
                  embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + message.author.username,
                      iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(`> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${bot.config.owner.map(id => `<@${id}>`)}**`)
                    .setTitle('⛔️| **We Got An Error**')
                    .setColor(bot.colors.none)
                    .setFooter({
                      text: "Error | created by Mr.SIN RE#1528",
                      iconURL: message.guild.iconURL({ dynamic: true })
                    })],
                  components: [new MessageActionRow()
                    .addComponents(new MessageButton()
                      .setStyle("DANGER")
                      .setLabel("Error")
                      .setEmoji("⚠️")
                      .setCustomId("error")
                      .setDisabled(true))
                  ]
              })

  const Guilds =  bot.guilds.cache.array().map((G, I) => `${I + 1}. **${G.name}** - **${G.id}**`).join("\n");
  if (!Guilds) return message.reply("No Guild");
  return message.reply(Guilds, { split: { char: "\n" } });
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
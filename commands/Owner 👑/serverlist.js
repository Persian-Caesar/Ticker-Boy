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

  let i0 = 0;
  let i1 = 10;
  let page = 1;

  let description =
    `Total Servers - ${bot.guilds.cache.size}\n\n` +
    bot.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .map(r => r)
      .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
      .slice(0, 10)
      .join("\n");

  let embed = new MessageEmbed()
    .setAuthor({
      name: message.author.tag,
      iconURL: message.author.displayAvatarURL({ dynamic: true })
    })
    .setColor(bot.colors.none)
    .setFooter(bot.user.username)
    .setTitle(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 10)}`)
    .setDescription(description);

  let msg = await message.reply({ 
                              embeds:[embed]
                          });
  await msg.react("⬅");
  await msg.react("➡");
  await msg.react("❌");

  let collector = msg.createReactionCollector(
    (reaction, user) => user.id === message.author.id
  );

  collector.on("collect", async (reaction, user) => {
    if (reaction.emoji.name === "⬅") {
      // Updates variables
      i0 = i0 - 10;
      i1 = i1 - 10;
      page = page - 1;

      // if there is no guild to display, delete the message
      if (i0 + 1 < 0) {
        console.log(i0)
        return msg.delete();
      }
      if (!i0 || !i1) {
        return msg.delete();
      }

      description =
        `Total Servers - ${bot.guilds.cache.size}\n\n` +
        bot.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map(
            (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
          )
          .slice(i0, i1)
          .join("\n");

      // Update the embed with new informations
      embed
        .setTitle(
          `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
        )
        .setDescription(description);

      // Edit the message
      msg.edit(embed);
    }

    if (reaction.emoji.name === "➡") {
      // Updates variables
      i0 = i0 + 10;
      i1 = i1 + 10;
      page = page + 1;

      // if there is no guild to display, delete the message
      if (i1 > bot.guilds.cache.size + 10) {
        return msg.delete();
      }
      if (!i0 || !i1) {
        return msg.delete();
      }

      description =
        `Total Servers - ${bot.guilds.cache.size}\n\n` +
        bot.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map(
            (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
          )
          .slice(i0, i1)
          .join("\n");

      // Update the embed with new informations
      embed
        .setTitle(
          `Page - ${page}/${Math.round(bot.guilds.cache.size / 10 + 1)}`
        )
        .setDescription(description);

      // Edit the message
      msg.edit(embed);
    }

    if (reaction.emoji.name === "❌") {
      return msg.delete();
    }

    // Remove the reaction when the user react to the message
    await reaction.users.remove(message.author.id);
  });
  }
}
/**
 *
  const Guilds =  bot.guilds.cache.array().map((G, I) => `${I + 1}. **${G.name}** - **${G.id}**`).join("\n");
  if (!Guilds) return message.channel.send("No Guild");
  return message.channel.send(Guilds, { split: { char: "\n" } }); 
  
 */
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
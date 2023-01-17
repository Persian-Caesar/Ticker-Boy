const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'serverlist',
  aliases: ['list','slist','sl'],
  category: 'Owner 👑',
  description: 'list of all servers bot join.',
  usage: "",
  cooldown: 6,
run: async function(bot, message, args, prefix){
  if (!bot.config.owner.some(r => r.includes(message.author.id)))
  return errorMessage(bot, message, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${bot.config.owner.map(id => `<@${id}>`)}**`)

  const Guilds =  bot.guilds.cache.sort((a, b)=> a.memberCount > b.memberCount).map((G, I) => `${I + 1}. **[${G.name}](${G.channels.cache.filter(x => x.type === 'GUILD_TEXT').random(1)[0].createInvite({ maxAge: 0, maxUses: 5 }).url})** - **${G.id}** - \`${G.memberCount}\``).join("\n");
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
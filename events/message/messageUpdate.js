const { 
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Collection,
  Permissions
} = require("discord.js");
const db = require('quick.db');
module.exports = async (client, oldmessage, newmessage) => {
//======== Command for shows the prefix ========
    if (newmessage.author.bot || newmessage.channel.type === 1) return;//a direct message between users
    let logsChannel = newmessage.guild.channels.cache.find(c => c.id === db.get(`modlog_${newmessage.guild.id}`));
      if (newmessage.content === `<@!${client.user.id}>` || newmessage.content === `<@${client.user.id}>` || newmessage.content === `${client.prefix}prefix`) {
      let errorprefixEmbed = new MessageEmbed()
            .setColor(client.colors.none)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription(`My prefix in this guild is "**${require('quick.db').fetch(`prefix_${newmessage.guild.id}`)||client.prefix}**". `)
            .setAuthor({
              name: `prefix of ${client.user.tag} shows👌🏻`,
              iconURL: client.user.displayAvatarURL()
            })
            .setFooter({
              text: `prefix shows to ${newmessage.author.tag} |`,
              iconURL: newmessage.author.displayAvatarURL({ dynamic: true })
            })
     newmessage.reply({
       embeds: [errorprefixEmbed]
     })
  }

//======== Command Prefix & args ========
    const Tprefix = await db.fetch(`prefix_${newmessage.guild.id}`)||client.prefix;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix)})\\s*`);
  if (!prefixRegex.test(newmessage.content)) return;

  const [ prefix] = newmessage.content.match(prefixRegex);
    if (newmessage.content.indexOf(prefix) !== 0) return;
    const args = newmessage.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if(commandName.length > 0){
      if (!command||!command.name||!command.aliases) {
        return //newmessage.reply(`**${client.emotes.error}| It seems like \`${commandName}\` is not a valid command! Please try Again!**`)
      }
}

//======== Check Perms =========
    if(!newmessage.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return newmessage.author.send({content: `${client.emotes.off}| I am missing the Permission to \`SEND_MESSAGES\` at ${newmessage.guild.name}`,})
    if(!newmessage.guild.me.permissions.has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) 
    return newmessage.reply({content: `${client.emotes.off}| I am missing the Permission to \`USE_EXTERNAL_EMOJIS\``})
    if(!newmessage.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) 
    return newmessage.reply({content: `${client.emotes.error}| I am missing the Permission to \`EMBED_LINKS\``})
  
//======== Command Cooldown ========
   if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;

  if (timestamps.has(newmessage.author.id)) {
    const expirationTime = timestamps.get(newmessage.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
          return newmessage.reply({
              embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setDescription(`**${client.emotes.alert}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
              ]
          })
    }
  }
  timestamps.set(newmessage.author.id, now);
  setTimeout(() => timestamps.delete(newmessage.author.id), cooldownAmount);
 
//======== Command Handler ========
try{
  if (command) command.run(client, newmessage, args, prefix, logsChannel);
 } catch (error) {
    //console.error(error);
    //newmessage.reply(`${client.emotes.error}| There was an error executing that command.`).catch(console.error);
  }
};
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */
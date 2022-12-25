const { 
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Collection,
  Permissions
} = require("discord.js");
const db = require('quick.db');
module.exports = async (client, message) => {
      if(message.channel.type === "DM"){//a direct message between users
        if(message.author.bot) return;
        if(message.content.includes('@'))return message.channel.send(client.emotes.entry+"| **you can't mention someone.**")
      const server = client.guilds.cache.get(client.config.discord.server_id);
      const channelbug = server.channels.cache.get(client.config.discord.server_channel_report);
        const embed = new MessageEmbed()
          .setColor(client.colors.none)
          .setAuthor({
            name: `${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
          })
          .setTimestamp()
          .setTitle(`This Guy Have Report, User ID "${message.author.id}"`)
          .setDescription(`> ${message.content}`)

             message.reply({
              content: ` \`\`\`js\n ${client.emotes.success}| Successfuly your report or bug${client.emotes.report} message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
              components: [new MessageActionRow()
                .addComponents([new MessageButton()
                  .setStyle('LINK')
                  .setLabel('Invite Me')
                  .setEmoji('🤖')
                  .setURL(client.config.discord.invite)
                ],[new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Support Server!')
                    .setEmoji('🧰')
                    .setURL(`${client.config.discord.server_support}`)
                ]) 
              ] 
             })
        channelbug.send(embed).then((msg)=> {
          msg.react(client.emotes.report)
         })
    };

//======== Command for shows the prefix ========
    if (message.author.bot || message.channel.type === 1) return;//a direct message between users
    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`modlog_${message.guild.id}`));
      if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>` || message.content === `${client.prefix}prefix`) {
      let errorprefixEmbed = new MessageEmbed()
            .setColor(client.colors.none)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription(`My prefix in this guild is "**${require('quick.db').fetch(`prefix_${message.guild.id}`)||client.prefix}**". `)
            .setAuthor({
              name: `prefix of ${client.user.tag} shows👌🏻`,
              iconURL: client.user.displayAvatarURL()
            })
            .setFooter({
              text: `prefix shows to ${message.author.tag} |`,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
     message.reply({
       embeds: [errorprefixEmbed]
     })
  }

//======== Command Prefix & args ========
    const Tprefix = await db.fetch(`prefix_${message.guild.id}`)||client.prefix;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [ prefix] = message.content.match(prefixRegex);
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if(commandName.length > 0){
      if (!command||!command.name||!command.aliases) {
        return //message.reply(`**${client.emotes.error}| It seems like \`${commandName}\` is not a valid command! Please try Again!**`)
      }
}

//======== Check Perms =========
    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return message.author.send({content: `${client.emotes.off}| I am missing the Permission to \`SEND_MESSAGES\` in ${message.channel}`,})
    if(!message.guild.me.permissions.has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) 
    return message.reply({content: `${client.emotes.off}| I am missing the Permission to \`USE_EXTERNAL_EMOJIS\``})
    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) 
    return message.reply({content: `${client.emotes.error}| I am missing the Permission to \`EMBED_LINKS\``})
  
//======== Command Cooldown ========
   if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
          return message.reply({
              embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setDescription(`**${client.emotes.alert}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
              ]
          })
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 
//======== Command Handler ========
try{
  if (command) command.run(client, message, args, prefix, logsChannel);
 } catch (error) {
    //console.error(error);
    //message.reply(`${client.emotes.error}| There was an error executing that command.`).catch(console.error);
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
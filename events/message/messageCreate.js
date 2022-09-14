const { 
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");
const {
  commandsCoolDown
} = require('../../functions/functions.js');
const db = require('quick.db');
module.exports = async (client, message) => {
      if(message.channel.type === 'dm'){
        if(message.member.bot) return;
        if(message.content.includes(`@everyone`)) return;
        if(message.member.id === client.user.id)return;
        if(message.content.includes('@'))return message.channel.send(client.emotes.entry+"| **you can't mention someone.**")
      const sizarTMserver = client.guilds.cache.get(client.config.discord.server_id);
      const channelbug = sizarTMserver.channels.cache.get(client.config.discord.server_channel_report);
        const embed = new MessageEmbed()
          .setColor(client.colors.none)
          .setAuthor({
            name: `${message.member.username}`,
            iconURL: message.member.displayAvatarURL({ dynamic: true })
          })
          .setTimestamp()
          .setTitle(`This Guy Have Report, User ID "${message.member.id}"`)
          .setDescription(`> ${message.content}`)
        channelbug.send(embed).then((msg)=> {
          msg.react(client.emotes.report)
         }).then(
             message.reply({
              content: client.emotes.success + `| \`\`\`js\n ${client.emotes.report}| Successfuly your report or bug message send to My Developers ${bot.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
              components: [new MessageActionRow()
                .addComponents([new MessageButton()
                  .setStyle('LINK')
                  .setLabel('Invite Me')
                  .setEmoji('🤖')
                  .setURL(bot.config.discord.invite)
                ],[new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Support Server!')
                    .setEmoji('🧰')
                    .setURL(`${bot.config.discord.server_support}`)
                ]) 
              ] 
             })
            )
    }
    if (message.author.bot || message.channel.type === 'dm') return;

//======== Command for shows the prefix ========
    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));
    const art = message.content.slice((client.prefix || message.content.match(new RegExp(`^<@!?${client.user.id}>`))).length).trim().split(/ +/g);
    const cod = art.shift().toLowerCase();
      if (cod === `prefix`) {
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
              text: `prefix shows to ${message.member.tag} |`,
              iconURL: message.member.displayAvatarURL({ dynamic: true })
            })
     message.reply({
       embeds: [errorprefixEmbed]
     })
  }

//======== Command Prefix & args ========
    const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
    const prefix = await db.fetch(`prefix_${message.guild.id}`)||message.content.match(prefixMention)|| client.prefix;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
      if (!cmd || !cmd.name||!cmd.aliases) {
        return message.reply(`**${client.emotes.error}| It seems like \`${command}\` is not a valid command! Please try Again!**`)
      }
      
//======== Command Cooldown ========
    commandsCoolDown(client, message, cmd)

//======== Command Handler ========
    if(cmd) cmd.run(client, message, args, prefix, logsChannel);

};
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
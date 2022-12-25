const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
module.exports = {
    name: 'report',
    aliases: ['bug','rp'],
    category: 'Help 🆘',
    usage: '[report-text]',
    description: 'for report bot bugs to developers :)',
    cooldown: 6,
   run: async function(client, message, args, prefix, logsChannel){
const choice = args.slice().join(" ");
        if (!choice){
 return message.reply({
     content: "Please write the text of your report on the command to be checked or visit the bot support server and share it with the creators in a special chat room or in the buggy ticket ticket.",
      components: [new MessageActionRow()
        .addComponents([new MessageButton()
            .setStyle('LINK')
            .setLabel('Invite Me')
             .setEmoji(client.emotes.invite)
                 .setURL(client.config.discord.invite)],[new MessageButton()
            .setStyle('LINK')
            .setLabel('Support Server!')
             .setEmoji(client.emotes.help)
       .setURL(`${client.config.discord.server_support}`)])
            ] 
    })
}else {
      const channelbug = client.channels.cache.get(client.config.discord.server_channel_report);
        let invite = await message.channel.createInvite({
            maxAge: 0, 
            maxUses: 5
        }, )

     const soal = new MessageEmbed()
      .setAuthor(`${message.author.tag}`,message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setTitle(`This Guy Have a Report, User ID: "${message.author.id}"`)
      .setColor('#2F3136')
      .addField(`> **User :**`,`${client.emotes.reply}${message.author}`,true)
      .addField(`> **Send :**` ,`${client.emotes.reply}${choice}`,true) 
      .addField(`> **Server :**`, `${client.emotes.reply}${invite.url}`,true)
      .setURL(invite.url)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter({ 
         text: `Requested By ${message.author.tag}`,
         iconURL: client.user.displayAvatarURL({ dynamic: true })
      })
    channelbug.send({ embeds: [soal] }).then((msg)=> {
      msg.react(client.emotes.report)
     })
        message.reply({
            content: 'Your bug request or comment was sent to the support server, or the admins join the server and solve it, or request a friend. Thanks.',
           components: [new MessageActionRow()
        .addComponents([new MessageButton()
            .setStyle('LINK')
            .setLabel('Support Server!')
             .setEmoji(client.emotes.help)
       .setURL(`${client.config.discord.server_support}`)])
            ] 
            })
     
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
const {
   MessageActionRow,
   MessageButton,
   MessageEmbed,
   Permissions,
   MessageSelectMenu
} = require("discord.js");
const db = require("quick.db");
module.exports = {
   name: 'help',
   aliases: ['h','help me','komak'],
   category: 'Help 🆘',
   usage: '[command-name]',
   description:'this shows you bot commands and categorys to help you.',
   cooldown: 6,
   run: async function(client, message, args, prefix, logsChannel){
//======== Embeds
  let help = new MessageEmbed()
   .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
   .setTitle(`${client.user.username} Help Commands :)`)
   .setURL(client.config.discord.server_support)
   .setFooter({ 
      text: `Message Guild ${message.guild.name} • ${client.embed.footerText}`, 
      iconURL: client.embed.footerIcon
   })
   .setAuthor({ 
      name: `Requested by ${message.author.tag}`, 
      iconURL: message.member.displayAvatarURL({ dynamic: true }) 
    })
   .setColor(client.colors.none)
   .setDescription(`**this embed show you bot commands and categorys.**`)
   .addField(`Commands[\`${client.commands.size}\`] & SlashCommands[\`${client.slashCommands.size}\`] Categories `,`${'**' + client.categories.map(i => '`' + i + '`').join(' , ') + '**'}`,false)
   .addField(`Help 🆘 [${client.commands.filter(c => c.category === 'Help 🆘').size}]`,`This category of commands is to request help from bot founders and see all bot commands.`,true)
   .addField(`Infos 📊 [${client.commands.filter(c => c.category === 'Infos 📊').size}]`,`Using these commands, you can get the information you want about the bot.`,true)
   .addField(`Setup 💻 [${client.commands.filter(c => c.category === 'Setup 💻').size}]`,`Using these bot commands, you can configure the bot on your server.\nThese commands are for server admins only.`,true)
   .addField(`Ticket 🎫 [${client.commands.filter(c => c.category === 'Ticket 🎫').size}]`,`With these bot commands, you can create private channels to communicate with admins and other important people, which we call these channels, channel tickets. These commands are all related to ticket channels.`,true)
   .addField(`VIP 💎 [${client.commands.filter(c => c.category === 'VIP 💎').size}]`,`This batch of bot commands is for important people who have purchased bot premium.\nIn order to use these commands, you need to buy the bot insurance premium to become one of the special people.\n(These commands are locked for others)`,true)
   .addField(`Owner 👑 [${client.commands.filter(c => c.category === 'Owner 👑').size}]`,`This category of bot commands is only for founders and cannot be used by other people.\nThese commands are for editing the bot and setting it up.`,true)
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
   .setTimestamp()
   .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support||"https://discord.gg/5GYNec4urW"})**`,false)

 if (args[0]) {
  const cmd = client.commands.get(args[0].toLowerCase());
      if (!cmd || !cmd.name||!cmd.aliases) {
        return message.reply(`**${client.emotes.error}| It seems like \`${args[0].toLowerCase()}\` is not a valid command! Please try Again!**`)
      }
   const embed = new MessageEmbed()
      .setColor(client.colors.none)
      .addField('Name', cmd.name)
      .addField('Description', cmd.description || 'No Description provided!')
      .addField('Aliase(s)', cmd.aliases.map((a) => `**\`${a}\`**`).join(", ") || 'No Aliases provided!')
      .setFooter({ 
         text: `${client.user.tag} Help • more info ${prefix}help • ${client.embed.footerText}`, 
         iconURL: client.embed.footerIcon
      })
      .setAuthor({ 
         name: `Requested by ${message.author.tag}`, 
         iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support})**`)
     if (cmd.usage) {
      var usages = cmd.usage.split('\n').map(i => { return client.prefix + i})
       if (cmd.cooldown) embed.addField('Cooldown', `**\`${cmd.cooldown} Seconds\`**`)
        embed.addField('Usage', `**\`${usages.join('` \n`')}\`**`)
     }
    return message.reply({ 
             embeds: [embed], 
             components: [new MessageActionRow()
               .addComponents([new MessageButton()
                 .setStyle('LINK')
                 .setLabel('Invite Me')
                 .setEmoji(client.emotes.invite)
                 .setURL(client.config.discord.invite)
               ],[new MessageButton()
                   .setStyle('LINK')
                   .setLabel('Support Server!')
                   .setEmoji(client.emotes.help)
                   .setURL(`${client.config.discord.server_support}`)
               ]) 
             ]
            })
   }else{
    let help_menu = new MessageSelectMenu()
    .setCustomId("help_menu")
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder(`${client.emotes.help}| Click me to show bot commands !!`)
    .addOptions([
          {
              label: 'Infos Help',
              value: 'inf',
              description: 'send commands of Infos📊 Category',
              emoji: {
                name: '📊',
              },
          },
          {
              label: 'Setup Help',
              value: 'stp',
              description: 'send commands of Setup💻 Category',
              emoji: {
                name: '💻',
              },
          },
          {
              label: 'Ticket Help',
              value: 'tic',
              description: 'send commands of Ticket🎫 Category',
              emoji: {
                name: '🎫',
              },
          },
          {
              label: 'VIP Help',
              value: 'vip',
              description: 'send commands of VIP💎 Category',
              emoji: {
                name: '💎',
              },
          },
            {
              label: 'Owner Help',
              value: 'owr',
              description: 'send commands of Owner👑 Category',
              emoji: {
                name: '👑',
              },
          },
    ])

    db.set(`help_member_${message.guild.id}_${message.channel.id}`, message.member.id)
    return message.reply({
                      embeds: [help], 
                      components: [new MessageActionRow()
                        .addComponents(help_menu),
                        new MessageActionRow()
                        .addComponents([new MessageButton()
                          .setStyle('LINK')
                          .setLabel('Invite Me')
                          .setEmoji(client.emotes.invite)
                          .setURL(client.config.discord.invite)
                        ],[new MessageButton()
                            .setStyle('LINK')
                            .setLabel('Support Server!')
                            .setEmoji(client.emotes.help)
                            .setURL(`${client.config.discord.server_support}`)
                        ])
                     ]
    }).then(msg=>{
      setTimeout(()=>{
        help_menu.setDisabled(true)
        msg.edit({
          embeds: [help],
          components: [new MessageActionRow()
            .addComponents(help_menu),
            new MessageActionRow()
            .addComponents([new MessageButton()
              .setStyle('LINK')
              .setLabel('Invite Me')
              .setEmoji(client.emotes.invite)
              .setURL(client.config.discord.invite)
            ],[new MessageButton()
                .setStyle('LINK')
                .setLabel('Support Server!')
                .setEmoji(client.emotes.help)
                .setURL(`${client.config.discord.server_support}`)
            ])
         ]
        })
        db.delete(`help_member_${message.guild.id}_${message.channel.id}`)
    },70*1000)
    })
   }
 }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
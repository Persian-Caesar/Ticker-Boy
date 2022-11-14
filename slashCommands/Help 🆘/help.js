const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed
 } = require('discord.js');
const db = require("quick.db");
const { 
  HelpCategoryEmbed
} = require('../../functions/functions.js');
module.exports = {
    name: 'help',
  description: 'this shows you bot commands and categorys to help you.',
  category: 'Help 🆘',
  cooldown: 1,
  userPermissions: [""],
  botPermissions: [""],
  options: [{
    name: "report_message",
    description: "for report bot bugs to developers. | please provide the report message.",
    type: "STRING",
    required: false
},
{
  name: "command_name",
  description: "this help you to show more information any command you need. | please provide the command name.",
  type: "STRING",
  required: false,
}],

  run: async (client, interaction, args) => {

//======== Embeds
var prefix = await db.fetch(`prefix_${interaction.guild.id}`)||client.prefix;
let help = new MessageEmbed()
  .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
  .setTitle(`${client.user.tag} Help Commands :)`)
  .setURL(client.config.discord.server_support)
   .setFooter({ 
      text: `Message Guild ${interaction.guild.name} • ${client.embed.footerText}`, 
      iconURL: client.embed.footerIcon
   })
  .setAuthor({ 
     name: `Requested by ${interaction.user.tag}`, 
     iconURL: interaction.member.displayAvatarURL({ dynamic: true }) 
  })
  .setColor(clienr.colors.none)
  .setDescription(`**this embed show you bot commands and categorys.**`)
  .addField(`Commands[\`${client.commands.size}\`] & SlashCommands[\`${client.slashCommands.size}\`] Categories `,`${'**' + client.categories.map(i => '`' + i + '`').join(' , ') + '**'}`,false)
  .addField(`Help 🆘 [${client.commands.filter(c => c.category === 'Help 🆘').size}]`,`This category of commands is to request help from bot founders and see all bot commands.`,true)
  .addField(`Infos 📊 [${client.commands.filter(c => c.category === 'Infos 📊').size}]`,`Using these commands, you can get the information you want about the bot.`,true)
  .addField(`Setup 💻 [${client.commands.filter(c => c.category === 'Setup 💻').size}]`,`Using these bot commands, you can configure the bot on your server.\nThese commands are for server admins only.`,true)
  .addField(`Ticket 🎫 [${client.commands.filter(c => c.category === 'Ticket 🎫').size}]`,`With these bot commands, you can create private channels to communicate with admins and other important people, which we call these channels, channel tickets.These commands are all related to ticket channels.`,true)
  .addField(`VIP 💎 [${client.commands.filter(c => c.category === 'VIP 💎').size}]`,`This batch of bot commands is for important people who have purchased bot premium.\nIn order to use these commands, you need to buy the bot insurance premium to become one of the special people.\n(These commands are locked for others)`,true)
  .addField(`Owner 👑 [${client.commands.filter(c => c.category === 'Owner 👑').size}]`,`This category of bot commands is only for founders and cannot be used by other people.\nThese commands are for editing the bot and setting it up.`,true)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support})**`,false)

try {
const choice = interaction.options.getString("report_message");
if(choice){
  const sizarTMserver = client.guilds.cache.get(client.config.discord.server_id);
  const channelbug = sizarTMserver.channels.cache.get(client.config.discord.server_channel_report);
  let invite = await interaction.channel.createInvite({
      maxAge: 0, 
      maxUses: 5
  })
  const report = new MessageEmbed()
   .setAuthor({name:`${interaction.user.tag}`,iconURL:interaction.member.displayAvatarURL({ dynamic: true })})
   .setTimestamp()
   .setTitle(`This Guy Have a Report, User ID: "${interaction.member.id}"`)
   .setColor(client.colors.none)
   .addField(`> **User :**`,`${client.emotes.reply}${interaction.member}`,true)
   .addField(`> **Send :**` ,`${client.emotes.reply}${choice}`,true) 
   .addField(`> **Server :**`, `${client.emotes.reply}${invite.url}`,true)
   .setURL(invite.url)
   .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
   .setFooter({text:`Requested By ${interaction.user.tag}`,iconURL:client.user.displayAvatarURL({ dynamic: true })})
   channelbug.send({ 
     embeds: [report] 
   }).then((msg)=> {
    msg.react(client.emotes.report)
   })
   interaction.reply({
    ephemeral: true,
    content: client.emotes.success + `| \`\`\`js\n ${client.emotes.report} Successfuly your report or bug message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
   })
  }
 }catch{
 }
    
 const command_name = interaction.options.getString("command_name");
 if (command_name) { 
   const cmd = client.commands.get(command_name.toLowerCase());
       if (!cmd || !cmd.name||!cmd.aliases) {
         return interaction.reply({
                 content: `**${client.emotes.error}| It seems like \`${command_name.toLowerCase()}\` is not a valid command! Please try Again!**`, 
                 ephemeral: true,
                })
       }
 const embed = new MessageEmbed()
    .setColor(client.colors.none)
    .addField('Name', cmd.name)
    .addField('Description', cmd.description || 'No Description provided!')
    .addField('Aliase(s)', cmd.aliases.map((a) => `**\`${a}\`**`).join(", ") || 'No Aliases provided!')
    .setFooter({ text: `${client.user.tag} Help • more info ${prefix}help • ${client.embed.footerText}`, iconURL: client.embed.footerIcon })
    .setAuthor({ name: `Requested by ${interaction.user.tag}`, iconURL: interaction.member.displayAvatarURL({ dynamic: true }), url: '' })
    .addField('Important Links', `**[Invite Me](${client.config.discord.invite}) | [Support Server](${client.config.discord.server_support})**`)
       if (cmd.utilisation) {
         var usage = cmd.utilisation.split('\n').map(i => { return client.prefix + i})
         if (cmd.cooldown) embed.addField('Cooldown', `**\`${cmd.cooldown} Seconds\`**`)
         embed.addField('Usage', `**\`${usage.join('` \n`')}\`**`)
       }
     return interaction.reply({
             embeds:[embed],
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
             ],
             ephemeral: true,
        })
}
if (!interaction.options.getString("report_message"||"command_name")){
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

  db.set(`help_member_${interaction.guild.id}_${interaction.channel.id}`, interaction.member.id)
      interaction.reply({
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
                  ],
                  ephemeral: true
      })
        setTimeout(()=>{
          help_menu.setDisabled(true)
          interaction.editReply({
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
          db.delete(`help_member_${interaction.guild.id}_${interaction.channel.id}`)
      },70*1000)
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
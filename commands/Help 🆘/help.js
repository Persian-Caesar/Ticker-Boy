const {
   MessageActionRow,
   MessageButton,
   MessageEmbed,
   Permissions,
   MessageSelectMenu
} = require("discord.js");
const db = require("quick.db");
const {
   // HelpCategoryEmbed,
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
   name: 'help',
   aliases: ['h','help me','komak'],
   category: 'Help 🆘',
   usage: '[command-name]',
   description:'this shows you bot commands and categorys to help you.',
   cooldown: 6,
   run: async function(client, message, args, prefix){
//======== Embeds
  let help = new MessageEmbed()
   .setAuthor({ 
      name: `${client.user.username} Help`, 
      //iconURL: client.user.displayAvatarURL({ dynamic: true })
   })
   .setFooter({ 
      text: `Requested by ${message.author.tag}`, 
      iconURL: message.member.displayAvatarURL({ dynamic: true }) 
    })
   .setColor(client.colors.none)
   .addFields([{
     name: `About me:`,
     value: `>>> Hi👋🏻, I'm **[${client.user.username}](${client.config.discord.invite})${client.emotes.tickets}**\n With my help, you can create a completely professional ticket system in your Discord server${client.emotes.system}\n My capabilities and features include fast and strong support, support for slash commands, support for message commands and other things${client.emotes.learn}`,
     inline: false
   },{
     name: `My Prefix:`,
     value: `>>> My prefix in this guild is: "**${prefix}**".`,
     inline: false
   },{
     name: `How See Commands:`,
     value: `>>> With selecting one of the options from the menu below you can see information about commands in those categories.\n**cmd & cat: ${client.emotes.commands}MessageCommands[\`${client.commands.size}\`] & ${client.emotes.slashcmds}SlashCommands[\`${client.slashCommands.size}\`] & ${client.emotes.category}Categories[\`${client.categories.length}\`]**`,
     inline: false
   }])
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))


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
         text: `more info ${prefix}help • ${client.embed.footerText}`, 
         iconURL: client.embed.footerIcon
      })
      .setAuthor({ 
         name: `Requested by ${message.author.tag}`, 
         iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
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
    let menu_options = [
          {
              label: 'Infos Help',
              value: 'inf',
              emoji: {
                name: '📊',
              },
          },
          {
              label: 'Setup Help',
              value: 'stp',
              emoji: {
                name: '💻',
              },
          },
          {
              label: 'Ticket Help',
              value: 'tic',
              emoji: {
                name: '🎫',
              },
          },
          {
              label: 'Premium Help',
              value: 'vip',
              emoji: {
                name: '💎',
              },
          },
    ]
    if(client.config.owner.some(r => r.includes(message.author.id))){
      menu_options.push({
              label: 'Owner Help',
              value: 'owr',
              emoji: {
                name: '👑',
              },
          })
    }
    let help_menu = new MessageSelectMenu()
     .setCustomId("help_menu")
     .setMaxValues(1)
     .setMinValues(1)
     .setPlaceholder(`${client.emotes.help}| Click me for select !!`)
     .addOptions(menu_options)
    let home_btn = new MessageButton()
     .setStyle('SUCCESS')
     .setLabel('Home Page')
     .setEmoji(client.emotes.home)
     .setCustomId("home_page")
   function HelpCategoryEmbed(commands, CategoryName, client, message, prefix){
  let embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.tag} | **${CategoryName}** Help`)
      .setDescription(`**See the text below to use the commands.\n\n${(client.commands.filter(c => c.category === CategoryName)).map(i => '`' + prefix + i.name + '`').join(' , ')}**`)
      .setURL(client.config.discord.server_support)
        .setFooter({ 
      text: `${message.guild.name} • ${client.embed.footerText}`, 
      iconURL: client.embed.footerIcon
   })
      .setAuthor({ name: `Requested by ${message.user.tag}`, iconURL: message.member.displayAvatarURL({ dynamic: true }) })      
      .setColor(client.colors.none)
      commands.filter(c => c.category === CategoryName).forEach((cmd) => {
        embed.addFields({
           name: `**${prefix}${cmd.name} ${cmd.usage ? `\`${cmd.usage}\`` : ""}**`, 
           value: `**Description: \`${cmd.description}\` | Aliases:** \`(${cmd.aliases ? cmd.aliases : ""})\``, 
           inline: true 
          });
    })
    return message.update({
              embeds: [embed],
                                    components: [new MessageActionRow().addComponents(help_menu),new MessageActionRow().addComponents([home_btn.setDisabled(false)]),new MessageActionRow().addComponents([new MessageButton().setStyle('PRIMARY').setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite)]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Support Server!').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
    });
  }
    return message.reply({
                      embeds: [help], 
                      components: [new MessageActionRow().addComponents(help_menu),new MessageActionRow().addComponents([home_btn.setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle('PRIMARY').setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite)]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Support Server!').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
    }).then(msg=>{
      const collector = message.channel.createMessageComponentCollector({ time: 70000 });
      collector.on('collect', async (m) => {
         if(m.user.id === message.author.id){
         if(m.isButton()){
          if(m.customId === "home_page"){
            home_btn.setDisabled(true)
            m.update({
              embeds: [help],
              components: [new MessageActionRow().addComponents(help_menu),new MessageActionRow().addComponents([home_btn.setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle('PRIMARY').setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite)]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Support Server!').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
            })
          }
         }
         if(m.isSelectMenu()){
           if(m.customId === "help_menu"){      
             if(m.values[0] === "inf"){
               HelpCategoryEmbed(client.commands, "Infos 📊", client, m, prefix)
             }
             if(m.values[0] === "owr"){
               HelpCategoryEmbed(client.commands, "Owner 👑", client, m, prefix)
             }
             if(m.values[0] === "vip"){
               HelpCategoryEmbed(client.commands, "Premuim 💎", client, m, prefix)
             } 
             if(m.values[0] === "tic"){
               HelpCategoryEmbed(client.commands, "Ticket 🎫", client, m, prefix)
             }
             if(m.values[0] === "stp"){
               HelpCategoryEmbed(client.commands, "Setup 💻", client, m, prefix)
             }
           }
         }
         }else{
         return errorMessage(client, m, `This message only for ${message.author} and you can't use it.\nfor use components send this: "\`${prefix}help\`"`)
         }
        })
      collector.on('end', (m)=>{
         home_btn.setDisabled(true)
         help_menu.setDisabled(true)
         msg.edit({
          embeds: [help],
          components: [new MessageActionRow().addComponents(help_menu),new MessageActionRow().addComponents([home_btn]),new MessageActionRow().addComponents([new MessageButton().setStyle('PRIMARY').setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite)]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Support Server!').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
         })
        })
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
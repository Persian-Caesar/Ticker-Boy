const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed
 } = require('discord.js');
const db = require("quick.db");
const {
    //HelpCategoryEmbed,
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
    name: 'help',
  description: 'this shows you bot commands and categorys to help you.',
  category: 'Help 🆘',
  cooldown: 1,
  botPermissions: ["SEND_MESSAGES"],
  botPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
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
   .setAuthor({ 
      name: `${client.user.username} Help`, 
      //iconURL: client.user.displayAvatarURL({ dynamic: true })
   })
   .setFooter({ 
      text: `Requested by ${interaction.user.tag}`, 
      iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
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
   .setAuthor({name:`${interaction.user.tag}`,iconURL:interaction.user.displayAvatarURL({ dynamic: true })})
   .setTimestamp()
   .setTitle(`This Guy Have a Report, User ID: "${interaction.user.id}"`)
   .setColor(client.colors.none)
   .addField(`> **User :**`,`${client.emotes.reply}${interaction.user}`,true)
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
    content: `| \`\`\`js\n ${client.emotes.report} Successfuly your report or bug message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`,
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
    if(client.config.owner.some(r => r.includes(interaction.user.id))){
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
    interaction.reply({
                  embeds: [help], 
                  ephemeral: true,
                  components: [new MessageActionRow().addComponents(help_menu),new MessageActionRow().addComponents([home_btn.setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle('PRIMARY').setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite)]),new MessageActionRow().addComponents([new MessageButton().setStyle('LINK').setLabel('Support Server!').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
    }).then(msg=>{
      const collector = interaction.channel.createMessageComponentCollector({ time: 70000 });
      collector.on('collect', async (m) => {
         if(m.user.id === interaction.user.id){
         if(m.isButton()){
          if(m.customId === "home_page"){
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
           return errorMessage(client, m, `This message only for ${interaction.user} and you can't use it.\nfor use components send this: "\`${prefix}help\`"`)
         }
        })
      collector.on('end', (m)=>{
         home_btn.setDisabled(true)
         help_menu.setDisabled(true)
         interaction.editReply({
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
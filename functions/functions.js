const {
  Client,
  Collection,
  Intents,
  Permissions,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu  
} = require("discord.js");
module.exports = {
  errorMessage: async function(client, interaction, error){
    let member = interaction.guild.members.cache.find(m=> m.id === interaction.member.id);
    return interaction.reply({
        embeds: [new MessageEmbed().setAuthor({ name: `Requested by ` + member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) }).setTitle('⛔️| **We Got An Error**').setColor(client.colors.red).setDescription(`${error}`).setFooter({ text: "Error • "+client.embed.footerText, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
        components: [new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))], 
        ephemeral: true,
    })
  },
  HelpCategoryEmbed: async function(commands, CategoryName, client, message, prefix){
  let embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.tag} | **${CategoryName}** Help`)
      .setDescription(`**See the text below to use the commands.\n\n${(client.commands.filter(c => c.category === CategoryName)).map(i => '`' + prefix + i.name + '`').join(' , ')}**`)
      .setURL(client.config.discord.server_support)
        .setFooter({ 
      text: `Message Guild ${message.guild.name} • ${client.embed.footerText}`, 
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
              components: [new MessageActionRow()
                .addComponents(new MessageSelectMenu()
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
                ),new MessageActionRow()
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
             //ephemeral: true
    });
  },
  wait: async function(ms){
            let start = new Date().getTime();
            let end = start;
            while(end < start + ms) {
              end = new Date().getTime();
            }
  },
  epochDateNow: async function (){
  const TimeStampDate = Date.parse(new Date()) / 1000;
  return TimeStampDate
  },
  epochDateCustom: async function (date){
  const TimeStampDate = Date.parse(date) / 1000;
  return TimeStampDate
  },
  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },
  randomRange: async function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
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
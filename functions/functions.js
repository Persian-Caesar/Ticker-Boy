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
const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder, 
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
module.exports = {
  logMessage: async function(client, interaction, channel, message, reason, emote, has_file, file){
    let member = interaction.guild.members.cache.find(m=> m.id === interaction.member.id);
    if(has_file === true){
      return channel.send({
        files: [file],
        embeds: [new EmbedBuilder().setTitle(`${emote}| ${reason}`).setColor(client.colors.none).setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true })).setDescription(`${message}`).setTimestamp().addFields([{ name: `**Requested By:**`, value: `**${member.user} | ${member.user.tag} | ${member.user.id}**`, inline: false },{ name: `**Target Channel:**`, value: `**${interaction.channel} | ${interaction.channel.name} | ${interaction.channel.id}**`, inline: false },{ name: `**Date:**`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`, inline: false },{ name: `**Reason:**`, value: `\`\`\`js\n${reason}\`\`\``, inline: false }]).setFooter({ text: `${interaction.guild.name} • Logs Information`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
    }else{
      return channel.send({
        embeds: [new EmbedBuilder().setTitle(`${emote}| ${reason}`).setColor(client.colors.none).setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true })).setDescription(`${message}`).setTimestamp().addFields([{ name: `**Requested By:**`, value: `**${member.user} | ${member.user.tag} | ${member.user.id}**`, inline: false },{ name: `**Target Channel:**`, value: `**${interaction.channel} | ${interaction.channel.name} | ${interaction.channel.id}**`, inline: false },{ name: `**Date:**`, value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`, inline: false },{ name: `**Reason:**`, value: `\`\`\`js\n${reason}\`\`\``, inline: false }]).setFooter({ text: `${interaction.guild.name} • Logs Information`, iconURL: interaction.guild.iconURL({ dynamic: true }) })],
      })
    }
  },
  errorMessage: async function(client, interaction, error){
    let member = interaction.guild.members.cache.find(m=> m.id === interaction.member.id);
    return interaction.reply({
        embeds: [new EmbedBuilder().setTitle('⛔️| **We Got An Error**').setColor(client.colors.red).setDescription(`${error}`).setFooter({ text: `Requested by ${member.user.tag} • Error • ${client.embed.footerText}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true }))],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))], 
        ephemeral: true,
    })
  },
  HelpCategoryEmbed: async function(commands, CategoryName, client, message, component){
     let member = message.guild.members.cache.find(m=> m.id === message.member.id);
     let embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({ 
        name: `${client.user.username} Help`
      })
      .setTitle(`${CategoryName}`)
      .setFooter({ 
        text: `Requested by ${member.user.tag}`, 
        iconURL: member.user.displayAvatarURL({ dynamic: true }) 
      })
      .setColor(client.colors.none)
    
     commands.filter(c => c.category === CategoryName).forEach((cmd) => {
        let cm = client.application.commands.cache.find(c => c.name === cmd.name)
        let name = []
        let bb = cm.options? cm.options.some(op=> op.type === ApplicationCommandOptionType.Subcommand)? cm.options.map((option)=>{ name.push(cm.name +" "+ option.name)}) : name.push(`${cm.name}`) : name.push(`${cm.name}`)
        name.forEach(nm=>{
          embed.addFields({
           name: `**${`</${nm}:${cm.id}>`}**`, 
           value: `**Description: \`${cm.options.some(op=> op.type === ApplicationCommandOptionType.Subcommand)? cm.options.map(op=> op.name === nm.slice(`${cm.name} `.length)? op.description : "").join("") : `${cm.description}`}\`**`, 
           inline: false 
          });
        })
     })
     return message.update({
        embeds: [embed],
        components: component
     })
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
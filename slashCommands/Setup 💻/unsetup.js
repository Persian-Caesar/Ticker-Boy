const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions
} = require('discord.js');
const db = require('quick.db');
module.exports = {
  name: 'unsetup',
  category: 'Setup 💻',
  cooldown: 1,
  userPermissions: [""],
  description: "setup system in target server.",
  botPermissions: [""],
  options: [{
      name: "logs",
      description: "unsetup ticket log channel.",
      type: "SUB_COMMAND",
   },{
    name: "admin",
    type: "SUB_COMMAND",
    description: "unsetup ticket admin role in guild",
  }],
  run: async (client, interaction) => {

let Sub = interaction.options.getSubcommand();
  switch (Sub) {
  case "logs": {
                if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
            .setFooter({
              text: "Error •"+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))], 
    ephemeral: true,
          })      
if(!interaction.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${interaction.guild.id}`)))
return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nin this guild admin role dose not setuped. I can't delete it befor setup\n```")
            .setFooter({
              text: "Error •"+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))], 
    ephemeral: true,
          })      

    interaction.reply({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`\n I just unsetup your ticket logs channel  and delete the ${interaction.guild.channels.cache.find(c => c.id === db.fetch(`modlog_${interaction.guild.id}`))}.`).setFooter({text: `Successfuly | Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.delete(`modlog_${interaction.guild.id}`)
  }break;
  case "admin": {
                if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_ROLES\" \n```")
            .setFooter({
              text: "Error •"+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))], 
    ephemeral: true,
          })      
if(!interaction.guild.roles.cache.find(c => c.id === db.fetch(`TicketAdminRole_${interaction.guild.id}`)))return interaction.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nin this guild admin role dose not setuped. I can't delete it befor setup\n```")
            .setFooter({
              text: "Error •"+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))], 
    ephemeral: true,
          })      
    interaction.reply({
    embeds: [new MessageEmbed().setTitle('☑️| ** Process Is Successfuly**').setColor(client.colors.green).setDescription(`\n I just unsetup your ticket admin role and delete the ${interaction.guild.roles.cache.find(c => c.id === db.fetch(`TicketAdminRole_${interaction.guild.id}`))}.`).setFooter({text: `Successfuly | Requested By ${interaction.user.tag} `, iconURL: interaction.guild.iconURL({dynamic:true})}).setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))],
    ephemeral: true,
  })
  db.delete(`TicketAdminRole_${interaction.guild.id}`)

  }break;
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
const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const db = require('quick.db');
const {
    errorEmbed,
    successEmbed,
    epochDateNow,
    logsEmbed,
    CustomErrorEmbed
} = require("../../functions/functions");
module.exports = {
    name: "setup",
    cooldown: 5,
    aliases: ["tic","tsetup","setup"],
    description: "Setup ticket channel",    
    category: 'Setup 💻',
    usage: "[channel mention | channel ID | channel name]",
    run: async function(client, message, args, prefix, logsChannel){
        try {
            var channel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
           // var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
           // var title = message.content.split(' ').slice(3).join(' ') || 'Create Ticket';
  if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) 
  return message.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]
         })      

  if(!channel) 
  return message.reply({           
             embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + message.author.tag,
              iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⛔️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription("```js\n please mention or paste some channel id from behind of the command.   \n```")
            .setFooter({
              text: "Error • "+client.embed.footerText,
              iconURL: interaction.guild.iconURL({ dynamic: true })
            })],
            components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("DANGER")
                   .setLabel("Error")
                   .setEmoji("⚠️")
                   .setCustomId("error")
                   .setDisabled(true))]
         })      
          
  message.reply({
    embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + message.author.tag,
                      iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Menu Is Successfuly Setuped**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup server ticket menu in ${channel} is successfully setuped.**`)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })
            ]
  })
    
  channel.send({
        embeds: [new MessageEmbed()
                   .setTitle(`${client.emotes.ticket}| Ticket System`)
                   .addField(`${client.emotes.reason}Description:`,`Do you need help ?? we are here!! This channel is for making tickets and communicating with the admin team. To make a ticket, select your reason from the menu below to address your problem. For guidance, asking questions, reporting members, etc., you can open a ticket by Be in touch with the admin team. Also, after clicking the button below, select the reason for opening your ticket correctly, otherwise your ticket will not be processed. All tickets will be saved, so please stop opening tickets without any reason and in violation of server rules. Avoid tickets, otherwise you will be banned from making tickets`)
                   .setColor(client.colors.none)
          ],
         components: [new MessageActionRow()
          .addComponents([new MessageButton()
            .setCustomId('create_ticket')
            .setEmoji(client.emotes.ticket)
            .setLabel("Create Ticket")
            .setStyle('SUCCESS')]),new MessageActionRow()
            .addComponents([new MessageButton()
              .setStyle("LINK")
              .setEmoji(client.emotes.support)
              .setLabel("Support")
              .setURL(client.config.discord.server_support)
          ])
         ] 
  })

        } catch (err) {
            return;
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
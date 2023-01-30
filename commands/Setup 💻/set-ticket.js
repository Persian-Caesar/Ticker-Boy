const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions,
  TextInputComponent,
  Modal
 } = require("discord.js");
const db = require('quick.db');
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
    name: "setup",
    cooldown: 10,
    aliases: ["tic","tsetup","setup"],
    description: "Setup ticket channel",    
    category: 'Setup 💻',
    usage: "[channel mention | channel ID | channel name]",
    run: async function(client, message, args, prefix, logsChannel){
    try {
        var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) 
         return errorMessage(client, message, "```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")

        if(!channel) 
         return errorMessage(client, message, "```js\n please mention or paste some channel id from behind of the command.   \n```")

        let embed = new MessageEmbed()
                   .setColor(client.colors.none)
      
        message.reply({
          embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + message.author.tag,
                      iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.setup + '| **Setup Ticket System**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup your guild ticket system in ${channel} with default or customize.**`)
                    .setFooter({
                      text: "Setting • "+client.embed.footerText,
                      iconURL: message.guild.iconURL({ dynamic: true })
                    })
            ],
            components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Setup Ticket To Default").setStyle('PRIMARY')],[new MessageButton().setCustomId('ticket_setup_custom').setEmoji(client.emotes.hamer).setLabel("Setup Ticket To Customize").setStyle('SUCCESS')]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
        }).then(async (msg)=>{

        //use buttons and modals function
        let collector = message.channel.createMessageComponentCollector({ time: 30000 })
        collector.on('collect', async (interaction)=>{
          if(!interaction.user.id === message.author.id){
            errorMessage(client, interaction, `**${client.emotes.error}| This component only for ${message.author} and you can't use it.\nuse "\`${prefix}setup\`" for setup the ticket system**`)
          }
          if(interaction.isButton()){
            if(interaction.customId === "ticket_setup_custom"){
        const ticket_modal = new Modal()
          .setCustomId("ticket_modal")
          .setTitle("Setup Ticket")
                    
        ticket_modal.addComponents(new MessageActionRow().addComponents([new TextInputComponent().setCustomId("ticket_title").setLabel("Embed Title").setStyle("SHORT").setPlaceholder("Place Ticket Embed Title Here ...").setRequired(false)]),new MessageActionRow().addComponents([new TextInputComponent().setCustomId("ticket_description").setLabel("Embed Description").setStyle("PARAGRAPH").setPlaceholder("Place Ticket Embed Description Here ...").setRequired(true)]))
        await interaction.showModal(ticket_modal)
            }
            else if(interaction.customId === "ticket_default"){
              embed.setTitle(`${client.emotes.ticket}| Ticket System`)
              embed.addField(`${client.emotes.reason}Description:`,`Do you need help ?? we are here!! This channel is for making tickets and communicating with the admin team. To make a ticket, select your reason from the menu below to address your problem. For guidance, asking questions, reporting members, etc., you can open a ticket by Be in touch with the admin team. Also, after clicking the button below, select the reason for opening your ticket correctly, otherwise your ticket will not be processed. All tickets will be saved, so please stop opening tickets without any reason and in violation of server rules. Avoid tickets, otherwise you will be banned from making tickets`)
              interaction.update({
                embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + message.author.tag,
                      iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Ticket Is Successfuly Setuped To Default**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup server ticket system in ${channel} to default type is successfully.**`)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
                      iconURL: message.guild.iconURL({ dynamic: true })
                    })
            ],
                components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Ticket Setup To Default").setStyle('PRIMARY').setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
              })
              await channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('create_ticket').setEmoji(client.emotes.ticket).setLabel("Create Ticket").setStyle('SUCCESS')])] 
              })
              embed = new MessageEmbed()
              collector.stop()
            }
          }
        })
        client.on('interactionCreate', async (interaction)=>{
          if(interaction.isModalSubmit()){
        if(interaction.customId === 'ticket_modal'){
          let title = interaction.fields.getTextInputValue('ticket_title')
          let description = interaction.fields.getTextInputValue('ticket_description')
          if(description){
            embed.setDescription(description)
          }
          if(title){
            embed.setTitle(title)
          }
          msg.edit({
                embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + message.author.tag,
                      iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Ticket Is Successfuly Setuped To Customize**')
                    .setColor(client.colors.none)
                    .setDescription(`**setup server ticket system in ${channel} to custom type is successfully.**`)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
                      iconURL: message.guild.iconURL({ dynamic: true })
                    })
            ],
            components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_setup_custom').setEmoji(client.emotes.system).setLabel("Ticket Setup To Customize").setStyle('SUCCESS').setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
          })
          interaction.reply({
            ephemeral: true,
            content: '👌🏻 done'
          })
          await channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('create_ticket').setEmoji(client.emotes.ticket).setLabel("Create Ticket").setStyle('SUCCESS')])] 
              })
          embed = new MessageEmbed()
          collector.stop()
         }
        }
        })
        collector.on('end', (collect)=>{
          if(!msg.embeds[0].title === client.emotes.success + '| **Ticket Is Successfuly Setuped To Default**' || !msg.embeds[0].title === client.emotes.success + '| **Ticket Is Successfuly Setuped To Customize**'){
          msg.edit({
                      embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + message.author.tag,
                      iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.alert + '| **Time For Setup Ticket System Is Up**')
                    .setColor(client.colors.none)
                    .setDescription(`**your time for setup guild ticket system is ended.**`)
                    .setFooter({
                      text: "Timesup • "+client.embed.footerText,
                      iconURL: message.guild.iconURL({ dynamic: true })
                    })
            ],
            components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('ticket_default').setEmoji(client.emotes.system).setLabel("Setup Ticket To Default").setStyle('PRIMARY').setDisabled(true)],[new MessageButton().setCustomId('ticket_setup_custom').setEmoji(client.emotes.hamer).setLabel("Setup Ticket To Customize").setStyle('SUCCESS').setDisabled(true)]),new MessageActionRow().addComponents([new MessageButton().setStyle("LINK").setEmoji(client.emotes.support).setLabel("Support").setURL(client.config.discord.server_support)])] 
          })
          }
        })
        })
    } catch (err) {
       console.log(err)
       errorMessage(client, message, "```js\n"+err+"\n```")
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
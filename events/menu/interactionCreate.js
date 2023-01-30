const db = require('quick.db');
const { 
  MessageSelectMenu,
  MessageEmbed, 
  MessageButton, 
  MessageActionRow 
} = require("discord.js");
const {
    HelpCategoryEmbed,
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, interaction) => {
  let prefix = await db.fetch(`guild_${interaction.guild.id}.prefix`) || client.prefix;
  if(!interaction.isSelectMenu())return;
  if(interaction.customId === "ticket_menu"){
    let cmd = client.application.commands.cache.find(c => c.name === "ticket");
    let ticketName = await db.get(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`);
    let logsChannel = await interaction.guild.channels.cache.find(c => c.id === db.get(`guild_${interaction.guild.id}.modlog`));
    let check_admin_role = await db.fetch(`guild_${interaction.guild.id}.ticket.admin_role`);
    let admin_role = await db.get(`guild_${interaction.guild.id}.ticket.admin_role`);
    let ticket_category_has = await db.fetch(`guild_${interaction.guild.id}.ticket.category`);
    let ticket_category = await db.get(`guild_${interaction.guild.id}.ticket.category`); 
    let channel_perm = {
      create: [{
        id: interaction.user.id,
        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
      },{
        id: interaction.guild.roles.everyone,
        deny: ["VIEW_CHANNEL"]
      }],
    };
    if(check_admin_role){
  channel_perm.create.push({
     id: admin_role,
     allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
  })
}
    
    interaction.values.some(async(value)=>{
      if (!interaction.guild.channels.cache.find(x => x.name === ticketName)) {
           interaction.guild.channels.create(`ticket-${interaction.user.tag}`, {
               permissionOverwrites: channel_perm.create,
               type: 'GUILD_TEXT',
               reason: `create a Support And Help ticket`,
               topic: `\n**ID:** ${interaction.user.id} \n**Tag:** ${interaction.user.tag} \n**Reason:** __${value}__\n**Use It For Close Ticket:** __</${cmd.name + " close"}:${cmd.id}>__`

           }).then(async(channel)=> {
        if(ticket_category_has){
          channel.setParent(ticket_category)
        }
           db.set(`guild_${interaction.guild.id}.ticket.name_${interaction.user.id}`, channel.name);
           db.set(`guild_${interaction.guild.id}.ticket.control_${channel.id}`, interaction.user.id);
               channel.send({
                   content:  `<@${interaction.user.id}>`,
                   embeds: [new MessageEmbed()
                    .setAuthor({
                      name: `Requested by ` + interaction.user.tag,
                      iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.emotes.success + '| **Process Is Successfuly**')
                    .setColor(client.colors.none)
                   .addField(`${client.emotes.reason}Description:`,`
Hello to the **support and help** channel (ticket), please explain briefly the reason for opening your ticket so that the server admins can handle your ticket as soon as possible (please refrain from mentioning admins)`)                    
                    .addField(`**Reason:**`, `\`\`\`js\n ${value}\`\`\``)
                    .setFooter({
                      text: "Successfuly • "+client.embed.footerText,
                      iconURL: interaction.guild.iconURL({ dynamic: true })
                    })],
                   components: [new MessageActionRow()
                   .addComponents(new MessageButton()
                   .setStyle("SECONDARY")
                   .setLabel("Close Ticket")
                   .setEmoji(client.emotes.close)
                   .setCustomId("configTicket"))]
               }).then(msg =>{ 
           channel.messages.pin(msg.id)
db.set(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`, msg.id)})
  let message = {
    content: ` `,
    components: [new MessageActionRow()
             .addComponents(new MessageButton()
             .setStyle("SUCCESS")
             .setLabel("Ticket Created")
             .setEmoji(client.emotes.ticket)
             .setCustomId("create_need_help_ticket")
             .setDisabled(true)
             )],
     embeds: [new MessageEmbed()
      .setAuthor({
        name: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true })
      })
      .setTitle(client.emotes.success + '| **Your Ticket Is Ready**')
      .setColor(client.colors.none)
      .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
      .addField(`${client.emotes.reason}Description:`,`
your ticket channel created and ready.\nplease wait the moderators or admins to speek there.`)                    
      .setTimestamp()
      .addFields(
        {      
        name: `**Requested By:**`, 
        value: interaction.user.tag, 
        inline: true
        },
        {
        name: `**User ID:**`, 
        value: interaction.user.id, 
        inline: true
        },
        {
        name: `**Target Channel:**`, 
        value: `**${channel}**`, 
        inline: true
        },
        {
        name: `**Date:**`, 
        value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
        inline: true
        },
        {
        name: `**Reason:**`, 
        value: `\`\`\`js\n create a ${value} ticket\`\`\``, 
        inline: true
        }
      )
      .setFooter({
        text: "Ticket Information • "+client.embed.footerText,
        iconURL: client.embed.footerIcon
      })]
 }
      interaction.channel.messages.fetch(db.get(`guild_${interaction.guild.id}.ticket.message_${interaction.channel.id}`)).then(msg =>{
        msg.edit(message)
      })
       interaction.update(message)
   if(logsChannel) return logsChannel.send({
       embeds: [new MessageEmbed()
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.guild.iconURL({ dynamic: true })
        })
        .setTitle(`${client.emotes.ticket}| **Request To Create ${value} Ticket**`)
        .setColor(client.colors.none)
        .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`one ticket channel will be created and user stay wait the moderators or admins to talk there.`)
        .setTimestamp()
        .addFields(
          {      
          name: `**Requested By:**`, 
          value: interaction.user.tag, 
          inline: true
          },
          {
          name: `**User ID:**`, 
          value: interaction.user.id, 
          inline: true
          },
          {
          name: `**Target Channel:**`, 
          value: `**${channel}**`, 
          inline: true
          },
          {
          name: `**Date:**`, 
          value: `**<t:${Date.parse(new Date()) / 1000}:R>**`, 
          inline: true
          },
          {
          name: `**Reason:**`, 
          value: `\`\`\`js\n ${value}\`\`\``, 
          inline: true
          }
        )
        .setFooter({
          text: "Logs Information • "+client.embed.footerText,
          iconURL: client.embed.footerIcon
        })]
       });
           });
       }else{
       return interaction.update({
           content: ` `,
           embeds: [new MessageEmbed()
            .setAuthor({
              name: `Requested by ` + interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTitle('⚠️| **We Got An Error**')
            .setColor(client.colors.none)
            .setDescription(`️**My Friend, you just have a another ticket.\nI can't create new ticket for you because you have got a ticket.\nAlso you can close your old ticket.\nyour old ticket channel is ${interaction.guild.channels.cache.find(x => x.name === ticketName)}**`)
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
      }
    })
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
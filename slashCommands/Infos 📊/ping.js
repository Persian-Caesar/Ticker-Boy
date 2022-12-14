const { 
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed
 } = require('discord.js');
const {
   wait
} = require('../../functions/functions.js');
module.exports = {
  name: 'ping',
  description: 'get bot ms requestes and bot ping.',
  category: 'Infos π',
  cooldown: 1,
  userPermissions: [""],
  botPermissions: [""],

  run: async (client, interaction, args) => {
 let timer = 3000;
 var states = "π’ Excellent";
 var states2 = "π’ Excellent";
 var msg = `${Date.now() - interaction.createdTimestamp}`;
 var api = `${Math.round(client.ws.ping)}`;
 if (Number(msg) > 70) states = "π’ Good";
 if (Number(msg) > 170) states = "π‘ Not Bad";
 if (Number(msg) > 350) states = "π΄ Soo Bad";
 if (Number(api) > 70) states2 = "π’ Good";
 if (Number(api) > 170) states2 = "π‘ Not Bad";
 if (Number(api) > 350) states2 = "π΄ Soo Bad";
    
 let pingEmbed = new MessageEmbed()
     .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.colors.none)
      .setDescription(`**Pongπ!** \n π±${client.user.username} Ping `)
      .addField("**Time Taken:**", `\`${msg + " ms πΆ | " + states}\``, true)
      .addField("**WebSocket:**", `\`${api + " ms πΆ | " + states2}\``, true)
      .setTimestamp()
      .setFooter({text:`Requested by ${interaction.user.tag}`, iconURL:`${interaction.user.displayAvatarURL()}`});
    
   let pingingEmbed = new MessageEmbed()
      .setColor(client.colors.none)
      .setDescription(`**Pinging...**`)
      .setTimestamp()
    
   let pingButton = new MessageButton()
          .setDisabled(true)
          .setStyle("PRIMARY")
          .setCustomId("loading")
          .setEmoji("π")
          .setLabel("Process Is Loading...")
    
   interaction.reply({ 
     embeds: [pingingEmbed],
     components: [new MessageActionRow().addComponents([pingButton])],
     ephemeral: true
    }).then((m)=>{
         wait(50)
             pingingEmbed.setDescription('**Pinging.**')
             interaction.editReply({ embeds: [pingingEmbed] })
         wait(50)
             pingingEmbed.setDescription('**Pinging..**')
             interaction.editReply({ embeds: [pingingEmbed] })
         wait(50)
             pingingEmbed.setDescription('**Pinging...**')
             interaction.editReply({ embeds: [pingingEmbed] })
          wait(50)
             pingingEmbed.setDescription('**Pinging.**')
             interaction.editReply({ embeds: [pingingEmbed] })
           wait(50)
             pingingEmbed.setDescription('**Pinging..**')
             interaction.editReply({ embeds: [pingingEmbed] })
           wait(50)
             pingingEmbed.setDescription('**Pinging...**')
             interaction.editReply({ embeds: [pingingEmbed] })
     
           wait(50)
        pingButton
          .setDisabled(true)
          .setStyle("SUCCESS")
          .setCustomId("pong")
          .setEmoji("π")
          .setLabel("Pong!!")
             interaction.editReply({ embeds: [pingEmbed], components: [new MessageActionRow().addComponents([pingButton])] })

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
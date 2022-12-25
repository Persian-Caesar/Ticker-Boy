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
  category: 'Infos 📊',
  cooldown: 1,
  userPermissions: [""],
  botPermissions: [""],

  run: async (client, interaction, args) => {
 let timer = 3000;
 var states = "🟢 Excellent";
 var states2 = "🟢 Excellent";
 var msg = `${Date.now() - interaction.createdTimestamp}`;
 var api = `${Math.round(client.ws.ping)}`;
 if (Number(msg) > 70) states = "🟢 Good";
 if (Number(msg) > 170) states = "🟡 Not Bad";
 if (Number(msg) > 350) states = "🔴 Soo Bad";
 if (Number(api) > 70) states2 = "🟢 Good";
 if (Number(api) > 170) states2 = "🟡 Not Bad";
 if (Number(api) > 350) states2 = "🔴 Soo Bad";
    
 let pingEmbed = new MessageEmbed()
     .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.colors.none)
      .setDescription(`**Pong🏓!** \n 📱${client.user.username} Ping `)
      .addField("**Time Taken:**", `\`${msg + " ms 📶 | " + states}\``, true)
      .addField("**WebSocket:**", `\`${api + " ms 📶 | " + states2}\``, true)
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
          .setEmoji("🔃")
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
          .setEmoji("🏓")
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
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const {
   wait
} = require('../../functions/functions.js');
module.exports = {
  name: "ping", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: [ "pong" ], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos π", //the command category for helpcmd [OPTIONAL]
  usage: '',
  description: "get bot ms requestes and bot ping.", //the command description for helpcmd [OPTIONAL]
  run: async function(bot, message, args, prefix){
            let timer = 3000;
            var states = "π’ Excellent";
            var states2 = "π’ Excellent";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(bot.ws.ping)}`;
            if (Number(msg) > 70) states = "π’ Good";
            if (Number(msg) > 170) states = "π‘ Not Bad";
            if (Number(msg) > 350) states = "π΄ Soo Bad";
            if (Number(api) > 70) states2 = "π’ Good";
            if (Number(api) > 170) states2 = "π‘ Not Bad";
            if (Number(api) > 350) states2 = "π΄ Soo Bad";
    
    let pingEmbed = new MessageEmbed()
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor(bot.colors.none)
      .setDescription(`**Pongπ!** \n π±${bot.user.username} Ping `)
      .addField("**Time Taken:**", `\`${msg + " ms πΆ | " + states}\``, true)
      .addField("**WebSocket:**", `\`${api + " ms πΆ | " + states2}\``, true)
      .setTimestamp()
      .setFooter({text:`Requested by ${message.author.tag}`, iconURL:`${message.author.displayAvatarURL()}`});
   let pingingEmbed = new MessageEmbed()
      .setColor(bot.colors.none)
      .setDescription(`**Pinging...**`)
      .setTimestamp()
   let pingButton = new MessageButton()
          .setDisabled(true)
          .setStyle("PRIMARY")
          .setCustomId("loading")
          .setEmoji("π")
          .setLabel("Process Is Loading...")
   message.reply({ 
     embeds: [pingingEmbed],
     components: [new MessageActionRow().addComponents([pingButton])]
              }).then((m)=>{
         wait(50)
             pingingEmbed.setDescription('**Pinging.**')
             m.edit({ embeds: [pingingEmbed] })
         wait(50)
             pingingEmbed.setDescription('**Pinging..**')
             m.edit({ embeds: [pingingEmbed] })
         wait(50)
             pingingEmbed.setDescription('**Pinging...**')
             m.edit({ embeds: [pingingEmbed] })
          wait(50)
             pingingEmbed.setDescription('**Pinging.**')
             m.edit({ embeds: [pingingEmbed] })
           wait(50)
             pingingEmbed.setDescription('**Pinging..**')
             m.edit({ embeds: [pingingEmbed] })
           wait(50)
             pingingEmbed.setDescription('**Pinging...**')
             m.edit({ embeds: [pingingEmbed] })
     
           wait(50)
        pingButton
          .setDisabled(true)
          .setStyle("SUCCESS")
          .setCustomId("pong")
          .setEmoji("π")
          .setLabel("Pong!!")
             m.edit({ embeds: [pingEmbed], components: [new MessageActionRow().addComponents([pingButton])] })

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
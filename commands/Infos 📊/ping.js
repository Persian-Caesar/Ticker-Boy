const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
const {
  wait
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: "ping", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: [ "pong" ], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  usage: '',
  description: "get bot ms requestes and bot ping.", //the command description for helpcmd [OPTIONAL]
  run: async function(bot, message, args, prefix){
            let timer = 3000;
            var states = "🟢 Excellent";
            var states2 = "🟢 Excellent";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(bot.ws.ping)}`;
            if (Number(msg) > 70) states = "🟢 Good";
            if (Number(msg) > 170) states = "🟡 Not Bad";
            if (Number(msg) > 350) states = "🔴 Soo Bad";
            if (Number(api) > 70) states2 = "🟢 Good";
            if (Number(api) > 170) states2 = "🟡 Not Bad";
            if (Number(api) > 350) states2 = "🔴 Soo Bad";
    
    let pingEmbed = new MessageEmbed()
      .setThumbnail(bot.user.displayAvatarURL())
      .setColor(bot.colors.none)
      .setDescription(`**Pong🏓!** \n 📱${bot.user.username} Ping `)
      .addField("**Time Taken:**", `\`${msg + " ms 📶 | " + states}\``, true)
      .addField("**WebSocket:**", `\`${api + " ms 📶 | " + states2}\``, true)
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
          .setEmoji("🔃")
          .setLabel("Process Is Loading...")
   message.reply({ 
     embeds: [pingingEmbed],
     components: [new MessageActionRow().addComponents([pingButton])]
              }).then((m)=>{
          wait(1000)
             pingingEmbed.setDescription('**Pinging.**')
             m.edit({ embeds: [pingingEmbed] })
          wait(1000)
             pingingEmbed.setDescription('**Pinging..**')
             m.edit({ embeds: [pingingEmbed] })
          wait(1000)
             pingingEmbed.setDescription('**Pinging...**')
             m.edit({ embeds: [pingingEmbed] })
          wait(1000)
             pingingEmbed.setDescription('**Pinging.**')
             m.edit({ embeds: [pingingEmbed] })
           wait(1000)
             pingingEmbed.setDescription('**Pinging..**')
             m.edit({ embeds: [pingingEmbed] })
           wait(1000)
             pingingEmbed.setDescription('**Pinging...**')
             m.edit({ embeds: [pingingEmbed] })
     
           wait(2000)
        pingButton
          .setDisabled(true)
          .setStyle("SUCCESS")
          .setCustomId("pong")
          .setEmoji("🏓")
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
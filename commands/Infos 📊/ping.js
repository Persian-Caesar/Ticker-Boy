const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Permissions
} = require("discord.js");
module.exports = {
  name: "ping", //the command name for execution & for helpcmd [OPTIONAL]
  aliases: [ "pong" ], //the command aliases for helpcmd [OPTIONAL]
  category: "Infos 📊", //the command category for helpcmd [OPTIONAL]
  usage: '',
  description: "get bot ms requestes and bot ping.", //the command description for helpcmd [OPTIONAL]
  run: async function(bot, message, args, prefix){
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
      .setColor("#2F3136")
      .setDescription(`**Pong🏓!** \n 📱${bot.user.username} Ping `)
      .addField("**Time Taken:**", `\`${msg + " ms 📶 | " + states}\``, true)
      .addField("**WebSocket:**", `\`${api + " ms 📶 | " + states2}\``, true)
      .setTimestamp()
      .setFooter({text:`Requested by ${message.author.username}`, iconURL:`${message.author.displayAvatarURL()}`});
   message.channel.send({ 
                    embeds: [pingEmbed]
              });
    
     
   }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
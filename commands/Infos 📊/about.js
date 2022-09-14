const moment = require("moment");
const Discord = require("discord.js");
const os = require("os");
const {
    NeedHelpButtons,
    NeedHelpMenu,
    epochDateNow,
    epochDateCustom,
    HelpCategoryEmbed
  } = require('../../functions/functions.js');
const cpuStat = require("cpu-stat");
module.exports = {
    name: 'about',
    aliases: ['info'],
    category: 'Infos 📊',
    usage: '[none]',
    description: 'send info of bot for know about bot.',
   run: async function(bot, message, args, prefix){
    try{ 
   const statuses = {
      "online" : "🟢",
      "idle"   : "🟠",
      "dnd"    : "🔴",
      "offline": "⚫️",
     }
    const activity = bot.user.presence.activities[0];   
    var userstatus = "Not Having An Activity";
        if(activity){
          if(activity.type === "CUSTOM_STATUS"){
            let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a": ""}:${activity.emoji.name}:${activity.emoji.id}>`: activity.emoji.name : ""}`
            userstatus = `${emoji} \`${activity.state || 'Not Having An Acitivty.'}\``
          }
          else{
            userstatus = `\`${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}\``
          }
       }
  let seconds = Math.floor(bot.uptime / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  seconds %= 60;
  minutes %= 60;
  hours %= 24;
    cpuStat.usagePercent(function (e, percent) {
      if (e) {
          return console.log(String(e.stack).red);
      }
      let connectedchannelsamount = 0;
      let guilds = bot.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
          if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      if (connectedchannelsamount > bot.guilds.cache.size) connectedchannelsamount = bot.guilds.cache.size;
let infoEmbed = new Discord.MessageEmbed()
      .setColor(bot.colors.none)
      .setTitle(`Stats from \`${bot.user.tag}\``)
      .addField(`🆔| ID:`,`<:reply_desgine:950701730675445790>** User Id: ${bot.user.id}**`,true)
      .addField(`🥋| Tag:`, `<:reply_desgine:950701730675445790>**${bot.user.tag}**`,true) 
      .addField(":ping_pong:| Ping",`**<:reply_desgine:950701730675445790> User Ping Is: \`${Math.round(bot.ws.ping)}MS\`**`,true)
      .addField(":clock1:| Uptime", `<:reply_desgine:950701730675445790>** Time Of Bot Online: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`** || ** _<t:${Math.floor(new Date().getTime() - Math.floor(bot.uptime)/1000)}:F> / <t:${Math.floor(new Date().getTime() - Math.floor(bot.uptime)/1000)}:D> / <t:${Math.floor(new Date().getTime() - Math.floor(bot.uptime)/1000)}:R>_**`,true)
      .addField(`✨| Status:`,`<:reply_desgine:950701730675445790>** Bot Status Is: ${statuses[bot.user.presence.status]} ${bot.user.presence.status}**`,true)
      .addField('🎬| Activity:',`<:reply_desgine:950701730675445790>** Bot Activity Is: ${userstatus}**`,true)
      .addField(`📅| Date of Join Discord:`,`<:reply_desgine:950701730675445790>** Time Of Bot Created: <t:${Date.parse(bot.user.createdAt) / 1000}:R>**`,true) 
      .addField(`📈| Date of Join Server:`, `<:reply_desgine:950701730675445790>** Time Of Bot Join Server: <t:${Date.parse(message.guild.members.cache.get(bot.user.id).joinedAt) / 1000}:R>**`,true) 
      .addField(":file_cabinet:| Memory Usage",`<:reply_desgine:950701730675445790>** Bot Usage Memory Is: \`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\`\`**`,true)
      .addField(":busts_in_silhouette:| Usage Users",`<:reply_desgine:950701730675445790>** Count Of Usage Users Is: \`${bot.users.cache.size}\`**`,true)
      .addField(":homes:| Servers",`<:reply_desgine:950701730675445790>** Count Of Bot Servers Is: \`${bot.guilds.cache.size}\`**`, true)
      .addField("🎙️| Voice Channels", `<:reply_desgine:950701730675445790>** Count Of Bot Voice Channel Is: \`${bot.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}\`**`,true)
      .addField("💬| Text Channels", `<:reply_desgine:950701730675445790>** Count Of Bot Text Channel Is: \`${bot.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}\`**`,true)
      .addField("🎤| Connected Channels", `<:reply_desgine:950701730675445790>** Count Of Bot Joined Voices Is: \`${connectedchannelsamount}\`**`,true)
      .addField(":control_knobs: API Latency",`<:reply_desgine:950701730675445790>** Bot API Latency Is: \`${bot.ws.ping}MS\`**`,true)
      .addField(":robot: Version",`<:reply_desgine:950701730675445790>** Bot Version Is: \`Omega 5.2.1\`**`,true)
      .addField(":blue_book: Discord.js",`<:reply_desgine:950701730675445790>** Bot Usage Discord.js Version Is: \`Version ${Discord.version}\`**`,true)
      .addField(":green_book: Node.js",`<:reply_desgine:950701730675445790>** Bot Usage Node.js Version Is: \`Version ${process.version}\`**`,true)
      .addField("📡| CPU", `<:reply_desgine:950701730675445790>** Bot Usage CPU Model Is: \`\`\`Model\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\`**`,true)
      .addField("🖥| CPU Usage", `<:reply_desgine:950701730675445790>** Bot Percent Of Usage CPU Is: \`\`\`${percent.toFixed(2)}%\`\`\`**`,true)
      .addField("🧵| Shards", `<:reply_desgine:950701730675445790>** Bot Shards Percent Is: \`${bot.ws.shards.size}%\`**`,true)
      .addField("👔| Cores", `<:reply_desgine:950701730675445790>** Bot Cores Percent Is: \`${os.cpus().length}%\`**`,true)
      .addField("🧥| Architecture", `<:reply_desgine:950701730675445790>** Bot Architecture Is: \`${os.arch()}\`**`,true)
      .addField("🕹| Platform", `<:reply_desgine:950701730675445790>** Bot Usage Platform Is: \`${os.platform()}\`**`,true)
      .addField("🧰| Commands Count", `<:reply_desgine:950701730675445790>** Bot Commands Count Is: \`${bot.commands.size}\`**`,true)
      .addField(`📚| Category Count:`, `<:reply_desgine:950701730675445790>** Bot Category Count Is: \`${(bot.categories.size)}\`**`,true)
      .setTimestamp()
        message.channel.send({embeds:[infoEmbed]})
    })
      
  }catch(e) {
    console.log(e)
    return message.reply({
            content: `${bot.emotes.error} **| Error, \`\`\`js\n${e}\`\`\`**`,
            components: '',
        }).then(message.member.send({
                content: `Salam aziz👋🏻\n agar man iradi dashtam mitoni to dm moshkelam ro begi ta sazandeganam checkesh bokonannd😉\n vaya be server support biayid:\n ${bot.config.discord.server_support||"https://discord.gg/5GYNec4urW"}`,
                components: [NeedHelpButtons(bot)] 
            })
        );
    }
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
const moment = require("moment");
const Discord = require("discord.js");
const os = require("os");
const cpuStat = require("cpu-stat");
module.exports = {
    name: 'about',
    aliases: ['info'],
    category: 'Infos 📊',
    usage: '',
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
      .setTitle(`Stats from \`${bot.user.username}\``)
      .addField(`${bot.emotes.id}| ID:`,`${bot.emotes.reply}** User Id: ${bot.user.id}**`,true)
      .addField(`${bot.emotes.tag}| Tag:`, `${bot.emotes.reply}**${bot.user.tag}**`,true) 
      .addField(bot.emotes.ping+"| Ping",`**${bot.emotes.reply} User Ping Is: \`${Math.round(bot.ws.ping)}MS\`**`,true)
      .addField(bot.emotes.uptime+"| Uptime", `${bot.emotes.reply}** Time Of Bot Online: \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`** || ** _<t:${Math.floor((new Date().getTime() - Math.floor(bot.uptime))/1000)}:F> / <t:${Math.floor((new Date().getTime() - Math.floor(bot.uptime))/1000)}:D> / <t:${Math.floor((new Date().getTime() - Math.floor(bot.uptime))/1000)}:R>_**`,true)
      .addField(`${bot.emotes.status}| Status:`,`${bot.emotes.reply}** Bot Status Is: ${statuses[bot.user.presence.status]} ${bot.user.presence.status}**`,true)
      .addField(bot.emotes.activity+'| Activity:',`${bot.emotes.reply}** Bot Activity Is: ${userstatus}**`,true)
      .addField(`${bot.emotes.date}| Date of Join Discord:`,`${bot.emotes.reply}** Time Of Bot Created: <t:${Date.parse(bot.user.createdAt) / 1000}:R>**`,true) 
      .addField(`${bot.emotes.join}| Date of Join Server:`, `${bot.emotes.reply}** Time Of Bot Join Server: <t:${Date.parse(message.guild.members.cache.get(bot.user.id).joinedAt) / 1000}:R>**`,true) 
      .addField(bot.emotes.memory+"| Memory Usage",`${bot.emotes.reply}** Bot Usage Memory Is: \`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\`\`**`,true)
      .addField(bot.emotes.usage+"| Usage Users",`${bot.emotes.reply}** Count Of Usage Users Is: \`${bot.users.cache.size}\`**`,true)
      .addField(bot.emotes.guild+"| Servers",`${bot.emotes.reply}** Count Of Bot Servers Is: \`${bot.guilds.cache.size}\`**`, true)
      .addField(bot.emotes.voice_channel+"| Voice Channels", `${bot.emotes.reply}** Count Of Bot Voice Channel Is: \`${bot.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}\`**`,true)
      .addField(bot.emotes.text_channel+"| Text Channels", `${bot.emotes.reply}** Count Of Bot Text Channel Is: \`${bot.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}\`**`,true)
      .addField(bot.emotes.connect+"| Connected Channels", `${bot.emotes.reply}** Count Of Bot Joined Voices Is: \`${connectedchannelsamount}\`**`,true)
      .addField(bot.emotes.version+"Version",`${bot.emotes.reply}** Bot Version Is: \`${require("../../package.json").version}\`**`,true)
      .addField(bot.emotes.disJS+"Discord.js",`${bot.emotes.reply}** Bot Usage Discord.js Version Is: \`Version ${Discord.version}\`**`,true)
      .addField(bot.emotes.node+"Node.js",`${bot.emotes.reply}** Bot Usage Node.js Version Is: \`Version ${process.version}\`**`,true)
      .addField(bot.emotes.cpu+"| CPU", `${bot.emotes.reply}** Bot Usage CPU Model Is: \`\`\`js\nModel:  ${os.cpus().map((i) => `${i.model}`)[0]}\`\`\`\n CPU Usages: \`${percent.toFixed(2)}%\`**`,true)
      .addField(bot.emotes.shard+"| Shards", `${bot.emotes.reply}>** Bot Shards Percent Is: \`${bot.ws.shards.size}%\`**`,true)
      .addField(bot.emotes.cros+"| Cores", `${bot.emotes.reply}** Bot Cores Percent Is: \`${os.cpus().length}%\`**`,true)
      .addField(bot.emotes.arch+"| Architecture", `${bot.emotes.reply}** Bot Architecture Is: \`${os.arch()}\`**`,true)
      .addField(bot.emotes.platform+"| Platform", `${bot.emotes.reply}** Bot Usage Platform Is: \`${os.platform()}\`**`,true)
      .addField(`${bot.emotes.commands}| Commands Count`, `${bot.emotes.reply}** Bot Commands Count Is: \`${bot.commands.size}\`**`,true)
      .addField(`${bot.emotes.category}| Category Count:`, `${bot.emotes.reply}** Bot Category Count Is: \`${(bot.categories.size)}\`**`,true)
      .setTimestamp()
        message.reply({embeds:[infoEmbed]})
    })
  }catch(e) {
    console.log(e)
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
const moment = require("moment");
const Discord = require("discord.js");
const os = require("os");
const cpuStat = require("cpu-stat");
module.exports = {
  name: 'about',
  description: 'send info of bot for know about bot.',
  category: 'Infos 📊',
  cooldown: 1,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["EMBED_LINKS","SEND_MESSAGES"],

  run: async (client, interaction, args) => {
    try{
   const statuses = {
      "online" : "🟢",
      "idle"   : "🟠",
      "dnd"    : "🔴",
      "offline": "⚫️",
     }
    const activity = client.user.presence.activities[0];   
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
  let seconds = Math.floor(client.uptime / 1000);
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
      let guilds = client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
          if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
      if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
let infoEmbed = new Discord.MessageEmbed()
      .setColor(client.colors.none)
      .setTitle(`Stats from \`${client.user.username}\``)
      .addField(`${client.emotes.id}| ID:`,`${client.emotes.reply}** User Id: ${client.user.id}**`,true)
      .addField(`${client.emotes.tag}| Tag:`, `${client.emotes.reply}**${client.user.tag}**`,true) 
      .addField(client.emotes.ping+"| Ping",`**${client.emotes.reply} User Ping Is: \`${Math.round(client.ws.ping)}MS\`**`,true)
      .addField(client.emotes.uptime+"| Uptime", `${client.emotes.reply}** Time Of Bot Online:  <t:${Math.floor((new Date().getTime() - Math.floor(client.uptime))/1000)}:D> / <t:${Math.floor((new Date().getTime() - Math.floor(client.uptime))/1000)}:R>_**`,true)
      .addField(`${client.emotes.status}| Status:`,`${client.emotes.reply}** Bot Status Is: ${statuses[client.user.presence.status]} ${client.user.presence.status}**`,true)
      .addField(client.emotes.activity+'| Activity:',`${client.emotes.reply}** Bot Activity Is: ${userstatus}**`,true)
      .addField(`${client.emotes.date}| Date of Join Discord:`,`${client.emotes.reply}** Time Of Bot Created: <t:${Date.parse(client.user.createdAt) / 1000}:R>**`,true) 
      .addField(`${client.emotes.join}| Date of Join Server:`, `${client.emotes.reply}** Time Of Bot Join Server: <t:${Date.parse(interaction.guild.members.cache.get(client.user.id).joinedAt) / 1000}:R>**`,true) 
      .addField(client.emotes.memory+"| Memory Usage",`${client.emotes.reply}** Bot Usage Memory Is: \`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\`\`**`,true)
      .addField(client.emotes.usage+"| Usage Users",`${client.emotes.reply}** Count Of Usage Users Is: \`${client.users.cache.size}\`**`,true)
      .addField(client.emotes.guild+"| Servers",`${client.emotes.reply}** Count Of Bot Servers Is: \`${client.guilds.cache.size}\`**`, true)
      .addField(client.emotes.voice_channel+"| Voice Channels", `${client.emotes.reply}** Count Of Bot Voice Channel Is: \`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}\`**`,true)
      .addField(client.emotes.text_channel+"| Text Channels", `${client.emotes.reply}** Count Of Bot Text Channel Is: \`${client.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}\`**`,true)
      .addField(client.emotes.version+"Version",`${client.emotes.reply}** Bot Version Is: \`^${require(`${process.cwd()}/package.json`).version}\`**`,true)
      .addField(client.emotes.disJS+"Discord.js",`${client.emotes.reply}** Bot Usage Discord.js Version Is: \`Version ${Discord.version}\`**`,true)
      .addField(client.emotes.node+"Node.js",`${client.emotes.reply}** Bot Usage Node.js Version Is: \`Version ${process.version}\`**`,true)
      .addField(client.emotes.cpu+"| CPU", `${client.emotes.reply}** Bot Usage CPU Model Is: \`\`\`js\nModel:  ${os.cpus().map((i) => `${i.model}`)[0]}\`\`\`\n CPU Usages: \`${percent.toFixed(2)}%\`**`,true)
      .addField(client.emotes.shard+"| Shards", `${client.emotes.reply}** Bot Shards Percent Is: \`${client.ws.shards.size}%\`**`,true)
      .addField(client.emotes.cros+"| Cores", `${client.emotes.reply}** Bot Cores Percent Is: \`${os.cpus().length}%\`**`,true)
      .addField(client.emotes.arch+"| Architecture", `${client.emotes.reply}** Bot Architecture Is: \`${os.arch()}\`**`,true)
      .addField(client.emotes.platform+"| Platform", `${client.emotes.reply}** Bot Usage Platform Is: \`${os.platform()}\`**`,true)
      .addField(`${client.emotes.commands}| Commands Count`, `${client.emotes.reply}** Bot Commands Count Is: Commands[\`${client.commands.size}\`] & SlashCommands[\`${client.slashCommands.size}\`]**`,true)
      .addField(`${client.emotes.category}| Category Count:`, `${client.emotes.reply}** Bot Category Count Is: \`${(client.categories.length)}\`**`,true)
      .setTimestamp()
        interaction.reply({embeds:[infoEmbed]})
    })
  }catch(e) {
    console.log(e)
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
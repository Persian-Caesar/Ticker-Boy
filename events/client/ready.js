var clc = require("cli-color");
var Discord = require('discord.js');
module.exports = async (client) => {
   let totalUsers = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0);
   let Guilds = client.guilds.cache.size;
   setInterval(function Activitys(){
      if(totalUsers > 1000){
        totalUsers = `${(totalUsers/1000).toString().slice(0, -1)}K`;
      }else{
        totalUsers = totalUsers;
      }
      if(Guilds > 1000){
        Guilds = `${(Guilds/1000).toString().slice(0, -1)}K`;
      }else{
        Guilds = Guilds;
      }
      let Presence = [ "dnd", "idle", "online" ]; //can be: online | dnd | idle | offline
      let PresencePower = Presence[Math.floor(Math.random() * Presence.length)]
      let Activity = [
        `/help`,
        `/ticket create`,
        `${Guilds} Servers`,
        `${totalUsers} Users`
      ];
      let ActivityPower = `${Activity[Math.floor(Math.random() * Activity.length)]} | Ticker Boy`;
      let Display = [`WATCHING`]; //can be: COMPETING | WATCHING | LISTENING | PLAYING | STREAMING 
      let DisplayPower = Display[Math.floor(Math.random() * Display.length)];
      let URL = [ `https://www.twitch.tv/sobhan_srza` ];
      let URLPower = URL[Math.floor(Math.random() * URL.length)];
      client.user.setPresence({ 
        activities: [{ 
          name: ActivityPower, 
          type: DisplayPower, 
          url: URLPower 
        }], 
        status: PresencePower 
      })
   }, 60000)
   
try{
   const stringlength = 69;
   console.log("\n")
   console.log(clc.greenBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
   console.log(clc.greenBright(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃"))
   console.log(clc.greenBright(`     ┃                    ` + clc.blueBright(`Discord Bot is online!`) + " ".repeat(-20+stringlength-` ┃ `.length-`Discord Bot is online!`.length)+ "┃"))
   console.log(clc.greenBright(`     ┃           ` + ` /--/ ${clc.cyanBright(client.user.tag)} Is Now Online :) /--/ `+ " ".repeat(-1+stringlength-` ┃ `.length-` /--/ ${clc.cyanBright(client.user.tag)} Is Now Online :) /--/ `.length)+ "┃"))
   console.log(clc.greenBright(`     ┃ ` + " ".repeat(-1+stringlength-` ┃ `.length)+ "┃"))
   console.log(clc.greenBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
   console.log("\n")
   client.logger(
      clc.blueBright(`Working Guilds: `) + clc.greenBright(`${Guilds.toLocaleString()} Servers`) + `\n` +
      clc.blueBright(`Watching Users: `) + clc.greenBright(`${totalUsers.toLocaleString()} Users`) + `\n` +
      clc.blueBright(`Commands: `) + clc.greenBright(`${client.commands.size}`) + `\n` +
      clc.blueBright(`Slash Commands: `) + clc.greenBright(`${client.slashCommands.size}`) + `\n` +
      clc.blueBright(`Discord.js: `) + clc.greenBright(`v${Discord.version}`) + `\n` +
      clc.blueBright(`Node.js: `) + clc.greenBright(`${process.version}`) + `\n` +
      clc.blueBright(`Plattform: `) + clc.greenBright(`${process.platform} ${process.arch}`) + `\n` +
      clc.blueBright(`Memory: `) + clc.greenBright(`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`)
    );
}catch{ /* */ }
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
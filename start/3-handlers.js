const fs = require('fs');
var clc = require("cli-color");
module.exports = async (client) => {
//======== Loading Handlers =========
handlers = new Map();
var Files = [ "slashCommandHandler.js",client.config.source.keep_alive ?  "keepAlive.js" : null , "extraEvents.js" ,client.config.source.anti_crash ? "antiCrash.js" : null ];
Files
  .filter(Boolean)
  .forEach((handler) => {
    require(`./../handlers/${handler}`)(client);
    handlers.set(handler);
});  
try {
    const stringlength = 69;
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(handlers.size)} Handlers Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${handlers.size} Handlers Is Loaded!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
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
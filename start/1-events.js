const fs = require('fs');
var clc = require("cli-color");
module.exports = async (bot) => {
  try{
    bot.events = new Map();
    const stringlength = 69;
    fs.readdirSync(`${process.cwd()}/events`).forEach(dirs => {
      const events = fs.readdirSync(`${process.cwd()}/events/${dirs}`).filter(files => files.endsWith('.js'));
      for (const file of events) {
          const event = require(`${process.cwd()}/events/${dirs}/${file}`);
          bot.events.set(event);
          bot.on(file.split(".")[0], event.bind(null, bot));
      };
  });
    /*const events = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));
      for (const file of events) {
        const event = require(`${process.cwd()}/events/${file}`);
          bot.events.set(event);
          bot.on(file.split(".")[0], event.bind(null, bot));
      };*/
try {
    console.log("\n")
    console.log(clc.greenBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.cyanBright(`                   Welcome to Ticker Boy!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   Welcome to Ticker Boy!`.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.cyanBright(`             /-/ By Mr.SINRE AND Persian Czar /-/`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `             /-/ By Mr.SINRE AND Persian Czar /-/`.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + clc.yellowBright(`               /-/ Discord: Mr.SIN RE#1528  /-/`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `               /-/ Discord: Mr.SIN RE#1528  /-/`.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.greenBright("┃"))
    console.log(clc.greenBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch {
    /* */ }
  try {
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                     Logging into the BOT...`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                     Logging into the BOT...`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
  try {
    console.log("\n")
    console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.redBright(bot.events.size)} Events Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${bot.events.size} Events Is Loaded!!`.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
    console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
    console.log("\n")
  } catch { /* */ }
} catch (e) {
  console.log(clc.redBright(String(e.stack)))
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
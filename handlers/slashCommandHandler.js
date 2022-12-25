const {
  readdirSync
} = require("fs");
var clc = require("cli-color");
module.exports = async (bot) => {
  try {
    let amount = 0;
    const slashCommandsArray = [];
    readdirSync(`${process.cwd()}/slashCommands/`).forEach((dir) => {
      const slashCommands = readdirSync(`${process.cwd()}/slashCommands/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of slashCommands) {
        const pull = require(`${process.cwd()}/slashCommands/${dir}/${file}`);
        if (pull.name) {
          bot.slashCommands.set(pull.name, pull);
          if (["MESSAGE", "USER"].includes(pull.type)) delete pull.description;
          slashCommandsArray.push(pull)
          amount++
        } else {
          try {
            console.log(clc.redBright(`Slash Command Not Loaded: ${file}`))
          } catch {
          }
          continue;
        }
      }
    });
    try {
      const stringlength = 69;
      console.log("\n")
      console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
      console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
      console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.cyanBright(amount)} Slash Commands Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${amount} Slash Commands Is Loaded!!`.length) + clc.yellowBright("┃"))
      console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
      console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)) + '\n'
    } catch { /* */ }
  
    bot.on("ready", async () => {
        try {
          // For 1 Server Only👇🏻
          // await bot.guilds.cache.get(bot.config.discord.support_server_id).commands.set(slashCommandsArray);
          // For Global Server👇🏻
          await bot.application.commands.set(slashCommandsArray);
        } catch (error) {
          console.log(error)
        }
      })
  } catch (e) {
    console.log(e.message);
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
const clc = require("cli-color");
const os = require("os");
const post = require("../../functions/post");
const error = require("../../functions/error");
const logger = require("../../functions/logger");
const config = require("../../../config");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
  try {

    // Load Slash Commands
    if (config.source.one_guild) {
      await client.guilds.cache.get(config.discord.support.id).commands.set(client.commands.filter(a => a.only_slash));
    } else {
      await client.application.commands.set(client.commands.filter(a => a.only_slash));
    };

    post(`${client.commands.filter(a => a.only_slash).size} Slash Commands Is Uploaded!!`, "S");

    // Change Bot Status
    setInterval(function () {
      const Presence = config.discord.status.presence,
        PresencePower = Presence[Math.floor(Math.random() * Presence.length)],
        Activity = config.discord.status.activity,
        ActivityPower = Activity[Math.floor(Math.random() * Activity.length)],
        Display = config.discord.status.type,
        DisplayPower = Display[Math.floor(Math.random() * Display.length)],
        stateName = ActivityPower.replace("{servers}", `${client.guilds.cache.size.toLocaleString()}`).replace("{members}", client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString());

      client.user.setPresence({
        status: PresencePower,
        activities: [
          {
            type: DisplayPower,
            name: stateName,
            state: DisplayPower === 4 ? stateName : ""
          }
        ]
      });
    }, 60000);

    // Log Bot Information
    post(
      `${clc.blueBright("Discord Bot is online!")}` + `\n` +
      `${clc.cyanBright(client.user.tag)} Is Now Online :)`,
      "S"
    );
    logger(
      clc.blueBright("Working Guilds: ") + clc.cyanBright(`${client.guilds.cache.size.toLocaleString()} Servers`) + `\n` +
      clc.blueBright("Watching Members: ") + clc.cyanBright(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Members`) + `\n` +
      clc.blueBright("Commands: ") + clc.cyanBright(`slashCommands[${client.commands.filter(a => a.only_slash).size}] & messageCommands[${client.commands.filter(a => a.only_message).size}]`) + `\n` +
      clc.blueBright("Discord.js: ") + clc.cyanBright(`v${require("discord.js").version}`) + `\n` +
      clc.blueBright("Node.js: ") + clc.cyanBright(`${process.version}`) + `\n` +
      clc.blueBright("Plattform: ") + clc.cyanBright(`${process.platform} ${process.arch} | ${os.cpus().map((i) => `${i.model}`)[0]} | ${String(os.loadavg()[0])}%`) + `\n` +
      clc.blueBright("Memory: ") + clc.cyanBright(`${Math.round(((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)).toLocaleString()}/${Math.round(((os.totalmem()) / 1024 / 1024).toFixed(2)).toLocaleString()} MB | ${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)}%`)
    );
  } catch (e) {
    error(e)
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */
const
  clc = require("cli-color"),
  post = require("../functions/post"),
  loadCommand = require("../functions/loadCommand"),
  firstUpperCase = require("../functions/firstUpperCase"),
  error = require("../functions/error");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
  try {
    ["only_message", "only_slash"].forEach((type) => {
      loadCommand(`${process.cwd()}/src/commands`, type, client.commands);
      post(
        `${clc.cyanBright(client.commands.filter(a => a[type]).size)} ${firstUpperCase(type.replace("only_", ""))} Commands Is Loaded!!`,
        "S"
      );
    });
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
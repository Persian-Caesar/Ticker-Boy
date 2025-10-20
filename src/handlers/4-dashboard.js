const clc = require("cli-color");
const config = require("../../config");
const error = require("../functions/error");
const post = require("../functions/post");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
  try {

    // Loading Dashboard
    if (config.source.dashboard.on) {
      require("../dashboard/index")(client);
      post(`Dashboard Is Loaded!!`, "S")
    };
  } catch (e) {
    error(e)
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/
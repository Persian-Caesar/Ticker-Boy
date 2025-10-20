const error = require("./error");

/**
 *
 * @param {{interaction: import("discord.js").CommandInteraction, message: import("discord.js").Message, data: import("discord.js").BaseMessageOptions }} param0
 * @returns {import("discord.js").Message}
 */
module.exports = async function ({ interaction, message = null, data }) {
  try {
    if (interaction.user)
      return await interaction.editReply(data).catch(e => e);

    else
      return await message.edit(data).catch(e => e);
  } catch (e) {
    error(e);
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
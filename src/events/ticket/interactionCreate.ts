import {
  Interaction,
  MessageFlags
} from "discord.js";
import checkCmdCooldown from "../../utils/checkCmdCooldown";
import checkCmdPerms from "../../utils/checkCmdPerms";
import DiscordClient from "../../models/Client";
import error from "../../utils/error";
import repeatAction from "../../utils/repeatAction";

export default async (client: DiscordClient, interaction: Interaction) => {
  try {
    const db = client.db!;
    if(interaction.isButton()){
    }
  }

  catch (e) {
    error(e);
  }
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
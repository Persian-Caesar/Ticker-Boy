import { Respondable } from "../types/types";
import { Message } from "discord.js";
import repeatAction from "./repeatAction";
import error from "./error";

export default async function (
  interaction: Respondable,
  message?: Message | null
) {
  try {
    if ("deleteReply" in interaction)
      return await repeatAction(async () => await interaction.deleteReply().catch(e => e));

    else {
      if (interaction instanceof Message && interaction.deletable)
        await interaction.delete().catch(e => e);

      if (message?.deletable)
        await message.delete().catch(e => e);

      return;
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
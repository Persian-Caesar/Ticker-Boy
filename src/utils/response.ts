import {
  InteractionEditReplyOptions,
  InteractionReplyOptions,
  MessageReplyOptions
} from "discord.js";
import { isBaseInteraction } from "../functions/functions";
import { Respondable } from "../types/types";
import repeatAction from "./repeatAction";
import error from "./error";

export default async function (interaction: Respondable, data: InteractionReplyOptions | MessageReplyOptions) {
  try {
    if (isBaseInteraction(interaction)) {
      if ("editReply" in interaction)
        return await repeatAction(async () => await interaction.editReply(data as InteractionEditReplyOptions));
    }

    else
      return await repeatAction(async () => await interaction.reply(data as MessageReplyOptions));

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
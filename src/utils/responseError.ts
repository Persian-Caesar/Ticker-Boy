import {
  EmbedBuilder,
  InteractionEditReplyOptions,
  InteractionReplyOptions,
  Message,
  MessageEditOptions,
  MessageFlags,
  MessageReplyOptions
} from "discord.js";
import { isBaseInteraction } from "../functions/functions";
import { Respondable } from "../types/types";
import repeatAction from "./repeatAction";
import EmbedData from "../storage/embed";
import error from "./error";

export default async function (
  interaction: Respondable,
  log?: string,
  data?: InteractionReplyOptions | MessageReplyOptions,
  isUpdateNeed?: boolean,
  message?: Message
) {
  try {
    if (!data)
      data = {
        embeds: [
          new EmbedBuilder()
            .setColor(EmbedData.color.red.HexToNumber())
            .setFooter(
              {
                text: EmbedData.footer.footerText,
                iconURL: EmbedData.footer.footerIcon
              }
            )
            .setTitle("An error occurred!")
            .setDescription(log!)
        ]
      };

    if (isBaseInteraction(interaction)) {
      data.flags = MessageFlags.Ephemeral;
      if (isUpdateNeed && "editReply" in interaction)
        return await repeatAction(async () => await interaction.editReply(data as InteractionEditReplyOptions))

      else if ("reply" in interaction)
        return await repeatAction(async () => await interaction.reply(data as InteractionReplyOptions));

      return;
    }

    else
      if (isUpdateNeed && message)
        return await repeatAction(async () => await message.edit(data as MessageEditOptions));

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
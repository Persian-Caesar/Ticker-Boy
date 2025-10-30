import {
  Message,
  MessageEditOptions
} from "discord.js";
import repeatAction from "./repeatAction";
import error from "./error";

export default async function (message: Message, data: MessageEditOptions) {
  try {
    return await repeatAction(async () => await message.edit(data));
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
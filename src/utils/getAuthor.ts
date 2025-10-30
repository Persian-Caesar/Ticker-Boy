import {
  CommandInteraction,
  Message
} from "discord.js";
import error from "./error";

export default function (interaction: CommandInteraction | Message) {
  try {
    if (interaction instanceof CommandInteraction)
      return interaction.user;

    else
      return interaction.author;
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
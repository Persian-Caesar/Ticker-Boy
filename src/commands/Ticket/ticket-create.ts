import {
  ApplicationCommandType,
  PermissionFlagsBits,
  PermissionsBitField
} from "discord.js";
import { CommandType } from "../../types/interfaces";
import error from "../../utils/error";

export default {
  data: {
    name: "ticket-create",
    description: "Create a ticket channel.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
    ]),
    default_bot_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks
    ]),
    dm_permission: true
  },
  category: "member",
  aliases: ["tc", "create", "tcreate", "c"],
  cooldown: 5,
  only_owner: false,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {

     }

    catch (e) {
      error(e)
    }
  }
} as CommandType;
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
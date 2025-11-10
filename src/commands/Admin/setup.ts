import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField
} from "discord.js";
import { CommandType } from "../../types/interfaces";
import { Languages } from "../../types/types";
import { getOption } from "../../functions/functions";
import selectLanguage from "../../utils/selectLanguage";
import responseError from "../../utils/responseError";
import responseDelete from "../../utils/responseDelete";
import languages from "../../storage/languages.json";
import EmbedData from "../../storage/EmbedData";
import response from "../../utils/response";
import dbAccess from "../../utils/dbAccess";
import config from "../../../config";
import error from "../../utils/error";

export default {
  data: {
    name: "setup",
    description: "setup command.",
    options: [
      
    ],
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      PermissionFlagsBits.ManageGuild,
      PermissionFlagsBits.ManageChannels
    ]),
    default_bot_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks
    ])
  },
  category: "admin",
  cooldown: 10,
  only_owner: false,
  only_slash: true,
  only_message: false,

  run: async (client, interaction, args) => {
    try {
      const subcommand = getOption<string>(interaction, "getSubcommand", undefined, 0, args);
      switch (subcommand) {
        case "":{
           
        }
      }
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
import {
    BaseInteraction,
    CommandInteraction,
    Message,
    MessageComponentInteraction,
    ModalSubmitInteraction
} from "discord.js";
import { CommandOption } from "./interfaces";

export type CommandOptions = CommandOption[] | [];

export type Categoris = "member" | "admin" | "music" | "owner" | "nsfw" | "moderate" | "ticket" | "giveaway" | "api" | "image";

export type Respondable =
    | CommandInteraction
    | MessageComponentInteraction
    | ModalSubmitInteraction
    | BaseInteraction
    | Message;
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
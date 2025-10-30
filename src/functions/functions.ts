import {
  BaseInteraction,
  CommandInteraction,
  CommandInteractionOptionResolver,
  Guild,
  GuildChannel,
  GuildMember,
  Message,
  User
} from "discord.js";
import { Respondable } from "../types/types";

export function isBaseInteraction(obj: Respondable): obj is BaseInteraction {
  return obj instanceof BaseInteraction;
}

export function isMessage(obj: Respondable): obj is Message {
  return obj instanceof Message;
}

export function getOption<T>(
  interaction: Respondable,
  method: "getMessage"
    | "getFocused"
    | "getMentionable"
    | "getRole"
    | "getUser"
    | "getMember"
    | "getAttachment"
    | "getNumber"
    | "getInteger"
    | "getString"
    | "getChannel"
    | "getBoolean"
    | "getSubcommandGroup"
    | "getSubcommand",
  optionName?: string,
  fallbackIndex?: number,
  args?: string[]
): T | null {
  if (interaction instanceof CommandInteraction && interaction.command?.options instanceof CommandInteractionOptionResolver)
    // @ts-ignore
    return interaction.command?.options[method](optionName) as T;

  return args && args[fallbackIndex!] ? (args[fallbackIndex!] as unknown as T) : null;
}

export function getChannel(interaction: Respondable, optionName?: string, fallbackIndex?: number, args?: string[]) {
  if (optionName && interaction instanceof CommandInteraction && interaction.command?.options instanceof CommandInteractionOptionResolver)
    interaction.command?.options.getChannel(optionName)

  return args && args[fallbackIndex!] ? (interaction.guild?.channels.cache.get(args[fallbackIndex!] as string) as GuildChannel) : null
}

export function getUser(interaction: Respondable, user: User | string) {
  return "id" in (user as User) ?
    user as User
    : interaction.client.users.cache.get(user as string) || interaction.guild?.members.cache.get(user as string)?.user
}

export function getMember(interaction: Respondable, user: GuildMember | string) {
  return "id" in (user as GuildMember) ?
    user as GuildMember
    : interaction.guild?.members.cache.get(user as string)
}

export function filterMembers(guild: Guild, doFor: string, issuer: GuildMember, botMember: GuildMember) {
  return guild.members.cache.filter(m => {
    if (!canManage(m, issuer, botMember))
      return false;

    if (doFor === "everyone")
      return true;

    if (doFor === "bots")
      return m.user.bot;

    return !m.user.bot;
  })
}

export function canManage(target: GuildMember, issuer: GuildMember, botMember: GuildMember): boolean {
  return issuer.roles.highest.position > target.roles.highest.position &&
    botMember.roles.highest.position > target.roles.highest.position;
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
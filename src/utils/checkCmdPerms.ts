import {
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder,
  GuildChannel,
  GuildMember,
  Message,
  MessageFlags,
  PermissionsBitField
} from "discord.js";
import { CommandType } from "../types/interfaces";
import error from "./error";

export default async function (
  interaction: CommandInteraction | Message,
  command: CommandType,
  prefix: string | null = null,
  args: string[] | null = null
): Promise<boolean | void> {
  try {
    const
      mentionCommand = prefix
        ? `\`${prefix + command.data.name}${command.data.options?.some((a) => a.type === 1 && a.name === args?.[0])
          ? ` ${command.data.options.find((a) => a.name === args![0])!.name}`
          : ""
        }\``
        : `</${command.data.name}${interaction instanceof CommandInteraction && interaction.command?.options?.some((a) => a.type === 1)
          ? ` ${interaction.command?.options?.find((a) => a.type === 1)!.name}`
          : ""
        }:${command.data.id}> `,

      getSubcommand = interaction instanceof CommandInteraction && interaction.command?.options instanceof CommandInteractionOptionResolver && interaction.command?.options.find(a => a.type === ApplicationCommandOptionType.Subcommand),
      getSubcommandOptions = getSubcommand && command.data.options?.find(option =>
        option.type === ApplicationCommandOptionType.Subcommand && option.name === getSubcommand.name
      );

    const channel = interaction.channel;
    if (channel && channel.isTextBased() && channel instanceof GuildChannel) {
      const perms = new PermissionsBitField(
        command.data.default_bot_permissions
      );

      if (getSubcommandOptions && getSubcommandOptions.default_bot_permissions)
        perms.add(getSubcommandOptions.default_bot_permissions);

      if (!channel.permissionsFor(interaction.client.user!)?.has(perms || [])) {
        const embed = new EmbedBuilder()
          .setDescription(
            `I don't have permissions need for using ${mentionCommand}!!\nPermissions need: [${perms.toArray().map((a) => `"${a}"`).join(", ")}]`
          )
          .setColor("Orange");

        if (interaction instanceof CommandInteraction && !interaction.replied)
          await interaction.reply({
            flags: MessageFlags.Ephemeral,
            embeds: [embed],
          });

        else
          await interaction.reply({
            embeds: [embed],
          });

        return true;
      }
    }

    const member = interaction.member;
    if (member && member instanceof GuildMember) {
      const perms = new PermissionsBitField(
        command.data.default_member_permissions
      );

      if (getSubcommandOptions && getSubcommandOptions.default_member_permissions)
        perms.add(getSubcommandOptions.default_member_permissions);

      if (!member?.permissions.has(perms || [])) {

        const embed = new EmbedBuilder()
          .setDescription(`You don't have permissions need for using ${mentionCommand}!!\Permissions need: [${perms.toArray().map(a => `"${a}"`).join(", ")}]`)
          .setColor("Orange");

        if (interaction instanceof CommandInteraction && !interaction.replied)
          await interaction.reply({
            flags: MessageFlags.Ephemeral,
            embeds: [embed]
          });

        else
          await interaction.reply({
            embeds: [embed]
          });

        return true;
      };
    }

    return false;
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
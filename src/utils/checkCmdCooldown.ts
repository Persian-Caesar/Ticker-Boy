import {
  Collection,
  CommandInteraction,
  EmbedBuilder,
  Message,
  MessageFlags
} from "discord.js";
import { CommandType } from "../types/interfaces";
import client from "../../index";
import error from "./error";

export default async function (
  interaction: CommandInteraction | Message,
  command: CommandType,
  prefix: string | null = null,
  args: string[] | null = null
): Promise<boolean | void> {
  try {
    const
      userId = (interaction instanceof CommandInteraction ? interaction.user.id : interaction.author?.id),
      mentionCommand = prefix
        ? `\`${prefix + command.data.name}${command.data.options?.some((a) => a.type === 1 && a.name === args?.[0])
          ? ` ${command.data.options.find((a) => a.name === args![0])!.name}`
          : ""
        }\``
        : `</${command.data.name}${interaction instanceof CommandInteraction && interaction.command?.options?.some((a) => a.type === 1)
          ? ` ${interaction.command?.options.find((a) => a.type === 1)!.name}`
          : ""
        }:${command.data.id}>`;
    if (!client.cooldowns.has(command.data.name))
      client.cooldowns.set(command.data.name, new Collection());

    const
      timestamps = client.cooldowns.get(command.data.name)!,
      defaultCooldownDuration = 3,
      cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if (timestamps.has(userId)) {
      const expirationTime = timestamps.get(userId)! + cooldownAmount;
      if (Date.now() < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        const embed = new EmbedBuilder()
          .setDescription(
            `**-# Your are block about using the ${mentionCommand} for spamming. After <t:${expiredTimestamp}:R> you can try again.**`
          )
          .setColor("Orange");

        if (interaction instanceof CommandInteraction && !interaction.replied)
          await interaction.reply({
            flags: MessageFlags.Ephemeral,
            embeds: [embed],
          });

        else
          await interaction.reply({ embeds: [embed] });

        return true;
      };
    };

    timestamps.set(userId, Date.now());
    setTimeout(() => timestamps.delete(userId), cooldownAmount);

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
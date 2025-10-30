import {
  Interaction,
  MessageFlags
} from "discord.js";
import checkCmdCooldown from "../../utils/checkCmdCooldown";
import checkCmdPerms from "../../utils/checkCmdPerms";
import DiscordClient from "../../models/Client";
import error from "../../utils/error";
import repeatAction from "../../utils/repeatAction";

export default async (client: DiscordClient, interaction: Interaction) => {
  try {
    const db = client.db!;

    // Load Slash Commands
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      // Command Handler
      if (command && command.only_slash) {
        if (interaction.channel!.isDMBased() && !command.data.dm_permission)
          return;

        // Filter Owners Commands
        if (command.only_owner)
          if (!client.config.discord.support.owners.includes(interaction.user.id))
            return await interaction.reply({
              flags: MessageFlags.Ephemeral,
              content: "This cmd is only for developers!"
            })

        // Check command perms
        if (interaction.inGuild())
          if (await checkCmdPerms(interaction, command))
            return;

        // Command cooldown
        if (await checkCmdCooldown(interaction, command))
          return;

        // Use flags conditionally
        const hasEphemeralOption = command.data.options?.some(option =>
          option.name === "ephemeral" ||
          (option.type === 1 && option.options?.some(subOption => subOption.name === "ephemeral"))
        );
        if (hasEphemeralOption)
          await repeatAction(async () => {
            return await interaction.deferReply({
              flags: MessageFlags.Ephemeral,
              withResponse: true
            });
          }) // 3 tries to defer reply

        await db.add("totalCommandsUsed", 1);
        return await command.run(client, interaction);
      }
    }
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
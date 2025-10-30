import {
  ActivityType,
  REST,
  Routes,
  version
} from "discord.js";
import DiscordClient from "../../models/Client";
import logger from "../../functions/logger";
import error from "../../utils/error";
import post from "../../functions/post";
import os from "os";

export default async (client: DiscordClient) => {
  try {
    const
      { discord: { delete_commands, status_loop, token, prefix, status: { activity, presence, type } } } = client.config,
      commands = client.commands
        .filter(cmd => cmd.only_slash)
        .map(cmd => cmd.data),

      rest = new REST().setToken(token),
      db = client.db!;

    post(`Updating ${String(commands.length).cyan} (/) command.`, "S");

    // Delete current (/)commands
    if (delete_commands)
      try {
        const deleted = await rest.delete(
          Routes.applicationCommands(client.user!.id)
        ) as any;
        post(`${String(deleted?.length).cyan} (/) commands successfully deleted.`.red, "S");
      }

      catch (e) {
        post("Failed to delete (/) commands.".red, "E", "red", "red");
        error(e);
      }

    // Create (/)commands
    try {
      const created = await rest.put(
        Routes.applicationCommands(client.user!.id),
        { body: commands }
      ) as any;
      post(`${String(created?.length).cyan} (/) commands successfully created.`.green, "S");
    }

    catch (e) {
      post("Failed to create (/) commands.".red, "E", "red", "red");
      error(e);
    }

    // Change bot status 
    setInterval(async () => {
      if (activity.length < 1)
        return;

      const
        Presence = presence ? presence.random() : undefined,
        ActivityText = activity.random(),
        TypeText = String((type || ["Custom"]).random()).toLowerCase().toCapitalize();

      // Status state name
      const stateName = ActivityText.replaceValues({
        username: client.user!.displayName,
        servers: client.guilds.cache.size.toLocaleString(),
        members: client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0).toLocaleString(),
        prefix: prefix,
        usedCommands: (await db.get("totalCommandsUsed") || 0).toLocaleString()
      });

      client.user!.setPresence({
        status: Presence,
        activities: [
          {
            type: ActivityType[TypeText as keyof typeof ActivityType],
            name: stateName,
            state: TypeText === "Custom" ? stateName : ""
          }
        ]
      });
    }, status_loop);

    // Log bot information
    post(
      "Discord bot is online!".blue + `\n` +
      `${client.user!.tag.cyan} is now online :)`.green,
      "S"
    );
    logger(
      "Working Guilds: ".blue + `${client.guilds.cache.size.toLocaleString()} Servers`.cyan + `\n` +
      "Watching Members: ".blue +
      `${client.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0).toLocaleString()} Members`.cyan + `\n` +
      "Commands: ".blue +
      `slashCommands[${commands.length}] & messageCommands[${client.commands.filter(cmd => cmd.only_message).size}]`.cyan + `\n` +
      "Discord.js: ".blue + `v${version}`.cyan + `\n` +
      "Node.js: ".blue + `${process.version}`.cyan + `\n` +
      "Plattform: ".blue +
      `${process.platform} ${process.arch} | ${os.cpus()[0].model} | ${String(os.loadavg()[0])}%`.cyan + `\n` +
      "Memory: ".blue +
      `${Math.round(((os.totalmem() - os.freemem()) / 1024 / 1024)).toLocaleString()}` +
      `/${Math.round((os.totalmem() / 1024 / 1024)).toLocaleString()} MB | ` +
      `${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)}%`.cyan
    );

    // Add commands id to client.commands collection
    const fetchedCommands = await client.application!.commands.fetch({ cache: true });
    await Promise.all(
      client.commands.map(async (cmd) => {
        const slashCmd = fetchedCommands.find(c => c.name === cmd.data.name);
        if (slashCmd)
          client.commands.set(cmd.data.name, {
            ...cmd,
            data: { ...cmd.data, id: slashCmd.id }
          });

      })
    );
  }

  catch (e) {
    error(e);
  }
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
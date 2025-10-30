import {
  ChannelType,
  Guild,
  TextChannel
} from "discord.js";

export default async function (guild: Guild) {
  const inviteData = {
    reason: "Invite the developers",
    maxAge: 0
  };
  try {
    return guild.invites?.cache?.find(a => a.inviterId === guild.client.user.id) ||
      await guild.widgetChannel?.createInvite(inviteData) ||
      await guild.rulesChannel?.createInvite(inviteData) ||
      await (
        guild.channels?.cache
          ?.filter(a => a.type === ChannelType.GuildText && a.viewable)
          ?.random(1)[0] as TextChannel
      )?.createInvite(inviteData) ||
      guild.invites?.cache?.first();
  }

  catch {
    return null;
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
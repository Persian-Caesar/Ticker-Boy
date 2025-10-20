/**
 *
 * @param {import("discord.js").Guild} guild
  * @returns {import("discord.js").Invite}
 */
module.exports = async function (guild) {
  const inviteData = {
    reason: "Invite the developers",
    maxAge: 0
  };
  try {
    return await guild.invites?.cache?.find(a => a.inviterId === guild.client.user.id) ||
      await guild.widgetChannel?.createInvite(inviteData) ||
      await guild.rulesChannel?.createInvite(inviteData) ||
      await guildchannels?.cache
        ?.filter(a => a.type === 0 && a.viewable)
        ?.random(1)[0]
        ?.createInvite(inviteData) ||

      await guild.invites?.cache?.first();
  } catch {
    return null;
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA and Aria Fendereski | https://github.com/Sobhan-SRZA | https://github.com/ariafi
 * @copyright
 * Work for Vixium Team | https://discord.gg/vefvUNyPQu
 * @copyright
 */
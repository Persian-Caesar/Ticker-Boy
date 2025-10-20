const
  {
    EmbedBuilder,
    WebhookClient,
    ChannelType
  } = require("discord.js"),
  error = require("./error"),
  colors = require("../storage/colors.json"),
  config = require("../../config");

/**
 *
 * @param {{ client: import("discord.js").Client, guild: import("discord.js").Guild, guildChannel: import("discord.js").GuildChannel, isWebhook: boolean, description: string }} param0
 * @returns {import("discord.js").Message}
 */
module.exports = async function ({
  client,
  guild,
  guildChannel = null,
  isWebhook = false,
  description = "-# **The total number of servers I’m in is now `{guilds}`.**"
}) {
  try {
    let
      channel,
      owner = {},
      invite,
      messageData = {};

    const inviteData = {
      reason: "Invite the developers",
      maxAge: 0
    };
    if (isWebhook) {
      channel = new WebhookClient({ url: config.discord.support.webhook.url });
      messageData.avatarURL = config.discord.support.webhook.avatar;
      messageData.username = config.discord.support.webhook.username;
      if (config.discord.support.webhook.threads.status)
        messageData.threadId = config.discord.support.webhook.threads.status;
    }

    else
      channel = guildChannel;

    try {
      invite = await guild.widgetChannel?.createInvite(inviteData) ||
        await guild.rulesChannel?.createInvite(inviteData) ||
        await guild.channels.cache
          .filter(a => a.type === ChannelType.GuildText && a.viewable)
          .random(1)[0]
          .createInvite(inviteData) ||

        await guild.invites.cache.first();
    } catch { };
    try {
      owner = await guild?.fetchOwner();
      if (!owner.user)
        owner = await (await guild.fetch()).fetchOwner();

      if (owner.user)
        owner.user = await client.users.cache.get(guild.ownerId);
    } catch { }
    const embed = new EmbedBuilder()
      .setDescription(description.replace("{guilds}", await client.guilds.cache.size.toLocaleString()))
      .addFields(
        [
          {
            name: "👑| Owner:",
            value: `<:reply:1099703652333142088> **${owner?.user} | \`${owner?.user?.tag}\` | \`${owner?.user?.id || guild.ownerId}\`**`,
            inline: false
          },
          {
            name: "🔌| Server:",
            value: `<:reply:1099703652333142088> **${invite ? `[${guild.name}](${invite.url})` : `${guild.name}`} | \`${guild.id}\` | \`${guild.memberCount}\` Members**`,
            inline: false
          },
          {
            name: "📅| Created on:",
            value: `<:reply:1099703652333142088> **<t:${Date.parse(guild.createdAt) / 1000}:D> | <t:${Date.parse(guild.createdAt) / 1000}:R>**`,
            inline: false
          }
        ]
      )
      .setColor(description.includes("revoked") ? colors.redlight : description.includes("join") ? colors.greenlight : colors.theme)
      .setThumbnail(guild.iconURL({ forceStatic: true }))
      .setFooter(
        {
          text: client.user.tag,
          iconURL: client.user.displayAvatarURL({ forceStatic: true })
        }
      )
      .setTimestamp(Date.now());

    try {
      embed.setAuthor(
        {
          name: owner.user.tag,
          iconURL: owner.user.displayAvatarURL({ forceStatic: true })
        }
      )
    } catch { }

    messageData.embeds = [embed];
    return await channel.send(messageData);
  } catch (e) {
    error(e)
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
 */
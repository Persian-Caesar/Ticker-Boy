const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle
} = require("discord.js");
const { checkPing } = require("../../functions/functions");
const os = require("os");
const error = require("../../functions/error");
const config = require("../../../config");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @returns {void}
 */
module.exports = async (client) => {
  const db = client.db;
  try {
    const guild = client.guilds.cache.get(config.discord.support.id);
    const channel = client.channels.cache.get(config.discord.support.stats_channel);
    if (guild && channel) {
      setInterval(async () => {
        const status_message = await db.get(`guild_${channel.guild.id}.status.message`);
        let msg;
        try {
          msg = await channel.messages.fetch(status_message).then((m) => m);
        } catch { };
        const embed = new EmbedBuilder()
          .setColor(client.colors.theme)
          .setTitle("Bot Status")
          .addFields([{
            name: `${client.emotes.server}| Total Guilds:`,
            value: `**\`${client.guilds.cache.size.toLocaleString()}\` Servers**`,
            inline: false
          }, {
            name: `${client.emotes.users}| Total Users:`,
            value: `**\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\` Users**`,
            inline: false
          }, {
            name: `${client.emotes.commands}| Commands:`,
            value: `**slashCommands[\`${client.commands.filter(a => a.only_slash).size}\`] & messageCommands[\`${client.commands.filter(a => a.only_message).size}\`]**`,
            inline: false
          }, {
            name: `${client.emotes.ping}| Ping:`,
            value: `**\`${Math.round(client.ws.ping)} ms 📶 | ${await checkPing(Math.round(client.ws.ping))}\` | Total Commands Used: \`${(await client.db.get("totalCommandsUsed")).toLocaleString()}\`**`,
            inline: false
          }, {
            name: `${client.emotes.uptime}| Uptime:`,
            value: `**<t:${Math.trunc(client.readyTimestamp / 1000)}:D> | <t:${Math.trunc(client.readyTimestamp / 1000)}:R>**`,
            inline: false
          }, {
            name: `${client.emotes.memory}| Memory:`,
            value: `**${Math.round(((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2)).toLocaleString()}/${Math.round(((os.totalmem()) / 1024 / 1024).toFixed(2)).toLocaleString()} MB | \`${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)}%\`**`,
            inline: false
          }, {
            name: `${client.emotes.cpu}| CPU:`,
            value: `**${os.cpus().map((i) => `${i.model}`)[0]} | \`${String(os.loadavg()[0])}%\`**`,
            inline: false
          }, {
            name: `${client.emotes.version}| Bot Versions:`,
            value: `**Source \`v${require(`${process.cwd()}/package.json`).version}\` | Discord.js \`v${require(`discord.js`).version}\`**`,
            inline: false
          }]);


        const row = [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Refresh").setEmoji(client.emotes.update).setCustomId(`reload_info`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Invite Me").setEmoji(client.emotes.invite).setURL(config.discord.default_invite.replace("{clientId}", client.user.id)), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Vote Me").setEmoji(client.emotes.topgg).setURL(`${client.config.discord.topgg}`)])];

        if (status_message && msg) {
          return await msg.edit({
            embeds: [embed]
          });
        } else {
          return await channel.send({
            embeds: [embed],
            components: row
          }).then(async (msg) => {
            await db.set(`guild_${channel.guild.id}.status.channel`, channel.id)
            await db.set(`guild_${channel.guild.id}.status.message`, msg.id)
          });
        }
      }, 1000 * 60 * 60);
    };
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
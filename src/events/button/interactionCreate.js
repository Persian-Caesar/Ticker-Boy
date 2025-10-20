const {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder
} = require("discord.js");
const os = require('os');
const { checkPing } = require("../../functions/functions");
const error = require("../../functions/error");
const config = require("../../../config");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").ButtonInteraction} interaction 
 * @returns {void}
 */
module.exports = async (client, interaction) => {
  try {
    if (!interaction.isButton()) return;
    const db = client.db;
    if (interaction.customId === "create_ticket") {
      let newActionRowEmbeds = interaction.message.components.map(oldActionRow => {
        updatedActionRow = new ActionRowBuilder();
        updatedActionRow.addComponents(oldActionRow.components.map(buttonComponent => {
          newButton = ButtonBuilder.from(buttonComponent)
          if (interaction.component.customId == buttonComponent.customId) {
            newButton.setCustomId("ticket-create")
          }
          return newButton
        }));
        return updatedActionRow
      });
      await interaction.deferUpdate()
      await interaction.editReply({
        components: newActionRowEmbeds
      });
    };
    if (interaction.customId === "close") {
      let newActionRowEmbeds = interaction.message.components.map(oldActionRow => {
        updatedActionRow = new ActionRowBuilder();
        updatedActionRow.addComponents(oldActionRow.components.map(buttonComponent => {
          newButton = ButtonBuilder.from(buttonComponent)
          if (interaction.component.customId == buttonComponent.customId) {
            newButton.setCustomId("ticket-close")
          }
          return newButton
        }));
        return updatedActionRow
      });
      await interaction.deferUpdate()
      await interaction.editReply({
        components: newActionRowEmbeds
      });
    };
    if (interaction.customId === "premium") {
      await interaction.deferReply({ ephemeral: true })
      await interaction.followUp({
        embeds: [new EmbedBuilder().setTitle(`${client.emotes.premium}| **Premium Info**`).setColor(client.colors.aqua).setDescription(`${client.embed.premium}`)],
        components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji(client.emotes.premium).setLabel("Buy Premium").setURL(config.discord.support.invite)])]
      })
    }
    if (interaction.customId === "update") {
      await interaction.deferReply({ ephemeral: true })
      await interaction.followUp({
        embeds: [new EmbedBuilder().setTitle(`${client.emotes.update}| **Bot New Updates**`).setColor(client.colors.theme).setDescription(`${client.embed.update}`)],
      })
    }
    if (interaction.customId === "report") {
      const content = new TextInputBuilder()
        .setCustomId('report')
        .setLabel("What do you want to report?")
        .setRequired(true)
        .setPlaceholder('Enter some text!')
        .setStyle(TextInputStyle.Paragraph)

      const modal = new ModalBuilder()
        .setCustomId('reporting')
        .setTitle('Reporting Bugs or Other Things')
        .addComponents(new ActionRowBuilder().addComponents(content));

      await interaction.showModal(modal);
    }
    if (interaction.customId === "reload_info") {
      let embed = new EmbedBuilder()
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
          value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2).toLocaleString()}/${(process.memoryUsage().rss / 1024 / 1024).toFixed(2).toLocaleString()} MB | \`${Math.trunc(process.memoryUsage().heapUsed * 100 / (process.memoryUsage().rss))}%\`**`,
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

      await interaction.deferUpdate()
      await interaction.editReply({
        embeds: [embed]
      })
    }
    if (interaction.customId === "cancel") {
      await interaction.deferUpdate();
      await interaction.deleteReply();
    }
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
const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Client
} = require('discord.js');
const config = require('../../../config');
const editResponse = require('../../functions/editResponse');
const {
  errorMessage
} = require(`${process.cwd()}/src/functions/functions`);
const {
  HelpCategoryEmbed
} = require(`${process.cwd()}/src/functions/help`);
module.exports = {
  name: 'help',
  description: 'Show to you about bot info and commands.',
  category: 'Information 📊',
  aliases: ["help me", "h"],
  usage: "[command-name]",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1,
  user_permissions: ["SendMessages"],
  bot_permissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "command",
    description: "Write bot command name to show info about it.",
    type: ApplicationCommandOptionType.String,
  }, {
    name: "ephemeral",
    description: "Hide this message from everyone.",
    type: ApplicationCommandOptionType.String,
    choices: [{
      name: 'Enable',
      value: 'true'
    }, {
      name: 'Disable',
      value: 'false'
    }],
    required: false
  }],
  only_message: true,
  only_slash: true,
  /**
   * 
   * @param {Client} client 
   * @param {import("discord.js").Interaction} interaction 
   * @param {string} args 
   * @param {string} lang 
   * @param {string} prefix 
   * @returns 
   */
  run: async (client, interaction, args, lang, prefix) => {
    let db = client.db;
    let command_name = interaction.user ? interaction.options.getString("command") : args.slice(0).join(" ");
    let mes = client.languages[lang].commands.help;
    let member = interaction.guild.members.cache.find(m => m.id === interaction.member.id);
    let help = new EmbedBuilder()
      .setAuthor({
        name: `${mes.embed1.author.replaceAll("{username}", client.user.username)}`
      })
      .setFooter({
        text: `${mes.embed1.footer.replaceAll("{user}", member.user.tag)}`,
        iconURL: member.user.displayAvatarURL({ dynamic: true })
      })
      .setColor(client.colors.theme)
      .addFields([{
        name: `${mes.embed1.field1.name}`,
        value: `${mes.embed1.field1.value.replaceAll("{username}", client.user.username).replaceAll("{invite}", config.discord.default_invite.replace("{clientId}", client.user.id)).replaceAll("{ticket_emote}", client.emotes.tickets).replaceAll("{system_emote}", client.emotes.system).replaceAll("{learn_emote}", client.emotes.learn)}`,
        inline: false
      }, {
        name: `${mes.embed1.field2.name}`,
        value: `${mes.embed1.field2.value.replaceAll("{prefix}", prefix).replaceAll("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`)}`,
        inline: false
      }, {
        name: `${mes.embed1.field3.name}`,
        value: `${mes.embed1.field3.value}`,
        inline: false
      }])
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

    if (command_name) {
      const cmd = client.commands.get(command_name.toLowerCase()) || client.commands.find(a => a.options && a.options.type === ApplicationCommandOptionType.Subcommand && a.options.filter(b => b.name === command_name.toLowerCase())) || client.commands.find(a => a.aliases && a.aliases.includes(command_name.toLowerCase()));
      if (!cmd || !cmd.name) {
        return interaction.reply({ content: `${mes.error1.replaceAll("{error_emote}", client.emotes.error).replaceAll("{command_name}", command_name.toLowerCase())}`, ephemeral: true })
      }
      if (cmd.category === "Owner 👑" && !client.config.owner.some(r => r.includes(member.user.id))) return errorMessage(client, interaction, `${mes.error1.replaceAll("{owners}", client.config.owner.map(id => `<@${id}>`))}`)
      let embed = new EmbedBuilder()
        .setColor(client.colors.theme)
        .setAuthor({
          name: `${mes.embed1.author.replaceAll("{username}", client.user.username)}`
        })
        .setFooter({
          text: `${mes.embed2.footer.replaceAll("{prefix}", prefix).replaceAll("{user}", member.user.tag)}`,
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

      let component = [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(config.discord.default_invite.replace("{clientId}", client.user.id)), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)])]
      let cmds = client.application.commands.cache.find(c => c.name === cmd.name);
      embed.setTitle(`</${cmds.name}:${cmds.id}>`)
      let fields = [{
        name: `${mes.embed2.field1}`,
        value: `${cmd.name}`
      }, {
        name: `${mes.embed2.field2.name}`,
        value: `${cmd.description || mes.embed2.field2.value}`
      }, {
        name: `${mes.embed2.field3}`,
        value: `${cmd.category}`
      }]
      if (cmd.cooldown) {
        fields.push({
          name: `${mes.embed2.field4}`,
          value: `**\`${cmd.cooldown} Seconds\`**`
        })
      }
      if (cmd.options && cmd.options.some(op => op.type === ApplicationCommandOptionType.Subcommand)) {
        let name = [];
        await cmds.options ? cmds.options.some(op => op.type === ApplicationCommandOptionType.Subcommand) ? cmds.options.map((option) => { name.push(cmds.name + " " + option.name) }) : name.push(`${cmds.name}`) : name.push(`${cmds.name}`)
        fields.push({
          name: `${mes.embed2.field5}`,
          value: `**${name.map(n => `</${n}:${cmds.id}>`).join(' , ')}**`
        })
      }
      if (cmd.user_permissions) {
        fields.push({
          name: `${mes.embed2.field6}`,
          value: `**[ ${cmd.user_permissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
      }
      if (cmd.bot_permissions) {
        fields.push({
          name: `${mes.embed2.field7}`,
          value: `**[ ${cmd.bot_permissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
      }
      embed.addFields(fields)
      let message = {
        embeds: [embed],
        components: component
      };
      return interaction.user ? await interaction.followUp(message) : await interaction.reply(message);
    } else {
      let menu_options = [{
        label: `${mes.menu.option1}`,
        value: 'Information 📊',
        emoji: '📊',
      }, {
        label: `${mes.menu.option3}`,
        value: 'Ticket 🎫',
        emoji: '🎫',
      }, {
        label: `${mes.menu.option4}`,
        value: 'Admin 👨🏻‍💼',
        emoji: '👨🏻‍💼',
      }]
      if (config.discord.support.owners.some(r => r.includes(member.user.id))) {
        menu_options.push({
          label: `${mes.menu.option5}`,
          value: 'Owner 👑',
          emoji: '👑',
        })
      }
      let help_menu = new StringSelectMenuBuilder()
        .setCustomId("help_menu")
        .setMaxValues(1)
        .setMinValues(1)
        .setPlaceholder(`${mes.menu.placehoder}`)
        .setOptions(menu_options)

      let home_btn = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel(mes.btn4)
        .setEmoji(client.emotes.home)
        .setCustomId("home_page")

      let message = {
        embeds: [help],
        components: [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)), new ActionRowBuilder().addComponents(home_btn.setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(config.discord.default_invite.replace("{clientId}", client.user.id)), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)])]
      };
      let embedMessage = interaction.user ? await interaction.followUp(message).then(async () => await interaction.fetchReply()) : await interaction.reply(message).then(m => m);
      const collector = embedMessage.createMessageComponentCollector({ time: 70000 });
      collector.on('collect', async (m) => {
        if (m.user.id === member.user.id) {
          if (m.isButton()) {
            if (m.customId === "home_page") {
              await m.deferUpdate()
              await m.editReply({
                embeds: [help],
                components: [new ActionRowBuilder().addComponents(help_menu.setOptions(menu_options).setDisabled(false)), new ActionRowBuilder().addComponents(home_btn.setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(config.discord.default_invite.replace("{clientId}", client.user.id)), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)])]
              })
            }
          }
          if (m.isStringSelectMenu()) {
            if (m.customId === "help_menu") {
              m.values.forEach((value) => {
                return HelpCategoryEmbed(prefix, value, client, m, [new ActionRowBuilder().addComponents(help_menu.setOptions(menu_options.filter(o => o.value !== value))), new ActionRowBuilder().addComponents(home_btn.setDisabled(false))]);
              })
            }
          }
        } else {
          return errorMessage(client, m, `${mes.error3.replace("{user}", member.user).replace("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`)}`)
        }
      })
      setTimeout(async () => {
        return await editResponse({
          interaction,
          message: embedMessage,
          data: {
            components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel(mes.btn6).setStyle(ButtonStyle.Primary).setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn5).setEmoji(client.emotes.premium).setCustomId("premium")), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.btn1).setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(mes.btn7).setEmoji(client.emotes.update).setCustomId(`update`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn2).setEmoji(client.emotes.invite).setURL(config.discord.default_invite.replace("{clientId}", client.user.id)), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.btn3).setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)])]
          }
        });
      }, 70000);
    }
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
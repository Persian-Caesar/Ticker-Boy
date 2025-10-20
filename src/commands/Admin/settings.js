const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  TextInputStyle,
  TextInputBuilder,
  ModalBuilder,
  ChannelSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelType
} = require("discord.js");
const errorMessage = require("../../functions/errorMessage");
const config = require("../../../config");
const colors = require("../../storage/colors.json");
const editResponse = require("../../functions/editResponse");

module.exports = {
  name: "settings",
  description: "Show a dashboard of guild setting for you.",
  category: "Admin 👨🏻‍💼",
  aliases: ["setup", "set", "st"],
  usage: "",
  type: ApplicationCommandType.ChatInput,
  cooldown: 10,
  user_permissions: ["ManageChannels", "ManageGuild", "SendMessages"],
  bot_permissions: ["ManageChannels", "SendMessages", "EmbedLinks"],
  options: [{
    name: "ephemeral",
    description: "Hide this message from everyone.",
    type: ApplicationCommandOptionType.String,
    choices: [{
      name: "Enable",
      value: "true"
    }, {
      name: "Disable",
      value: "false"
    }],
    required: false
  }],
  only_message: true,
  only_slash: true,

  /**
   * 
   * @param {import("discord.js").Client} client 
   * @param {import("discord.js").CommandInteraction} interaction 
   * @param {string} args 
   * @param {string} lang 
   * @returns {void}
   */
  run: async (client, interaction, args, lang) => {

    const db = client.db;
    const member = interaction.guild.members.cache.get(interaction.member.id);
    const mes = client.languages[lang].commands.settings;
    const time = 120000;
    const menu = new StringSelectMenuBuilder()
      .setCustomId("setup_menu")
      .setMaxValues(1)
      .setMinValues(1)
      .setPlaceholder(mes.menu1.placeholder)
      .addOptions(
        [
          {
            label: mes.menu1.option1,
            value: "stlanguage",
            emoji: `${client.emotes.language}`
          },
          {
            label: mes.menu1.option2,
            value: "stpanel",
            emoji: `${client.emotes.ticket}`
          },
          {
            label: mes.menu1.option3,
            value: "stadmin",
            emoji: `${client.emotes.admin}`
          },
          {
            label: mes.menu1.option4,
            value: "stcategory",
            emoji: `${client.emotes.category}`
          },
          {
            label: mes.menu1.option5,
            value: "stlog",
            emoji: `${client.emotes.log}`
          },
          {
            label: mes.menu1.option6,
            value: "sttype",
            emoji: `${client.emotes.type}`
          },
          {
            label: mes.menu1.option7,
            value: "stoption",
            emoji: `${client.emotes.option}`
          },
          {
            label: mes.menu1.option8,
            value: "stclaim",
            emoji: `${client.emotes.claim}`
          }
        ]
      );

    const embed = async function () {
      return new EmbedBuilder()
        .setTitle(
          `${client.emotes.setting}| Welcome to the setting`
          // mes.embed1.title
          // .repalce("{emote}", client.emotes.setting)
        )
        .setColor(colors.theme)
        .setDescription(
          `This is __${client.user.username}__ setting from **${interaction.guild.name}** and you can setup all things you need for setting up your guild.`
          // mes.embed1.description
          // .repalce("{username}", client.user.username)
          // .repalce("{guild}", interaction.guild.name)
        )
        .addFields(
          [
            {
              name: `${client.emotes.down}Bot Language:`,
              value: `${client.emotes.reply} ${client.emotes[lang]}|${client.findlang[lang]}`
            },
            {
              name: `${client.emotes.down}Guild Ticket Type:`,
              value: `${await db.has(`guild_${interaction.guild.id}.ticket_type`) ? `${client.emotes.reply} \`${await db.get(`guild_${interaction.guild.id}.ticket_type`)}\`` : `${client.emotes.reply} \`Reason - Menu - UserTag (Default)\``}`
            },
            {
              name: `${client.emotes.down}Ticket Claim:`,
              value: `${await db.get(`guild_${interaction.guild.id}.ticket_claim`) === true ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`
            },
            {
              name: `${client.emotes.down}Guild Admin Role:`,
              value: `${await db.has(`guild_${interaction.guild.id}.admin_roles`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${interaction.guild.id}.admin_roles`)).map(r => `<@&${r}>`).join(", ")}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`
            },
            {
              name: `${client.emotes.down}Guild Mod Log:`,
              value: `${await db.has(`guild_${interaction.guild.id}.modlog`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${interaction.guild.id}.modlog`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`
            },
            {
              name: `${client.emotes.down}Guild Parent Channel:`,
              value: `${await db.has(`guild_${interaction.guild.id}.categories`) ? `${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Open Channel:\n${await db.has(`guild_${interaction.guild.id}.categories.open`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${interaction.guild.id}.categories.open`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}\n\n${client.emotes.reply}${client.emotes.arrow_down}Guild Parent Close Channel:\n${await db.has(`guild_${interaction.guild.id}.categories.close`) ? `${client.emotes.reply}${client.emotes.arrow_right} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${client.emotes.arrow_right} <#${await db.get(`guild_${interaction.guild.id}.categories.close`)}>` : `${client.emotes.reply}${client.emotes.arrow_right} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`
            },
            {
              name: `${client.emotes.down}Guild Ticket Menu Option:`,
              value: `${await db.has(`guild_${interaction.guild.id}.panel.menu_options`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${interaction.guild.id}.panel.menu_options`)).map(o => `**Name:** \`${o.data.value}\` ${o.data.emoji ? `| **Emoji:** ${o.data.emoji}` : ""}`).join(`\n${client.emotes.reply}`)}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`
            }
          ]
        )
        .setFooter({
          text: `Setting • Requested By ${member.user.tag} `,
          iconURL: member.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTimestamp();
    };

    const components = [
      new ActionRowBuilder()
        .addComponents(menu),

      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Report")
            .setEmoji(client.emotes.report)
            .setCustomId(`report`),

          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Support")
            .setEmoji(client.emotes.help)
            .setURL(`${config.discord.support.invite}`)
        ),

      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel("Home Page")
            .setDisabled(true)
            .setEmoji(client.emotes.home)
            .setCustomId("home_page")
        )
    ];

    const message = {
      embeds: [await embed()],
      components: components,
      fetchReply: true
    };

    const msg = interaction.user ? await interaction.followUp(message).then(async () => await interaction.fetchReply()) : await interaction.reply(message).then(m => m);

    const collector = msg.createMessageComponentCollector({ time: time })

    // collector.on("collect", async (collect) => settingCollector(client, collect, member, embed));
    collector.on("collect", async (collect) => {
      const db = client.db;
      if (collect.user.id === member.user.id) {
        if (collect.isButton()) {
          if (collect.customId === "home_page") {
            const components = [
              new ActionRowBuilder()
                .addComponents(menu),

              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel("Report")
                    .setEmoji(client.emotes.report)
                    .setCustomId(`report`),

                  new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Support")
                    .setEmoji(client.emotes.help)
                    .setURL(`${config.discord.support.invite}`)
                ),

              new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Home Page")
                    .setDisabled(true)
                    .setEmoji(client.emotes.home)
                    .setCustomId("home_page")
                )
            ];

            return await collect.update({
              embeds: [await embed()],
              components: components,
            });
          };

          if (collect.customId === "menu_options") {
            const input_1 = new TextInputBuilder()
              .setCustomId("name")
              .setLabel("What is option name?")
              .setRequired(true)
              .setPlaceholder("Enter some text!")
              .setStyle(TextInputStyle.Short);

            const input_2 = new TextInputBuilder()
              .setCustomId("emoji")
              .setLabel("What is option emoji?")
              .setRequired(false)
              .setPlaceholder("Enter some emoji!")
              .setStyle(TextInputStyle.Short);

            const modal = new ModalBuilder()
              .setCustomId("menu_option_modal")
              .setTitle("Ticket System Menu Option")
              .addComponents(
                new ActionRowBuilder().addComponents(input_1),
                new ActionRowBuilder().addComponents(input_2)
              );

            await collect.showModal(modal)
          };

          if (collect.customId === "panel_message") {
            let channel_id = await db.get(`guild_${collect.guild.id}.panel.channel`);
            let channel = await collect.guild.channels.cache.find(c => c.id === channel_id)
            await collect.deferUpdate()
            await collect.editReply({
              embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`setup your guild ticket system in ${channel} with default or customize.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("panel_message_default").setEmoji(client.emotes.system).setLabel("Setup Panel Message To Default").setStyle(ButtonStyle.Primary), new ButtonBuilder().setCustomId("panel_message_custom").setEmoji(client.emotes.hamer).setLabel("Setup Panel Message To Customize").setStyle(ButtonStyle.Success)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
            })
          };

          if (collect.customId === "panel_message_custom") {
            let ticket_modal = new ModalBuilder()
              .setCustomId("panel_message_modal")
              .setTitle("Setup Ticket")
            ticket_modal.addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_title").setLabel("Embed Title").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Title Here ...").setRequired(false)), new ActionRowBuilder().addComponents([new TextInputBuilder().setCustomId("ticket_description").setLabel("Embed Description").setStyle(TextInputStyle.Paragraph).setPlaceholder("Place Ticket Embed Description Here ...").setRequired(true)]), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_color").setLabel("Embed Color").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Embed Color Hex Code Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_name").setLabel("Button Name").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Name Here ...").setRequired(false)), new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId("ticket_button_emoji").setLabel("Button Emoji").setStyle(TextInputStyle.Short).setPlaceholder("Place Ticket Button Emoji Here ...").setRequired(false)))
            await collect.showModal(ticket_modal)
          };

          if (collect.customId === "panel_message_default") {
            let channel_id = await db.get(`guild_${collect.guild.id}.panel.channel`);
            let channel = await collect.guild.channels.cache.find(c => c.id === channel_id)
            let embed = new EmbedBuilder().setColor(client.colors.theme)
            embed.setTitle(`${client.emotes.ticket}| Ticket System`)
            embed.setDescription(`To create a ticket channel click to ${client.emotes.mail}`)
            embed.setFooter({
              text: `${client.embed.footerText}`,
              iconURL: collect.guild.iconURL({ dynamic: true })
            })
            await collect.deferUpdate()
            await collect.editReply({
              embeds: [new EmbedBuilder().setTitle(client.emotes.success + "| Panel Message Is Successfuly Setuped To Default").setColor(client.colors.theme).setDescription(`setup server ticket system in ${channel} to default type is successfully.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("ticket_default").setEmoji(client.emotes.system).setLabel("Setup Panel Message To Default").setStyle(ButtonStyle.Primary).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
            })
            await channel.send({
              embeds: [embed],
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("ticket-create").setEmoji(client.emotes.mail).setLabel("Create Ticket").setStyle(ButtonStyle.Success))]
            })
          };

          if (collect.customId === "claim_off") {
            await collect.deferUpdate()
            await collect.editReply({
              embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`setup your guild ticket claim to disabled${client.emotes.disable1}${client.emotes.disable2}`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("claim_off").setEmoji(client.emotes.x).setLabel("Disabled Ticket Claim").setStyle(ButtonStyle.Secondary).setDisabled(true), new ButtonBuilder().setCustomId("claim_on").setEmoji(client.emotes.tick).setLabel("Enable Ticket Claim").setStyle(ButtonStyle.Success)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
            })
            await db.set(`guild_${collect.guild.id}.ticket_claim`, false)
          };

          if (collect.customId === "claim_on") {
            await collect.deferUpdate()
            await collect.editReply({
              embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`setup your guild ticket claim to enabled${client.emotes.enable1}${client.emotes.enable2}`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("claim_off").setEmoji(client.emotes.x).setLabel("Disabled Ticket Claim").setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId("claim_on").setEmoji(client.emotes.tick).setLabel("Enable Ticket Claim").setStyle(ButtonStyle.Success).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
            })
            await db.set(`guild_${collect.guild.id}.ticket_claim`, true)
          };

          if (collect.customId === "parent_open") {
            await collect.deferUpdate()
            await collect.editReply({
              embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setting`).setColor(client.colors.theme).setDescription(`Select category channel you need to add on bot **parent open channel** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
              components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_open", placeholder: "Select Some Category!!", channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Open Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
            })
          };

          if (collect.customId === "parent_close") {
            await collect.deferUpdate()
            await collect.editReply({
              embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setting`).setColor(client.colors.theme).setDescription(`Select category channel you need to add on bot **parent close channel** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
              components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_close", placeholder: "Select Some Category!!", channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Close Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_close"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
            })
          };

          if (collect.customId === "remove_admin_roles") {
            if (await db.has(`guild_${collect.guild.id}.admin_roles`)) {
              await db.delete(`guild_${collect.guild.id}.admin_roles`)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Disabled`).setColor(client.colors.theme).setDescription(`**admin role** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: "theme", placeholder: "Admin Role Is Disabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Admin Role").setEmoji(client.emotes.trash).setCustomId("remove_admin_roles").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            } else {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *admin role* setup it:**\n Select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: "admin_roles", placeholder: "Select Some Roles!!" })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Admin Role").setEmoji(client.emotes.trash).setCustomId("remove_admin_roles").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          };

          if (collect.customId === "remove_parent") {
            if (await db.has(`guild_${collect.guild.id}.categories`)) {
              await db.delete(`guild_${collect.guild.id}.categories`)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Parent Open Channel").setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Parent Close Channel").setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            } else {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent open channel* setup it:**\nSelect module of channel you need to add on bot **parent channel** on button below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Parent Open Channel").setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Parent Close Channel").setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          };

          if (collect.customId === "remove_parent_open") {
            if (await db.has(`guild_${collect.guild.id}.categories.open`)) {
              await db.delete(`guild_${collect.guild.id}.categories.open`)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent open channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_open", placeholder: "Parent Open Channel Is Disabled!!", channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Open Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_open").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            } else {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent open channel* setup it:**\nSelect category channel you need to add on bot **parent open channel** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_open", placeholder: "Select Some Category!!", channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Open Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_open").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          };

          if (collect.customId === "remove_parent_close") {
            if (await db.has(`guild_${collect.guild.id}.categories.close`)) {
              await db.delete(`guild_${collect.guild.id}.categories.close`)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Disabled`).setColor(client.colors.theme).setDescription(`**parent close channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_close", placeholder: "Parent Close Channel Is Disabled!!", channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Close Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_close").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            } else {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *parent close channel* setup it:**\nSelect category channel you need to add on bot **parent close channel** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_close", placeholder: "Select Some Category!!", channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Close Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_close").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          };

          if (collect.customId === "remove_mod_log") {
            if (await db.has(`guild_${collect.guild.id}.modlog`)) {
              await db.delete(`guild_${collect.guild.id}.modlog`)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Disabled`).setColor(client.colors.theme).setDescription(`**mod log** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "theme", placeholder: "Mod Log Is Disabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Mod Log").setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            } else {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *mod log* setup it:**\nSelect channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "mod_log", placeholder: "Select Some Channel!!", channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Mod Log").setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          };

          if (collect.customId === "remove_panel_channel") {
            if (await db.has(`guild_${collect.guild.id}.ticket.panel`)) {
              await db.delete(`guild_${collect.guild.id}.panel.channel`)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Disabled`).setColor(client.colors.theme).setDescription(`**mod log** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "theme", placeholder: "Mod Log Is Disabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Mod Log").setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            } else {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *panel channel* setup it:**\nSelect you need to add on bot **panel channel** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "panel_channel", placeholder: "Select Some Channel!!", channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Panel Channel").setEmoji(client.emotes.trash).setCustomId("remove_panel_channel").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          };

          if (collect.customId === "remove_menu_option") {
            if (await db.has(`guild_${collect.guild.id}.panel.menu_options`)) {
              await db.delete(`guild_${collect.guild.id}.panel.menu_options`)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Disabled`).setColor(client.colors.theme).setDescription(`**menu option** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Setup Menu Option").setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Menu Option").setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            } else {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Setting`).setColor(client.colors.theme).setDescription(`**Please before disabled *menu option* setup it:**\nSelect channel you need to add on bot **menu option** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Setup Menu Option").setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Menu Option").setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          };
        };

        if (collect.isStringSelectMenu()) {
          if (collect.customId === "setup_menu") {
            if (collect.values[0] === "stpanel") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Panel Setting`).setColor(client.colors.theme).setDescription(`please select channel you need to add on bot **panel channel** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "panel_channel", placeholder: "Select Some Channel!!", channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Panel Channel").setEmoji(client.emotes.trash).setCustomId("remove_panel_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (collect.values[0] === "stclaim") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Claim Setting`).setColor(client.colors.theme).setDescription(`please click on two button in blew for setup **ticket claim** to ON or OFF.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Disable").setEmoji(client.emotes.x).setCustomId(`claim_off`), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Enabele").setEmoji(client.emotes.tick).setCustomId(`claim_on`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (collect.values[0] === "stlanguage") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Bot Language Setting`).setColor(client.colors.theme).setDescription(`please select some languages you need to add on bot **language** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setMaxValues(1).setMinValues(1).setPlaceholder(`In Select!!`).setCustomId(`bot_language`).addOptions([{ label: "English (en-US)", value: "en-US", emoji: client.emotes["en-US"] }, { label: "Persian (per)", value: "per", emoji: client.emotes["per"] }])), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (collect.values[0] === "stadmin") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.theme).setDescription(`please select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: "admin_roles", placeholder: "Select Some Roles!!", maxValues: 5 })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Admin Role").setEmoji(client.emotes.trash).setCustomId("remove_admin_roles"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (collect.values[0] === "stcategory") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.theme).setDescription(`please select module of channel you need to add on bot **parent channel** on button below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Parent Open Channel").setEmoji(client.emotes.open).setCustomId("parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Parent Close Channel").setEmoji(client.emotes.close).setCustomId("parent_close")]), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (collect.values[0] === "stlog") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.theme).setDescription(`please select channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "mod_log", placeholder: "Select Some Channel!!", channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Mod Log").setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (collect.values[0] === "stoption") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Menu Option Setting`).setColor(client.colors.theme).setDescription(`please click and write option you need to add on bot **menu option** on button below.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Setup Menu Option").setEmoji(client.emotes.option).setCustomId(`menu_options`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Menu Option").setEmoji(client.emotes.trash).setCustomId("remove_menu_option"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
            if (collect.values[0] === "sttype") {
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Type Setting`).setColor(client.colors.theme).setDescription(`In soon...`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            }
          }
          if (collect.customId === "bot_language") {
            collect.values.forEach(async (value) => {
              await db.set(`guild_${collect.guild.id}.language`, value)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Bot Language Setuped`).setColor(client.colors.theme).setDescription(`bot **language** successfully in guild have setuped to \`${value}\`.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setMaxValues(1).setMinValues(1).setPlaceholder(`In Select!!`).setCustomId(`bot_language`).setDisabled(true).addOptions([{ label: "English (en-US)", value: "en-US", emoji: client.emotes["en-US"] }, { label: "Persian (per)", value: "per", emoji: client.emotes["per"] }])), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            })
          }
        }
        if (collect.isChannelSelectMenu()) {
          if (collect.customId === "parent_open") {
            collect.values.forEach(async (value) => {
              let channel = collect.guild.channels.cache.find(r => r.id === value);
              await db.set(`guild_${collect.guild.id}.categories.open`, channel.id)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Open Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **parent open channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_open", placeholder: "Parent Open Channel Is Enabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Open Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_open"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            })
          }
          if (collect.customId === "parent_close") {
            collect.values.forEach(async (value) => {
              let channel = collect.guild.channels.cache.find(r => r.id === value);
              await db.set(`guild_${collect.guild.id}.categories.close`, channel.id)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Close Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **parent close channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "parent_close", placeholder: "Parent Close Channel Is Enabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Parent Close Channel").setEmoji(client.emotes.trash).setCustomId("remove_parent_close"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            })
          }
          if (collect.customId === "mod_log") {
            collect.values.forEach(async (value) => {
              let channel = collect.guild.channels.cache.find(r => r.id === value);
              await db.set(`guild_${collect.guild.id}.modlog`, channel.id)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setuped`).setColor(client.colors.theme).setDescription(`guild **mod log** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "theme", placeholder: "Mod Log Is Enabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Mod Log").setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            })
          }
          if (collect.customId === "panel_channel") {
            collect.values.forEach(async (value) => {
              let channel = collect.guild.channels.cache.find(r => r.id === value);
              await db.set(`guild_${collect.guild.id}.panel.channel`, channel.id)
              await collect.deferUpdate()
              await collect.editReply({
                embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Panel Channel Setuped`).setColor(client.colors.theme).setDescription(`guild **panel channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
                components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: "theme", placeholder: "Panel Channel Is Enabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel("Next Step").setEmoji(client.emotes.next).setCustomId(`panel_message`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Panel Channel").setEmoji(client.emotes.trash).setCustomId("remove_panel_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
              })
            })
          }
        }
        if (collect.isRoleSelectMenu()) {
          if (collect.customId === "admin_roles") {
            let roles = []
            await collect.values.forEach(async (value) => {
              await db.push(`guild_${collect.guild.id}.admin_roles`, value)
              roles.push(value)
            })
            //let roles = await db.get(`guild_${collect.guild.id}.admin_roles`);
            await collect.deferUpdate()
            await collect.editReply({
              embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setuped`).setColor(client.colors.theme).setDescription(`guild **admin role** successfully setuped to ${roles.map(r => `<@&${r}>`).join(", ")}.`).setFooter({ text: `Setting • Requested By ${collect.user.tag} `, iconURL: collect.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(collect.guild.iconURL({ dynamic: true }))],
              components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: "theme", placeholder: "Admin Role Is Enabled!!", disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel("Report").setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Support").setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel("Remove Admin Role").setEmoji(client.emotes.trash).setCustomId("remove_admin_roles"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel("Home Page").setEmoji(client.emotes.home).setCustomId("home_page"))]
            })
          }
        }
      } else {
        errorMessage(client, m, `This interaction only for ${member.user} and you can"t use it.`)
      }
    });

    // Timeout
    setTimeout(async () => {
      const component = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("timeout")
            .setEmoji(client.emotes.alert)
            .setLabel("Time Is Up")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true),

          new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Report")
            .setEmoji(client.emotes.report)
            .setCustomId(`report`),

          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Support")
            .setEmoji(client.emotes.help)
            .setURL(`${config.discord.support.invite}`)
        );
      return await editResponse({
        interaction,
        message: msg,
        data: {
          components: [component]
        }
      });
    }, time);
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
const {
    ButtonBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
    ButtonStyle,
    ChannelType,
    ApplicationCommandType,
    ApplicationCommandOptionType,
    ChannelSelectMenuBuilder,
    RoleSelectMenuBuilder,
    ModalBuilder,
    TextInputBuilder,
    PermissionsBitField,
    TextInputStyle
  } = require('discord.js');
  const {
    errorMessage
  } = require(`${process.cwd()}/functions/functions`);
  module.exports = {
    name: 'settings',
    category: 'Setup 💻',
    type: ApplicationCommandType.ChatInput,
    cooldown: 1,
    description: "Show a dashboard of guild setting for you.",
    userPermissions: ["ManageChannels", "ManageGuild", "SendMessages"],
    botPermissions: ["ManageChannels", "SendMessages", "EmbedLinks"],
    run: async (client, interaction, args, lang) => {
      let db = client.db;
      try {
        let menu = new StringSelectMenuBuilder().setCustomId("setup_menu").setMaxValues(1).setMinValues(1).setPlaceholder(`${client.emotes.setting}| Click me to setup !!`).addOptions([{ label: `Setup Bot Language`, value: `stlanguage`, emoji: `${client.emotes.language}` }, { label: `Setup Admin Role`, value: `stadmin`, emoji: `${client.emotes.admin}` }, { label: `Setup Ticket Category`, value: `stcategory`, emoji: `${client.emotes.category}` }, { label: `Setup Ticket Log`, value: `stlog`, emoji: `${client.emotes.log}` }, { label: `Setup Ticket Type`, value: `sttype`, emoji: `${client.emotes.type}` }, { label: `Setup Ticket Menu Option`, value: `stoption`, emoji: `${client.emotes.option}` }])
        let time = 120000;
        interaction.reply({
          embeds: [new EmbedBuilder().setTitle(`${client.emotes.setting}| Welcome to the setting`).setColor(client.colors.none).setDescription(`This is __${client.user.username}__ setting from **${interaction.guild.name}** and you can setup all things you need for setting up your guild.`).addFields([{ name: `Guild Ticket Type:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.type`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} \`${await db.get(`guild_${interaction.guild.id}.ticket.type`)}\`` : `${client.emotes.reply} \`Reason - Menu - UserTag\` (Default)`}`, inline: false }, { name: `Guild Admin Role:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.admin_role`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}<@&${await db.get(`guild_${interaction.guild.id}.ticket.admin_role`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `Guild Mod Log:`, value: `${await db.has(`guild_${interaction.guild.id}.modlog`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${interaction.guild.id}.modlog`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `Guild Parent Channel:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.category`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${interaction.guild.id}.ticket.category`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `Guild Ticket Menu Option:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.menu_option`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${interaction.guild.id}.ticket.menu_option`)).map(o => `**Name:** \`${o.value}\` | **Emoji:** ${o.emoji ? o.emoji : "none"}`).join(`\n${client.emotes.reply}`)}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }]).setFooter({ text: `Setting • Requested By ${interaction.user.tag} `, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true })).setTimestamp()],
          components: [new ActionRowBuilder().addComponents(menu), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setDisabled(true).setEmoji(client.emotes.home).setCustomId("home_page"))],
          fetchReply: true
        }).then(async(msg) =>{
          await msg.createMessageComponentCollector({ time: time }).on('collect', async (m) => {
            if(m.user.id === interaction.user.id){
              if (m.isButton()) {
                if (m.customId === "home_page") {
                  m.update({
                    embeds: [new EmbedBuilder().setTitle(`${client.emotes.setting}| Welcome to the setting`).setColor(client.colors.none).setDescription(`This is __${client.user.username}__ setting from **${interaction.guild.name}** and you can setup all things you need for setting up your guild.`).addFields([{ name: `Guild Ticket Type:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.type`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} \`${await db.get(`guild_${interaction.guild.id}.ticket.type`)}\`` : `${client.emotes.reply} \`Reason - Menu - UserTag\` (Default)`}`, inline: false }, { name: `Guild Admin Role:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.admin_role`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}<@&${await db.get(`guild_${interaction.guild.id}.ticket.admin_role`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `Guild Mod Log:`, value: `${await db.has(`guild_${interaction.guild.id}.modlog`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${interaction.guild.id}.modlog`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `Guild Parent Channel:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.category`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply} <#${await db.get(`guild_${interaction.guild.id}.ticket.category`)}>` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }, { name: `Guild Ticket Menu Option:`, value: `${await db.has(`guild_${interaction.guild.id}.ticket.menu_option`) ? `${client.emotes.reply} Enable ${client.emotes.enable1}${client.emotes.enable2}\n${client.emotes.reply}${(await db.get(`guild_${interaction.guild.id}.ticket.menu_option`)).map(o => `**Name:** \`${o.value}\` | **Emoji:** ${o.emoji ? o.emoji : "none"}`).join(`\n${client.emotes.reply}`)}` : `${client.emotes.reply} Disabled ${client.emotes.disable1}${client.emotes.disable2}`}`, inline: false }]).setFooter({ text: `Setting • Requested By ${interaction.user.tag} `, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(interaction.guild.iconURL({ dynamic: true })).setTimestamp()],
                    components: [new ActionRowBuilder().addComponents(menu), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(true))],
                  })
                }
                if (m.customId === "menu_option") {
                  const input_1 = new TextInputBuilder()
                    .setCustomId('name')
                    .setLabel("What is option name?")
                    .setRequired(true)
                    .setPlaceholder('Enter some text!')
                    .setStyle(TextInputStyle.Short)
                  const input_2 = new TextInputBuilder()
                    .setCustomId('emoji')
                    .setLabel("What is option emoji?")
                    .setRequired(false)
                    .setPlaceholder('Enter some emoji!')
                    .setStyle(TextInputStyle.Short)
                  const modal = new ModalBuilder()
                    .setCustomId('menu_option_modal')
                    .setTitle('Ticket System Menu Option')
                    .addComponents(new ActionRowBuilder().addComponents(input_1), new ActionRowBuilder().addComponents(input_2));
                  await m.showModal(modal)
                }
                if (m.customId === "remove_admin_role") {
                  if (await db.has(`guild_${interaction.guild.id}.ticket.admin_role`)) {
                    await db.delete(`guild_${interaction.guild.id}.ticket.admin_role`)
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Disabled`).setColor(client.colors.none).setDescription(`**admin role** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'none', placeholder: 'Admin Role Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_role").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  } else {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.none).setDescription(`**Please before disabled *admin role* setup it:**\n Select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'admin_role', placeholder: 'Select Some Roles!!' })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_role").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                }
                if (m.customId === "remove_parent_channel") {
                  if (await db.has(`guild_${interaction.guild.id}.ticket.category`)) {
                    await db.delete(`guild_${interaction.guild.id}.ticket.category`)
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Disabled`).setColor(client.colors.none).setDescription(`**parent channel** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'none', placeholder: 'Parent Channel Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_channel").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  } else {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.none).setDescription(`**Please before disabled *parent channel* setup it:**\nSelect category channel you need to add on bot **parent channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_channel', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_channel").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                }
                if (m.customId === "remove_mod_log") {
                  if (await db.has(`guild_${interaction.guild.id}.modlog`)) {
                    await db.delete(`guild_${interaction.guild.id}.modlog`)
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Disabled`).setColor(client.colors.none).setDescription(`**mod log** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'none', placeholder: 'Mod Log Is Disabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  } else {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.none).setDescription(`**Please before disabled *mod log* setup it:**\nSelect channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'mod_log', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                }
                if (m.customId === "remove_menu_option") {
                  if (await db.has(`guild_${interaction.guild.id}.ticket.menu_option`)) {
                    await db.delete(`guild_${interaction.guild.id}.ticket.menu_option`)
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Disabled`).setColor(client.colors.none).setDescription(`**menu option** is successfully disabled and remove it on guild.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Menu Option Disbled').setEmoji(client.emotes.option).setCustomId(`menu_option`).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  } else {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Setting`).setColor(client.colors.none).setDescription(`**Please before disabled *menu option* setup it:**\nSelect channel you need to add on bot **menu option** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_option`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option").setDisabled(true), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                }
              }
              if (m.isStringSelectMenu()) {
                if (m.customId === "setup_menu") {
                  if (m.values[0] === "stlanguage") {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Bot Language Setting`).setColor(client.colors.none).setDescription(`please select some languages you need to add on bot **language** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new StringSelectMenuBuilder().setDisabled(true).setMaxValues(1).setMinValues(1).setPlaceholder(`In soon!!`).setCustomId(`bot_language`).addOptions([{ label: "English (en-US)", value: "en-US", emoji: client.emotes["en-US"] }])), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                  if (m.values[0] === "stadmin") {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setting`).setColor(client.colors.none).setDescription(`please select  role you need to add on bot **admin role** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'admin_role', placeholder: 'Select Some Roles!!' })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_role"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                  if (m.values[0] === "stcategory") {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setting`).setColor(client.colors.none).setDescription(`please select category channel you need to add on bot **parent channel** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'parent_channel', placeholder: 'Select Some Category!!', channelTypes: [ChannelType.GuildCategory] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                  if (m.values[0] === "stlog") {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setting`).setColor(client.colors.none).setDescription(`please select channel you need to add on bot **mod log** on menu below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'mod_log', placeholder: 'Select Some Channel!!', channelTypes: [ChannelType.GuildText] })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                  if (m.values[0] === "stoption") {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Menu Option Setting`).setColor(client.colors.none).setDescription(`please click and write option you need to add on bot **menu option** on button below.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Setup Menu Option').setEmoji(client.emotes.option).setCustomId(`menu_option`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                  if (m.values[0] === "sttype") {
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Ticket Type Setting`).setColor(client.colors.none).setDescription(`In soon...`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  }
                }
              }
              if (m.isChannelSelectMenu()) {
                if (m.customId === "parent_channel") {
                  m.values.forEach(async (value) => {
                    let channel = m.guild.channels.cache.find(r => r.id === value);
                    await db.set(`guild_${interaction.guild.id}.ticket.category`, channel.id)
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Parent Channel Setuped`).setColor(client.colors.none).setDescription(`guild **parent channel** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'none', placeholder: 'Parent Channel Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Parent Channel').setEmoji(client.emotes.trash).setCustomId("remove_parent_channel"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  })
                }
                if (m.customId === "mod_log") {
                  m.values.forEach(async (value) => {
                    let channel = m.guild.channels.cache.find(r => r.id === value);
                    await db.set(`guild_${interaction.guild.id}.modlog`, channel.id)
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Mod Log Setuped`).setColor(client.colors.none).setDescription(`guild **mod log** successfully setuped to ${channel}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new ChannelSelectMenuBuilder({ customId: 'none', placeholder: 'Mod Log Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Mod Log').setEmoji(client.emotes.trash).setCustomId("remove_mod_log"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  })
                }
              }
              if (m.isRoleSelectMenu()) {
                if (m.customId === "admin_role") {
                  m.values.forEach(async (value) => {
                    let role = m.guild.roles.cache.find(r => r.id === value);
                    await db.set(`guild_${interaction.guild.id}.ticket.admin_role`, role.id)
                    m.update({
                      embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Admin Role Setuped`).setColor(client.colors.none).setDescription(`guild **admin role** successfully setuped to ${role}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                      components: [new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder({ customId: 'none', placeholder: 'Admin Role Is Enabled!!', disabled: true })), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Admin Role').setEmoji(client.emotes.trash).setCustomId("remove_admin_role"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                    })
                  })
                }
              }
            } else {
              return errorMessage(client, m, `This message only for ${interaction.user} and you can't use it.`)
            }
          })
          await interaction.awaitModalSubmit({ time: time }).then(async(m)=>{
           try{
            if(!m.user.id === interaction.user.id) return errorMessage(client, m, `This message only for ${m.user} and you can't use it.`)
            if(m.isModalSubmit()){
              if(m.customId === "menu_option_modal"){
                  const name = m.fields.getTextInputValue('name');
                  const emoji = m.fields.getTextInputValue('emoji');
                  if (emoji) await db.push(`guild_${m.guild.id}.ticket.menu_option`, {
                    label: name,
                    value: name,
                    emoji: emoji
                  })
                  else await db.push(`guild_${m.guild.id}.ticket.menu_option`, {
                    label: name,
                    value: name
                  })
                  m.update({
                    embeds: [new EmbedBuilder().setTitle(`${client.emotes.system}| Menu Option Setuped`).setColor(client.colors.none).setDescription(`guild **menu option** successfully setuped.\n**Name:** \`${name}\` | **Emoji:** ${emoji ? `${emoji}` : "none"}.`).setFooter({ text: `Setting • Requested By ${m.user.tag} `, iconURL: m.user.displayAvatarURL({ dynamic: true }) }).setThumbnail(m.guild.iconURL({ dynamic: true }))],
                    components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Menu Option Enabel').setEmoji(client.emotes.option).setCustomId(`menu_option`).setDisabled(true)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)), new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Remove Menu Option').setEmoji(client.emotes.trash).setCustomId("remove_menu_option"), new ButtonBuilder().setStyle(ButtonStyle.Success).setLabel('Home Page').setEmoji(client.emotes.home).setCustomId("home_page").setDisabled(false))]
                  })
                }
            }
           }catch(e){
             errorMessage(client, m, `\`\`\`js\n${e}\n\`\`\``)
           }
          })
        })
        setTimeout(() => {
            interaction.editReply({
              components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true)).addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))]
            })
        }, time)
      } catch (e) {
        console.error(e)
        errorMessage(client, interaction, `\`\`\`js\n${e}\`\`\``)
      }
    }
  }
  /**
   * @Info
   * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
   * @Info
   * Work for Persian Caesar | https://dsc.gg/persian-caesar
   * @Info
   * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
   * @Info
   */

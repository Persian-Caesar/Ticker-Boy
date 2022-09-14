const {
  Client,
  Collection,
  Intents,
  Permissions,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageSelectMenu  
} = require("discord.js");
module.exports = {
  HelpCategoryEmbed: async function(commands, CategoryName, client, message, prefix){
  let embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .setTitle(`${client.user.username} | **${CategoryName}** Help`)
      .setDescription(`**See the text below to use the commands.\n\n${(client.commands.filter(c => c.category === CategoryName)).map(i => '`' + prefix + i.name + '`').join(' , ')}**`)
      .setURL('https://discord.gg/vgnhGXabNw')
      .setFooter({ text: `Message Guild ${message.guild.name} | Made by Mr.SIN RE#1528 |`, iconURL: `https://cdn.discordapp.com/attachments/902034619791196221/905054458793312327/2GU.gif`})
      .setAuthor({ name: `Requested by ${message.user.username}`, iconURL: message.member.displayAvatarURL({ dynamic: true }) })      
      .setColor(client.colors.none)
      commands.filter(c => c.category === CategoryName).forEach((cmd) => {
        embed.addFields({
           name: `**${prefix}${cmd.name} ${cmd.usage ? `\`${cmd.usage}\`` : ""}**`, 
           value: `**Description: \`${cmd.description}\` | Aliases:** \`(${cmd.aliases ? cmd.aliases : ""})\``, 
           inline: true 
          });
    })
    return message.update({
              embeds: [embed],
              components: [new MessageActionRow()
                .addComponents(new MessageSelectMenu()
                   .setCustomId("help_menu")
                   .setMaxValues(1)
                   .setMinValues(1)
                   .setPlaceholder("🆘| Click me to show bot commands !!")
                   .addOptions([
                         {
                             label: 'Infos Help',
                             value: 'inf',
                             description: 'send commands of Infos📊 Category',
                             emoji: {
                               name: '📊',
                             },
                         },
                         {
                             label: 'Setup Help',
                             value: 'stp',
                             description: 'send commands of Setup💻 Category',
                             emoji: {
                               name: '💻',
                             },
                         },
                         {
                             label: 'Ticket Help',
                             value: 'tic',
                             description: 'send commands of Ticket🎫 Category',
                             emoji: {
                               name: '🎫',
                             },
                         },
                         {
                             label: 'VIP Help',
                             value: 'vip',
                             description: 'send commands of VIP💎 Category',
                             emoji: {
                               name: '💎',
                             },
                         },
                           {
                             label: 'Owner Help',
                             value: 'owr',
                             description: 'send commands of Owner👑 Category',
                             emoji: {
                               name: '👑',
                             },
                         },
                   ])
                ),new MessageActionRow()
                .addComponents([new MessageButton()
                  .setStyle('LINK')
                  .setLabel('Invite Me')
                  .setEmoji('🤖')
                  .setURL(client.config.discord.invite)
                ],[new MessageButton()
                    .setStyle('LINK')
                    .setLabel('Support Server!')
                    .setEmoji('🧰')
                    .setURL(`${client.config.discord.server_support}`)
                ])
             ]
             //ephemeral: true
    });
  },
  epochDateNow: async function (){
  const TimeStampDate = Date.parse(new Date()) / 1000;
  return TimeStampDate
  },
  epochDateCustom: async function (date){
  const TimeStampDate = Date.parse(date) / 1000;
  return TimeStampDate
  },
  formatDate: function (date) {
    return new Intl.DateTimeFormat('en-US').format(date);
  },
  randomRange: async function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  commandsCoolDown: async function (client, message, command) {
    if (client.cooldowns) {
      if (!client.cooldowns.has(client.commands.cooldown)) {
        client.cooldowns.set(client.commands.name, client.commands);
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(client.commands.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;
      if (timestamps.has(message.member.id)) {
        const expirationTime = timestamps.get(message.member.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply({
              embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setDescription(`**${client.emotes.alert}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
              ]
          })
        }
      }
      timestamps.set(message.member.id, now);
      setTimeout(() => timestamps.delete(message.member.id), cooldownAmount);
    }
  },
  slashCommandsCoolDown: async function (client, interaction, command) {
    if (client.cooldowns) {
      if (!client.cooldowns.has(client.slashCommands.cooldown)) {
        client.cooldowns.set(client.slashCommands.name, client.slashCommands);
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(client.slashCommands.name);
      const cooldownAmount = (client.slashCommands.cooldown || 5) * 1000;
      if (timestamps.has(interaction.member.id)) {
        const expirationTime = timestamps.get(interaction.member.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return await interaction.reply({
              embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setDescription(`**${client.emotes.alert}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
              ],
              ephemeral: true
          });
        }
      }
      timestamps.set(interaction.member.id, now);
      setTimeout(() => timestamps.delete(interaction.member.id), cooldownAmount);
    }
  },
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
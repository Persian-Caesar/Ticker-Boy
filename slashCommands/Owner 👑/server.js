const {
 MessageActionRow,
 MessageButton,
 MessageEmbed,
 Permissions
} = require("discord.js");
module.exports = {
 name: 'server',
 category: 'Owner 👑',
 cooldown: 1,
 userPermissions: [""],
 description: "owner commands about server.",
 botPermissions: [""],
 options: [{
  name: 'list',
  type: "SUB_COMMAND",
  description: "list of all servers bot join.",
  options: [],
 }],
 run: async (client, interaction) => {
  switch (interaction.options.getSubcommand()) {
   case "list": {
    if (!client.config.owner.some(r => r.includes(interaction.user.id)))
    return interaction.reply({
                    embeds: [new MessageEmbed()
                      .setAuthor({
                        name: `Requested by ` + interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                      })
                      .setDescription(`> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`)
                      .setTitle('⛔️| **We Got An Error**')
                      .setColor(client.colors.none)
                      .setFooter({
                        text: "Error | created by Mr.SIN RE#1528",
                        iconURL: interaction.guild.iconURL({ dynamic: true })
                      })],
                    components: [new MessageActionRow()
                      .addComponents(new MessageButton()
                        .setStyle("DANGER")
                        .setLabel("Error")
                        .setEmoji("⚠️")
                        .setCustomId("error")
                        .setDisabled(true))
                    ]
                })
   
    let i0 = 0;
    let i1 = 10;
    let page = 1;
   
    let description =
      `Total Servers - ${client.guilds.cache.size}\n\n` +
      client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
        .slice(0, 10)
        .join("\n");
   
    let embed = new MessageEmbed()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setColor(client.colors.none)
      .setFooter(client.user.username)
      .setTitle(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
      .setDescription(description);
   
    let msg = await interaction.reply({ 
                                embeds:[embed],
                                fetchReply: true
                            });
    await msg.react("⬅");
    await msg.react("➡");
    await msg.react("❌");
   
    let collector = msg.createReactionCollector(
      (reaction, user) => user.id === interaction.user.id
    );
   
    collector.on("collect", async (reaction, user) => {
      if (reaction.emoji.name === "⬅") {
        // Updates variables
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
   
        // if there is no guild to display, delete the message
        if (i0 + 1 < 0) {
          console.log(i0)
          return msg.delete();
        }
        if (!i0 || !i1) {
          return msg.delete();
        }
   
        description =
          `Total Servers - ${client.guilds.cache.size}\n\n` +
          client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map(
              (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
            )
            .slice(i0, i1)
            .join("\n");
   
        // Update the embed with new informations
        embed
          .setTitle(
            `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
          )
          .setDescription(description);
   
        // Edit the message
        msg.edit(embed);
      }
   
      if (reaction.emoji.name === "➡") {
        // Updates variables
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;
   
        // if there is no guild to display, delete the message
        if (i1 > client.guilds.cache.size + 10) {
          return msg.delete();
        }
        if (!i0 || !i1) {
          return msg.delete();
        }
   
        description =
          `Total Servers - ${client.guilds.cache.size}\n\n` +
          client.guilds.cache
            .sort((a, b) => b.memberCount - a.memberCount)
            .map(r => r)
            .map(
              (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members`
            )
            .slice(i0, i1)
            .join("\n");
   
        // Update the embed with new informations
        embed
          .setTitle(
            `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
          )
          .setDescription(description);
   
        // Edit the message
        msg.edit(embed);
      }
   
      if (reaction.emoji.name === "❌") {
        return msg.delete();
      }
   
      // Remove the reaction when the user react to the message
      await reaction.users.remove(interaction.user.id);
    });
   }
  }
 }
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
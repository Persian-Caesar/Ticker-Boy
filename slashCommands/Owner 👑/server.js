const {
 MessageActionRow,
 MessageButton,
 MessageEmbed,
 Permissions
} = require("discord.js");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
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
try{
    if (!client.config.owner.some(r => r.includes(interaction.user.id))) return errorMessage(client, interac`> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`)
  switch (interaction.options.getSubcommand()) {
   case "list": {
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
   
    interaction.reply({ 
      embeds:[embed],
      components: [new MessageActionRow().addComponents([new MessageButton().setCustomId('before').setEmoji("⬅️").setLabel("Before").setStyle('SUCCESS'),new MessageButton().setCustomId('del').setEmoji("❌").setLabel("Before").setStyle('SUCCESS'),new MessageButton().setCustomId('next').setEmoji("➡️").setLabel("Next").setStyle('SUCCESS')])],
      ephemeral: true
    });
    let collector = await interaction.channel.createMessageComponentCollector({ time: 60000 });
   
    collector.on("collect", async (collect) => {
      if(!collect.isButton()) return;
      if (collect.customId === "before") {
        // Updates variables
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
   
        // if there is no guild to display, delete the message
        if (i0 + 1 < 0) {
          console.log(i0)
          return interaction.deleteReply();
        }
        if (!i0 || !i1) {
          return interaction.deleteReply();
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
        interaction.editReply({embeds: embed});
      }
   
      if (collect.customId === "next") {
        // Updates variables
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;
   
        // if there is no guild to display, delete the message
        if (i1 > client.guilds.cache.size + 10) {
          return interaction.deleteReply();
        }
        if (!i0 || !i1) {
          return interaction.deleteReply();
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
        interaction.editReply({embeds: embed});
      }
   
      if (collect.customId === "del") {
        return interaction.deleteReply();
      }
    });
   }
  }
   }catch(e){
         errorMessage(client, interaction, `\`\`\`js\n${e}\n\`\`\``)
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
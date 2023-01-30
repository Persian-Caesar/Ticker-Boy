const {
    MessageEmbed
} = require('discord.js');
module.exports = async (client, guild) => {
    let channel = client.channels.cache.get(client.config.discord.server_channel_status);
    let owner = await guild.members.cache.get(guild.ownerId);
    let embed = new MessageEmbed()
    .setAuthor({
        name: client.user.tag,
        iconURL: client.user.displayAvatarURL()
    })
    .setDescription(`I have kicked from **${guild.name}** and my guilds count is: \`${client.guilds.cache.size}\``)
    .addFields([{
      name: `👑| Owner Tag:`,
      value: `owner tag: \`${owner.user.tag}\``,
      inline: true
    },{
      name: `👓| Owner ID:`,
      value: `owner Id: \`${owner.user.id}\``,
      inline: true
    },{
      name: `👥| Total Members:`,
      value: `guild members count: \`${guild.members.cache.size}\``,
      inline: true
    },{
      name: `📬| Server Invite:`,
      value: `server invite link:  **can't create it :(**`,
      inline: true
    },{
      name: `🆔| Guild ID:`,
      value: `guild Id: **\`${guild.id}\`**`,
      inline: true
    },{
      name: `📅| Created at:`,
      value: `guild created at: **<t:${Date.parse(guild.createdAt) / 1000}:R>**`,
      inline: true
    }])
    .setColor("#2F3136")
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTimestamp(Date.now())
    channel.send({
        embeds: [embed]
    })
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

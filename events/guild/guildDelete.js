const {
    MessageEmbed
} = require('discord.js');
module.exports = async (client, guild) => {
    let channel = client.channels.cache.get(client.config.discord.server_channel_status);
        let invite = await client.channels.cache.get(guild.rulesChannelID).createInvite({
            maxAge: 0, 
            maxUses: 5
        })
    const embed = new MessageEmbed()
    .setAuthor({
        name: client.user.tag,
        iconURL: client.user.displayAvatarURL()
    })
    .setDescription(`i have kicked from **${guild.name}** and my guilds count is: \`${client.guilds.cache.size}\``)
    .addField(`👑| Owner Tag: ` ,` owner tag: \` ${guild.owner.tag}\``,true)
    .addField(`👓| Owner ID: ` ,`owner Id: \` ${guild.owner.id}\``,true)
    .addField(`👥| Total Members:`, `guild members count: \`${guild.members.cache.size}\``, true)
    .addField(`📬| Server Invite: ` ,` server invite link:  **${invite||"can't create it :("}**`,true)
    .addField(`🆔| Guild ID:`, `guild Id: **\`${guild.id}\`**`, true)
    .addField(`📅| Created at:`, `guild created at: **<t:${Date.parse((guild.createdAt) / 1000)}:R>**`, true)
    .setColor("#2F3136")
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .setTimestamp(Date.now())
    channel.send({
        embeds: [embed]
    })
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
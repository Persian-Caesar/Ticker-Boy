const {
    MessageEmbed
} = require('discord.js');
module.exports = async (client, guild) => {
    let channel = client.channels.cache.get(client.config.discord.server_channel_status);
    let invite = await guild.channels.cache.filter(x => x.type === 'GUILD_TEXT').random(1)[0].createInvite({
            maxAge: 0, 
            maxUses: 5
        })
    let owner = await guild.members.cache.get(guild.ownerId);
    let embed = new MessageEmbed()
    .setAuthor({
        name: client.user.tag,
        iconURL: client.user.displayAvatarURL()
    })
    .setDescription(`I have added in **${guild.name}** and my guilds count is: \`${client.guilds.cache.size}\``)
    .addField(`👑| Owner Tag: ` ,` owner tag: \`${owner.user.tag}\``,true)
    .addField(`👓| Owner ID: ` ,`owner Id: \`${owner.user.id}\``,true)
    .addField(`👥| Total Members:`, `guild members count: \`${guild.members.cache.size}\``, true)
    .addField(`📬| Server Invite: ` ,` server invite link:  **${`${invite.url}`||"can't create it :("}**`,true)
    .addField(`🆔| Guild ID:`, `guild Id: **\`${guild.id}\`**`, true)
    .addField(`📅| Created at:`, `guild created at: **<t:${Date.parse(guild.createdAt) / 1000}:R>**`, true)
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
const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions
 } = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const {
    errorEmbed,
    epochDateNow,
    successEmbed,
    logsEmbed
} = require("../../functions/functions");
module.exports = {
   name: 'setlogs',
   aliases: ['logs', 'channel', 'log'],
   category: 'Setup 💻',
   description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
   cooldown: 6,
   run: async function(bot, message, args, prefix, logsChannel){
    if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD||Permissions.FLAGS.ADMINISTRATOR))
     return message.reply({
                embeds: [errorEmbed(message, "my friend you are don't have this permissions: `\"MANAGE_GUILD\" or \"ADMINISTRATOR\"`.",bot)]
            });

    let channel = message.mentions.channels.first();
    if(!channel)
     return message.reply({
                embeds: [errorEmbed(message, "please mention some channel befor.",bot)]
            });

    let channelFetched = message.guild.channels.cache.find(c => c.id === channel.id);
    if(!channelFetched || channelFetched.type !== "GUILD_TEXT") 
        return message.reply({
                    embeds: [errorEmbed(message, "please mention some valid channel to setup server logs.\nvalid channel: `\"GUILD_TEXT\"`",bot)]
                });

    db.set(`logs_${message.guild.id}`, channelFetched);
    channelFetched.send({
            content: message.author,
            embeds: [logsEmbed(
                message,
                "Logs Channel Successfuly Setuped",
                "logs channel is successfuly setuped.",
                bot.emotes.tick,
                bot,
                channelFetched,
                "setup logs channel"
            )]
        });
    message.reply({ 
        embeds: [successEmbed(message, `successfuly logs channel setuped in **${channelFetched}**.`,bot)]
    });

    }
}
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Work for SIZAR Team | https://discord.gg/rsQGcSfyJs
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
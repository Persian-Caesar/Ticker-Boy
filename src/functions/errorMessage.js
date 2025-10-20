const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");
const config = require("../../config");
const colors = require("../storage/colors.json");
const copyRight = require("../storage/embed.json");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} message 
 * @param {string} text 
 * @returns {void}
 */
module.exports = async function (client, message, text) {
    const member = client.users.cache.get(message.member.id);
    const time = 2 * 60 * 1000;
    const embed = new EmbedBuilder()
        .setTitle(`${client.emotes.entry}| Got An Error`)
        .setColor(colors.red)
        .setDescription(`${text || "Not Found 404"}`)
        .setFooter({
            text: `Requested by ${member.tag} • Error • ${copyRight.footerText}`,
            iconURL: member.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(message.guild.iconURL({ dynamic: true }));

    const component = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setLabel("Error")
                .setEmoji(client.emotes.error)
                .setCustomId("error")
                .setDisabled(true),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setLabel("Support Server!")
                .setEmoji(client.emotes.help)
                .setURL(`${config.discord.support.invite}`)
        );

    const data = {
        embeds: [embed],
        components: [component],
    };

    // Check if message is interaction.
    if (message.user) {
        await message.deferReply({ ephemeral: true, fetchReply: true }).cache(e => e);
        await message.editReply(data).cache(e => e);
        setTimeout(async () => {
            await message.deleteReply().cache(e => e);
        }, time);
    } else {
        const msg = await message.reply(data);
        setTimeout(async () => {
            await message.delete().cache(e => e);
            await msg.delete().cache(e => e);
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
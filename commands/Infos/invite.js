const {
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
const Discord = require("discord.js");
module.exports = {
  name: 'invite',
  description: 'Invite the bot to your own guild.',
  category: 'Infos 📊',
  type: Discord.ApplicationCommandType.ChatInput,  
  cooldown: 2,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],

  run: async (client, interaction, args) => {
   try{
     let inviteEmbed = new Discord.EmbedBuilder()
       .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
       .setTitle(`Invite Me To Your Guild`)
       .setDescription(`**[Invite Me](${client.config.discord.invite}) to your server by clicking on the My profile, then clicking on the 'Add to Server' button. \nAlternatively, you can click below to [Invite Me](${client.config.discord.invite}) to your server!**`)
       .setFooter({
          text: client.embed.footerText, 
          iconURL: client.embed.footerIcon
       })
       .setURL(`${client.config.discord.server_support}`)
       .setColor(client.colors.none)
     
     interaction.reply({
        components: [new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(`${client.config.discord.invite}`)),new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setLabel('Support Server!').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))],
        embeds: [inviteEmbed]
     });
   }catch(e){
    console.log(e)
    errorMessage(client, interaction, '```js\n' + e + '```')
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
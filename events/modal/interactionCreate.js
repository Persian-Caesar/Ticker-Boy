const { 
  SelectMenuBuilder,
  EmbedBuilder, 
  ButtonBuilder, 
  ActionRowBuilder,
  ButtonStyle
} = require("discord.js");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, interaction) => {
try{
if (!interaction.isModalSubmit()) return;
  if(interaction.customId === "reporting"){
  let choice = interaction.fields.getTextInputValue('report');
  let guild = client.guilds.cache.get(client.config.discord.server_id);
  let channel = guild.channels.cache.get(client.config.discord.server_channel_report);
  let invite = await interaction.channel.createInvite({
      maxAge: 0, 
      maxUses: 5
  })
  const report = new EmbedBuilder()
   .setAuthor({ name:`${interaction.user.tag}`, iconURL:interaction.user.displayAvatarURL({ dynamic: true }) })
   .setTimestamp()
   .setTitle(`This Guy Have a Report, User ID: "${interaction.user.id}"`)
   .setColor(client.colors.none)
   .addFields([{
     name: `> **User :**`,
     value: `${client.emotes.reply}${interaction.user}`,
     inline: true
   },{
     name: `> **Send :**`,
     value: `${client.emotes.reply}${choice}`,
     inline: true
   },{ 
     name: `> **Server :**`, 
     value: `${client.emotes.reply}${invite.url}`,
     inline: true
   }])
   .setURL(invite.url)
   .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
   .setFooter({ text:`${interaction.guild.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
  channel.send({ 
     content: `${interaction.user}`,
     embeds: [report] 
  }).then((msg)=> {
    msg.react(client.emotes.report)
  })
  interaction.reply({
    ephemeral: true,
    embeds: [new EmbedBuilder().setTimestamp().setTitle(`${client.emotes.success}| Successfully Sent`).setDescription(`\`\`\`js\nSuccessfuly your report or bug message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`)],
  })
  }
}catch(e){
  console.log(e)
  errorMessage(client, interaction, '```js\n'+e+'```')
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
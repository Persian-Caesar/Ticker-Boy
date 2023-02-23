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
  if([" ", "  "].includes(choice)) return errorMessage(client, interaction, `please write full content for reporting.`)

  let invite = await interaction.channel.createInvite({
      maxAge: 0, 
      maxUses: 5
  }) 
  const embed = new EmbedBuilder()
   .setAuthor({ name:`${interaction.user.tag}`, iconURL:interaction.user.displayAvatarURL({ dynamic: true }) })
   .setTimestamp()
   .setTitle(`Report Message From \`${interaction.guild.name}\``)
   .setColor(client.colors.none)
   .addFields([{ 
     name: `${client.emotes.reply} **Guild:**`, 
     value: `**${interaction.guild.name} | ${interaction.guild.id} | ${invite.url? invite.url : "Cant' create invite :("}**`,
     inline: false
   },{
     name: `${client.emotes.reply} **User:**`,
     value: `**${interaction.user} | ${interaction.user.tag} | ${interaction.user.id}**`,
     inline: false
   },{
     name: `${client.emotes.reply} **Date:**`,
     value: `**<t:${Date.parse(new Date()) / 1000}:D> | <t:${Date.parse(new Date()) / 1000}:R>**`, 
     inline: false 
   },{
     name: `${client.emotes.reply} **Message:**`,
     value: `${choice}`,
     inline: false
   }])
   .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    

  await channel.send({ 
     embeds: [embed] 
  }).then((msg)=> {
    msg.react(client.emotes.report)
  })
  await interaction.reply({
    ephemeral: true,
    embeds: [new EmbedBuilder().setColor(client.colors.none).setTimestamp().setTitle(`${client.emotes.success}| Successfully Sent`).setDescription(`\`\`\`js\nSuccessfuly your report or bug message send to My Developers ${client.emotes.hurt} \`\`\`**thank's for sending your message to us.\nFor helping you my develpoers or admins send a \`Friend-Request\` for you or just join to server and fix your problem. :)**`)],
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
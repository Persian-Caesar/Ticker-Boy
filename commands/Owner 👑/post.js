const { 
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder, 
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require('discord.js');
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
 name: 'post',
 category: 'Owner 👑',
 cooldown: 1,
 type: ApplicationCommandType.ChatInput,
 description: "Post owner words.",
 userPermissions: ["SendMessages"],
 botPermissions: ["SendMessages"],
 options: [{
   name: 'channel',
   type: ApplicationCommandOptionType.Subcommand,
   description: "Post text or embed in channel.",
   options: [{
     name: "text",
     type: ApplicationCommandOptionType.String,
     description: "some text here",
     required: false      
   },{
     name: "image_url",
     type: ApplicationCommandOptionType.String,
     description: "some link here",
     required: false   
   },{
     name: "description",
     type: ApplicationCommandOptionType.String,
     description: "some description here for embed",
     required: false      
   },{
     name: "footer_text",
     type: ApplicationCommandOptionType.String,
     description: "some text here",
     required: false   
   },{
     name: "footer_iconurl",
     type: ApplicationCommandOptionType.String,
     description: "some link here",
     required: false   
   },{
     name: "author_text",
     type: ApplicationCommandOptionType.String,
     description: "some text here",
     required: false   
   },{
     name: "author_iconurl",
     type: ApplicationCommandOptionType.String,
     description: "some link here",
     required: false   
   },{
     name: "title",
     type: ApplicationCommandOptionType.String,
     description: "some title here for embed",
     required: false   
   },{
     name: "timestamp",
     type: ApplicationCommandOptionType.Boolean,
     description: "show sending message time in embed (true or false)",
     required: false  
   },{
     name: "color",
     type: ApplicationCommandOptionType.String,
     description: "paste here some hex code color",
     required: false   
   },{
     name: "channel",
     description: "Select a channel to setupping server args.",
     type: ApplicationCommandOptionType.Channel,
     channelTypes: [ChannelType.GuildText],
     required: false
   }],
  },{
   name: 'dm',
   type: ApplicationCommandOptionType.Subcommand,
   description: "Post text or embed in target member dm.",
 options: [{
     name: "member",
     description: "Select a member to sends owner words.",
     type: ApplicationCommandOptionType.User,
     required: true
   },{
     name: "text",
     type: ApplicationCommandOptionType.String,
     description: "some text here",
     required: false      
   },{
     name: "image_url",
     type: ApplicationCommandOptionType.String,
     description: "some link here",
     required: false   
   },{
     name: "description",
     type: ApplicationCommandOptionType.String,
     description: "some description here for embed",
     required: false      
   },{
     name: "footer_text",
     type: ApplicationCommandOptionType.String,
     description: "some text here",
     required: false   
   },{
     name: "footer_iconurl",
     type: ApplicationCommandOptionType.String,
     description: "some link here",
     required: false   
   },{
     name: "author_text",
     type: ApplicationCommandOptionType.String,
     description: "some text here",
     required: false   
   },{
     name: "author_iconurl",
     type: ApplicationCommandOptionType.String,
     description: "some link here",
     required: false   
   },{
     name: "title",
     type: ApplicationCommandOptionType.String,
     description: "some title here for embed",
     required: false   
   },{
     name: "timestamp",
     type: ApplicationCommandOptionType.Boolean,
     description: "show sending message time in embed (true or false)",
     required: false  
   },{
     name: "color",
     type: ApplicationCommandOptionType.String,
     description: "paste here some hex code color",
     required: false   
   }],
 }],

 run: async (client, interaction) => {
  try{
     if(!client.config.owner.some(r => r.includes(interaction.user.id))) return errorMessage(client, interaction, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`)
 switch (interaction.options.getSubcommand()) {
  case "channel": {
   let text = interaction.options.getString("text");
   let channel =  interaction.options.getChannel("channel")||interaction.channel;
   let description = interaction.options.getString("description");
   let color = interaction.options.getString("color");
   let title = interaction.options.getString("title");
   let image = interaction.options.getString("image_url");   
   let footer_text = interaction.options.getString("footer_text");
   let footer_iconURL = interaction.options.getString("footer_iconurl");
   let author_text = interaction.options.getString("author_text");
   let author_iconURL = interaction.options.getString("author_iconurl");
   let timestamp = interaction.options.getBoolean("timestamp");
   let embed = new EmbedBuilder()
   try{
   if(color){
     embed.setColor(`${color}`)
   }
   if(description){
     embed.setDescription(`${description}`)
   }
   if(image){
     embed.setImage(`${image}`)
   }
   if(timestamp === true){
     embed.setTimestamp(new Date())
   }
   if(title){
     embed.setTitle(`${title}`)
   }
   if(author_text){
     embed.setAuthor({
       name: `${author_text}`
     })
   }
   if(author_iconURL && author_text){
     embed.setAuthor({
       iconURL: `${author_iconURL}`,
       name: `${author_text}`       
     })
   }
   if(footer_text){
     embed.setFooter({
       text: `${footer_text}`
     })
   }
   if(footer_iconURL && footer_text){
     embed.setFooter({
       iconURL: `${footer_iconURL}`,
       text: `${footer_text}`
     })
   }
   let embeds = embed.data.description || embed.data.title || embed.data.author || embed.data.footer || embed.data.image;
   if(embeds && text){
     interaction.reply({
       content: `**✅| successfully post your embed and text in${channel}**`,
       ephemeral: true,
     })
     channel.send({
       content: text,
       embeds: [embed]
     })
   }else if(embeds && !text){
    interaction.reply({
       content: `**✅| successfully post your embed in${channel}**`,
       ephemeral: true,
    })
    channel.send({
     embeds: [embed]
    })
   }else if(!embeds && text){
    interaction.reply({
       content: `**✅| successfully post your text in${channel}**`,
       ephemeral: true,
    })
    channel.send({
     content: text
    })
   }else if(!embeds && !text){
    errorMessage(client, interaction, `\`\`\`js\nPlese for post some text or embed, you have to fill \"text\" or fill the embed arrays.\n\`\`\``)
   }
   }catch(e){
     errorMessage(client, interaction, `\`\`\`js\n${e}\n\`\`\``)
   }
  }break;
  case "dm":{
   let channel =  interaction.options.getUser("member");
   let text = interaction.options.getString("text");
   let description = interaction.options.getString("description");
   let color = interaction.options.getString("color");
   let title = interaction.options.getString("title");
   let image = interaction.options.getString("image_url");   
   let footer_text = interaction.options.getString("footer_text");
   let footer_iconURL = interaction.options.getString("footer_iconurl");
   let author_text = interaction.options.getString("author_text");
   let author_iconURL = interaction.options.getString("author_iconurl");
   let timestamp = interaction.options.getBoolean("timestamp");
   let embed = new EmbedBuilder()
   try{
   if(color){
      embed.setColor(`${color}`)
   }
   if(description){
     embed.setDescription(description)
   }
   if(image){
     embed.setImage(image)
   }
   if(timestamp === true){
     embed.setTimestamp(new Date())
   }
   if(title){
     embed.setTitle(title)
   }
   if(author_text){
     embed.setAuthor({
       name: author_text
     })
   }
   if(author_iconURL && author_text){
     embed.setAuthor({
       iconURL: author_iconURL,
       name: author_text       
     })
   }
   if(footer_text){
     embed.setFooter({
       text: footer_text
     })
   }
   if(footer_iconURL && footer_text){
     embed.setFooter({
       iconURL: footer_iconURL,
       text: footer_text       
     })
   }
   let embeds = embed.data.description || embed.data.title || embed.data.author || embed.data.footer || embed.data.image;
   if(embeds && text){
     interaction.reply({
       content: `**✅| successfully post your embed and text in${channel}**`,
       ephemeral: true,
     })
     channel.send({
       content: text,
       embeds: [embed]
     })
   }else if(embeds && !text){
    interaction.reply({
       content: `**✅| successfully post your embed in${channel}**`,
       ephemeral: true,
    })
    channel.send({
     embeds: [embed]
    })
   }else if(!embeds && text){
    interaction.reply({
       content: `**✅| successfully post your text in${channel}**`,
       ephemeral: true,
    })
    channel.send({
     content: text
    })
   }else if(!embeds && !text){
    errorMessage(client, interaction, `\`\`\`js\nPlese for post some text or embed, you have to fill \"text\" or fill the embed arrays.\n\`\`\``)
   }
   }catch(e){
         errorMessage(client, interaction, `\`\`\`js\n${e}\n\`\`\``)
   }
  }break;
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

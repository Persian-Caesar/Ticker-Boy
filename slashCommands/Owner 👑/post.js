const { 
 MessageButton,
 MessageActionRow,
 MessageSelectMenu,
 MessageEmbed,
 Permissions
} = require('discord.js');
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
 name: 'post',
 category: 'Owner 👑',
 cooldown: 1,
 userPermissions: [""],
 description: "post owner words.",
 botPermissions: [""],
 options: [{
   name: 'channel',
   type: "SUB_COMMAND",
   description: "post text or embed in channel.",
   options: [{
     name: "text",
     type: "STRING",
     description: "some text here",
     required: false      
   },{
     name: "image_url",
     type: "STRING",
     description: "some link here",
     required: false   
   },{
     name: "description",
     type: "STRING",
     description: "some description here for embed",
     required: false      
   },{
     name: "footer_text",
     type: "STRING",
     description: "some text here",
     required: false   
   },{
     name: "footer_iconurl",
     type: "STRING",
     description: "some link here",
     required: false   
   },{
     name: "author_text",
     type: "STRING",
     description: "some text here",
     required: false   
   },{
     name: "author_iconurl",
     type: "STRING",
     description: "some link here",
     required: false   
   },{
     name: "title",
     type: "STRING",
     description: "some title here for embed",
     required: false   
   },{
     name: "timestamp",
     type: "BOOLEAN",
     description: "show sending message time in embed (true or false)",
     required: false  
   },{
     name: "color",
     type: "STRING",
     description: "paste here some hex code color",
     required: false   
   },{
     name: "channel",
     description: "Select a channel to setupping server args.",
     type: "CHANNEL",
     channelTypes: ["GUILD_TEXT"],
     required: false
   }],
  },{
   name: 'dm',
   type: "SUB_COMMAND",
   description: "post text or embed in target member dm.",
 options: [{
     name: "member",
     description: "Select a member to sends owner words.",
     type: "USER",
     required: true
   },{
     name: "text",
     type: "STRING",
     description: "some text here",
     required: false      
   },{
     name: "description",
     type: "STRING",
     description: "some description here for embed",
     required: false      
   },{
     name: "image_url",
     type: "STRING",
     description: "some link here",
     required: false   
   },{
     name: "footer_text",
     type: "STRING",
     description: "some text here",
     required: false   
   },{
     name: "footer_iconurl",
     type: "STRING",
     description: "some link here",
     required: false   
   },{
     name: "author_text",
     type: "STRING",
     description: "some text here",
     required: false   
   },{
     name: "author_iconurl",
     type: "STRING",
     description: "some link here",
     required: false   
   },{
     name: "title",
     type: "STRING",
     description: "some title here for embed",
     required: false   
   },{
     name: "color",
     type: "STRING",
     description: "paste here some hex code color",
     required: false   
   },{
     name: "timestamp",
     type: "BOOLEAN",
     description: "show sending message time in embed (true or false)",
     required: false  
   }],
 }],

 run: async (client, interaction) => {
  try{
     if (!client.config.owner.some(r => r.includes(interaction.user.id))) return errorMessage(client, interac`> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`)
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
   let embed = new MessageEmbed()
   try{
     
   if(color){
     embed.setColor(color.toUpperCase())
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
   let embeds = embed?.description || embed?.title || embed?.author || embed?.footer || embed?.image;
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
    interaction.reply({
        embeds: [new MessageEmbed()
               .setAuthor({
                 name: `Requested by ` + interaction.user.tag,
                 iconURL: interaction.user.displayAvatarURL({ dynamic: true })
               })
               .setTitle('⛔️| **We Got An Error**')
               .setColor("RED")
               .setDescription("```js\nPlese for post some text and embed, you have to fill \"text\" or fill the embed arrays.\n```")
               .setFooter({
                 text: "Error • "+client.embed.footerText,
                 iconURL: interaction.guild.iconURL({ dynamic: true })
               })
        ],
        components: [new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))], 
        ephemeral: true,
    })
   }
   }catch (e){
     interaction.reply({
          embeds: [new MessageEmbed()
               .setAuthor({
                 name: `Requested by ` + interaction.user.tag,
                 iconURL: interaction.user.displayAvatarURL({ dynamic: true })
               })
               .setTitle('⛔️| **We Got An Error**')
               .setColor("RED")
               .setDescription(`\`\`\`js\n${e}\n\`\`\``)
               .setFooter({
                 text: "Error • "+client.embed.footerText,
                 iconURL: interaction.guild.iconURL({ dynamic: true })
               })
        ],
        components: [new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))], 
        ephemeral: true,
    })
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
   let embed = new MessageEmbed()
   try{
     
   if(color){
     embed.setColor(color.toUpperCase())
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
   let embeds = embed?.description || embed?.title || embed?.author || embed?.footer || embed?.image;
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
    interaction.reply({
        embeds: [new MessageEmbed()
               .setAuthor({
                 name: `Requested by ` + interaction.user.tag,
                 iconURL: interaction.user.displayAvatarURL({ dynamic: true })
               })
               .setTitle('⛔️| **We Got An Error**')
               .setColor("RED")
               .setDescription("```js\nPlese for post some text and embed, you have to fill \"text\" or fill the embed arrays.\n```")
               .setFooter({
                 text: "Error • "+client.embed.footerText,
                 iconURL: interaction.guild.iconURL({ dynamic: true })
               })
        ],
        components: [new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))], 
        ephemeral: true,
    })
   }
   }catch (e){
         interaction.reply({
        embeds: [new MessageEmbed()
               .setAuthor({
                 name: `Requested by ` + interaction.user.tag,
                 iconURL: interaction.user.displayAvatarURL({ dynamic: true })
               })
               .setTitle('⛔️| **We Got An Error**')
               .setColor("RED")
               .setDescription(`\`\`\`js\n${e}\n\`\`\``)
               .setFooter({
                 text: "Error • "+client.embed.footerText,
                 iconURL: interaction.guild.iconURL({ dynamic: true })
               })
        ],
        components: [new MessageActionRow().addComponents(new MessageButton().setStyle("DANGER").setLabel("Error").setEmoji("⚠️").setCustomId("error").setDisabled(true))], 
        ephemeral: true,
    })
   }
  }break;
 }
 }catch (e){
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
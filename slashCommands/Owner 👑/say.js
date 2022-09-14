const { 
 MessageButton,
 MessageActionRow,
 MessageSelectMenu,
 MessageEmbed,
 Permissions
} = require('discord.js');
module.exports = {
 name: 'post',
 category: 'Owner 👑',
 cooldown: 1,
 userPermissions: [""],
 description: "post owner words.",
 botPermissions: [""],
 options: [{
   name: 'say',
   type: "SUB_COMMAND",
   description: "setup the server all information automatic.",
   options: [{
     name: "text",
     type: "STRING",
     description: "some text here",
     required: true      
   },{
   name: "channel",
   description: "Select a channel to setupping server args.",
   type: "CHANNEL",
   channelTypes: ["GUILD_TEXT"],
   required: false
   }],
  },{
   name: 'embed',
   type: "SUB_COMMAND",
   description: "setup the server all information automatic.",
   options: [{
     name: "description",
     type: "STRING",
     description: "some description here for embed",
     required: true      
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
     name: "channel",
     description: "Select a channel to setupping server args.",
     type: "CHANNEL",
     channelTypes: ["GUILD_TEXT"],
     required: false
   }]
 }],

 run: async (client, interaction) => {
 switch (interaction.options.getSubcommand()) {
  case "say": {
 let channel =  interaction.options.getChannel("channel")||interaction.channel;
 let args = interaction.options.getString("text");
 if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)||!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({           
           embeds: [new MessageEmbed()
               .setAuthor({
                 name: `Requested by ` + interaction.user.name,
                 iconURL: interaction.user.displayAvatarURL({ dynamic: true })
               })
               .setTitle('⛔️| **We Got An Error**')
               .setColor(client.colors.none)
               .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
               .setFooter({
                 text: "Error | created by Mr.SIN RE#1528",
                 iconURL: interaction.guild.iconURL({ dynamic: true })
               })],
           components: [new MessageActionRow()
                  .addComponents(new MessageButton()
                  .setStyle("DANGER")
                  .setLabel("Error")
                  .setEmoji("⚠️")
                  .setCustomId("error")
                  .setDisabled(true))], 
           ephemeral: true,
         })      
 interaction.reply({
   content: client.emotes.success + "**| successfully sent your text**",
   ephemeral: true,
 })
 channel.send(args)
  }break;
  case "embed":{
   if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)||!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({           
     embeds: [new MessageEmbed()
         .setAuthor({
           name: `Requested by ` + interaction.user.name,
           iconURL: interaction.user.displayAvatarURL({ dynamic: true })
         })
         .setTitle('⛔️| **We Got An Error**')
         .setColor(client.colors.none)
         .setDescription("```js\nyou are not have permissions for use this.\nPermissions Need: \"MANAGE_CHANNELS\" \n```")
         .setFooter({
           text: "Error | created by Mr.SIN RE#1528",
           iconURL: interaction.guild.iconURL({ dynamic: true })
         })],
     components: [new MessageActionRow()
            .addComponents(new MessageButton()
            .setStyle("DANGER")
            .setLabel("Error")
            .setEmoji("⚠️")
            .setCustomId("error")
            .setDisabled(true))], 
     ephemeral: true,
   })
   let channel =  interaction.options.getChannel("channel")||interaction.channel;
   let description = interaction.options.getString("description");
   let title = interaction.options.getString("title");
   let footer_text = interaction.options.getString("footer_text");
   let footer_iconURL = interaction.options.getString("footer_iconurl");
   let author_text = interaction.options.getString("author_text");
   let author_iconURL = interaction.options.getString("author_iconurl");
   let timestamp = interaction.options.getBoolean("timestamp");
   let embed = new MessageEmbed()
     .setColor(client.colors.none)
     .setDescription(description)
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
   if(author_iconURL){
     embed.setAuthor({
       iconURL: author_iconURL
     })
   }
   if(footer_text){
     embed.setFooter({
       text: footer_text
     })
   }
   if(footer_iconURL){
     embed.setFooter({
       iconURL: footer_iconURL
     })
   }
   interaction.reply({
     content: client.emotes.success + "**| successfully sent your embed**",
     ephemeral: true,
   })
   channel.send({
     embeds: [embed]
   })
  }break;
 }
}
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
const { 
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  Collection,
  ButtonStyle,
  PermissionsBitField,
  SelectMenuBuilder
} = require("discord.js");
const {
  HelpCategoryEmbed,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = async (client, message) => {
let db = client.db;
if (message.author.bot || !message.guild) return;//a direct message between users
//=========== Help Menu With Mention Bot
let contents = [
  `<@!${client.user.id}>`,
  `<@${client.user.id}>`
];
if (contents.includes(message.content)) {
  //============ Check Perm
  if(!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.SendMessages])) return message.author.send({content: `${client.emotes.error}| I am missing the Permission to \`SendMessages\` in ${message.channel}`,});
  if(!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.UseExternalEmojis]))  return message.reply({content: `${client.emotes.error}| I am missing the Permission to \`UseExternalEmojis\` in ${message.channel}`});
  if(!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.EmbedLinks])) return message.reply({ content: `${client.emotes.error}| I am missing the Permission to \`EmbedLinks\` in ${message.channel}` });
      
  let help = new EmbedBuilder()
   .setAuthor({ 
      name: `${client.user.username} Help`
   })
   .setFooter({ 
      text: `Requested by ${message.author.tag}`, 
      iconURL: message.author.displayAvatarURL({ dynamic: true }) 
   })
   .setColor(client.colors.none)
   .addFields([{
     name: `About me:`,
     value: `>>> Hi👋🏻, I'm **[${client.user.username}](${client.config.discord.invite})${client.emotes.tickets}**\n With my help, you can create a completely professional ticket system in your Discord server${client.emotes.system}\n My capabilities and features include fast and strong support, support for slash commands, support for message commands and other things${client.emotes.learn}`,
     inline: false
   },{
     name: `How See Commands:`,
     value: `>>> With selecting one of the options from the menu below you can see information about commands in those categories.`,
     inline: false
   }])
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      let menu_options = [{
              label: 'Infos Help',
              value: 'Infos 📊',
              emoji: '📊',
    },{
              label: 'Setup Help',
              value: 'Setup 💻',
              emoji: '💻',
    },{
              label: 'Ticket Help',
              value: 'Ticket 🎫',
              emoji: '🎫',
    },{
              label: 'Premium Help',
              value: 'Premium 💎',
              emoji: '💎',
    }]
    if(client.config.owner.some(r => r.includes(message.author.id))){
      menu_options.push({
              label: 'Owner Help',
              value: 'Owner 👑',
              emoji: '👑',
      })
    }
    let help_menu = new SelectMenuBuilder()
     .setCustomId("help_menu")
     .setMaxValues(1)
     .setMinValues(1)
     .setPlaceholder(`${client.emotes.help}| Click me for select !!`)
     .addOptions(menu_options)
    
    let home_btn = new ButtonBuilder()
     .setStyle(ButtonStyle.Success)
     .setLabel('Home Page')
     .setEmoji(client.emotes.home)
     .setCustomId("home_page")

    let component_1 = [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)),new ActionRowBuilder().addComponents(home_btn.setDisabled(true),new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))];
    
    const embedMessage = await message.reply({
      embeds: [help], 
      components: component_1
    })
    const collector = embedMessage.createMessageComponentCollector({ time: 70000 });
    collector.on('collect', async (m) => {
         if(m.user.id === message.author.id){
         if(m.isButton()){
          if(m.customId === "home_page"){
            home_btn.setDisabled(true)
            m.update({
              embeds: [help],
              components: component_1
            })
          }
         }
         if(m.isSelectMenu()){
           if(m.customId === "help_menu"){      
             m.values.forEach((value)=>{
               return HelpCategoryEmbed(client.commands, value, client, m, [new ActionRowBuilder().addComponents(help_menu.setDisabled(false)),new ActionRowBuilder().addComponents(home_btn.setDisabled(false),new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))])
             })
           }
         }
         }else{
         return errorMessage(client, m, `This message only for ${message.author} and you can't use it.\nfor use components send this: "${`</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`}"`)
         }
    })
    setTimeout(()=>{ return embedMessage.edit({  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true),new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))] })},70000)
  }
};
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */

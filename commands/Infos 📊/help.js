const { 
  ButtonBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder, 
  PermissionsBitField,
  ButtonStyle,
  ApplicationCommandType,
  ApplicationCommandOptionType
 } = require('discord.js');
const {
  HelpCategoryEmbed,
  errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
  name: 'help',
  description: 'Show to you about bot info and commands.',
  category: 'Infos 📊',
  type: ApplicationCommandType.ChatInput,
  cooldown: 1,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages", "EmbedLinks"],
  options: [{
    name: "command",
    description: "Write bot command name to show info about it.",
    type: ApplicationCommandOptionType.String,
  }],
  run: async (client, interaction, args, prefix) => {
  let command_name = interaction.options.getString("command");
  let db = client.db;
  let help = new EmbedBuilder()
   .setAuthor({ 
      name: `${client.user.username} Help`
   })
   .setFooter({ 
      text: `Requested by ${interaction.user.tag}`, 
      iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
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

  if(command_name) {
    const cmd = client.commands.get(command_name.toLowerCase());
    if(!cmd || !cmd.name){
        return interaction.reply({ content: `**${client.emotes.error}| It seems like \`${command_name.toLowerCase()}\` is not a valid command! Please try Again!**`, ephemeral: true })
    }
    if(cmd.category === "Owner 👑" && !client.config.owner.some(r => r.includes(interaction.user.id))) return errorMessage(client, interaction, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`)
    const embed = new EmbedBuilder()
      .setColor(client.colors.none)
      .setAuthor({ 
        name: `${client.user.username} Help`
      })
      .setFooter({ 
        text: `Requested by ${interaction.user.tag} • for more info use /help`, 
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }) 
      })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

    let component = [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`)])]
    let cmds = client.application.commands.cache.find(c => c.name === cmd.name);
    embed.setTitle(`</${cmds.name}:${cmds.id}>`)
    let fields = [{
        name: 'Name:', 
        value: `${cmd.name}`
    },{
        name: 'Description:', 
        value: `${cmd.description || 'No Description provided!'}`
    },{
        name: 'Category:', 
        value: `${cmd.category}`
    }]
    if(cmd.cooldown){
       fields.push({
         name: 'Cooldown:',
         value: `**\`${cmd.cooldown} Seconds\`**`
        })
    }
    if(cmd.options && cmd.options.some(op=> op.type === ApplicationCommandOptionType.Subcommand)){
       let name = [];
       await cmds.options? cmds.options.some(op=> op.type === ApplicationCommandOptionType.Subcommand)? cmds.options.map((option)=>{ name.push(cmds.name +" "+ option.name)}) : name.push(`${cmds.name}`) : name.push(`${cmds.name}`)
       fields.push({
         name: 'Subcommands:',
         value: `**${name.map(n=> `</${n}:${cmds.id}>`).join(' , ')}**`
        })
    }
    if(cmd.userPermissions){
       fields.push({
         name: 'Permissions Need To User:',
         value: `**[ ${cmd.userPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
    }
    if(cmd.botPermissions){
       fields.push({
         name: 'Permissions Need To Bot:',
         value: `**[ ${cmd.botPermissions.map(i => { return `\`${i}\`` }).join(" , ")} ]**`
        })
    }
    embed.addFields(fields)
    return interaction.reply({ 
        embeds: [embed], 
        components: component
    })
  }else{
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
    if(client.config.owner.some(r => r.includes(interaction.user.id))){
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
    
    await interaction.reply({
      embeds: [help], 
      components: component_1
    })
    const embedMessage = await interaction.fetchReply()
    const collector = embedMessage.createMessageComponentCollector({ time: 70000 });
    collector.on('collect', async (m) => {
         if(m.user.id === interaction.user.id){
         if(m.isButton()){
          if(m.customId === "home_page"){
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
         return errorMessage(client, m, `This message only for ${interaction.user} and you can't use it.\nfor use components send this: "${`</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`}"`)
         }
    })
    setTimeout(()=>{ return embedMessage.edit({  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('timeout').setEmoji(client.emotes.alert).setLabel('Time Is Up').setStyle(ButtonStyle.Primary).setDisabled(true),new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Premium').setEmoji(client.emotes.premium).setCustomId("premium")),new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Report').setEmoji(client.emotes.report).setCustomId(`report`),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Invite Me').setEmoji(client.emotes.invite).setURL(client.config.discord.invite),new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Support').setEmoji(client.emotes.help).setURL(`${client.config.discord.server_support}`))] })},70000)
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
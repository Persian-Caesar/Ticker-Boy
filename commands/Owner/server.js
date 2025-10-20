const {
  ButtonBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder, 
  ButtonStyle,
  ChannelType,
  ApplicationCommandType,
  ApplicationCommandOptionType
} = require("discord.js");
const {
    errorMessage
} = require(`${process.cwd()}/functions/functions`);
module.exports = {
 name: 'server',
 category: 'Owner 👑',
 cooldown: 1,
 type: ApplicationCommandType.ChatInput,
 description: "A commands of settings the bot guilds join.",
 userPermissions: ["SendMessages"],
 botPermissions: ["SendMessages", "EmbedLinks"],
 options: [{
   name: 'list',
   type: ApplicationCommandOptionType.Subcommand,
   description: "Get list of all servers bot join.",
 },{
   name: 'leave',
   type: ApplicationCommandOptionType.Subcommand,
   description: "Leaving guilds with id or guilds below 50 members.",
 }],
 run: async (client, interaction) => {
  try{
    if (!client.config.owner.some(r => r.includes(interaction.user.id))) return errorMessage(client, interaction, `> You are not allowed to run this Command\n\n> **You need to be one of those guys: ${client.config.owner.map(id => `<@${id}>`)}**`)
    let option = interaction.options.getSubcommand()
    switch(option){
      case "list":{
        const backId = 'back'
const forwardId = 'forward'
const backButton = new ButtonBuilder({
  style: ButtonStyle.Secondary,
  label: 'Back',
  emoji: '⬅️',
  customId: backId
})
const forwardButton = new ButtonBuilder({
  style: ButtonStyle.Secondary,
  label: 'Forward',
  emoji: '➡️',
  customId: forwardId
})
const guilds = [...client.guilds.cache.values()]
let page = 1
const generateEmbed = async start => {
  const current = guilds.sort((a, b) => b.memberCount - a.memberCount).slice(start, start + 12)
  let embed = new EmbedBuilder({
    title: `Page - ${page}/${Math.ceil(client.guilds.cache.size / 12)} | All Guilds: ${(guilds.length).toLocaleString()}`,
    fields: await Promise.all(
      current.sort((a, b) => b.memberCount - a.memberCount).map(async guild => ({
        name: `${guild.name}`,
        value: `**ID:** \`${guild.id}\`\n**Owner:** \`${(await guild.fetchOwner()).user.tag}\`\n**Members:** __${(guild.memberCount).toLocaleString()}__`,
        inline: true
      }))
    )
  })
  return embed.setColor(client.colors.none)
}
const canFitOnOnePage = guilds.length <= 12
await interaction.reply({
  embeds: [await generateEmbed(0)],
  components: canFitOnOnePage? [] : [new ActionRowBuilder({components: [forwardButton]})],
  ephemeral: true
})
const embedMessage = await interaction.fetchReply()
if (canFitOnOnePage) return;
const collector = embedMessage.createMessageComponentCollector({
  filter: ({user}) => user.id === interaction.user.id,
  time: 60000
})

let currentIndex = 0;
collector.on('collect', async int => {
  int.customId === backId ? (currentIndex -= 12) : (currentIndex += 12)
  int.customId === backId ? (page -= 1) : (page += 1)
  await int.update({
    embeds: [await generateEmbed(currentIndex)],
    components: [new ActionRowBuilder({ components: [...(currentIndex ? [backButton] : []), ...(currentIndex + 12 < guilds.length ? [forwardButton] : [])] })]
  })
})
collector.on('end', async ()=>{
  interaction.deleteReply()
})
      }break;
      case "leave":{
  interaction.reply({ content: `Trying to leave guilds with less than 50 members...`, ephemeral: true, fetchReply: true })
   .then(()=>{
    try{
    client.guilds.cache.forEach(guild=>{
       if(guild.memberCount < 50){
        if(client.config.whitelist_guilds.some(r => r.includes(guild.id))) return;
        setTimeout(()=>{
         guild.leave()
        }, 5000)
       }
      })
      interaction.editReply({ content: `process is successfully, I have leave guilds for you.` })
    }catch(e){
      interaction.editReply({ content: `\`\`\`js\n${e}\`\`\`` })
      console.log(e)
    }
   })
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

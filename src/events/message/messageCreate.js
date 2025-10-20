const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  Collection,
  ButtonStyle,
  ChannelType,
  PermissionsBitField
} = require("discord.js");
const axios = require("axios");
const error = require("../../functions/error");
const config = require("../../../config");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").Message} message 
 * @returns {void}
 */
module.exports = async (client, message) => {
  const db = client.db;
  try {
    //======== ChatBot on dm =========
    if (client.config.source.chatBot) {
      if (message.channel.type === ChannelType.DM) {
        if (message.author.bot) return;
        let msg = "";
        const data = {
          user: message.author.id,
          name: "Ticker Boy",
          gender: "Male",
          language2: "auto",
          developer_name: "Sobhan-SRZA (mr.sinre)",
          message: message.content.toLocaleString()
        };

        await axios.get(`https://chatbot-api.vercel.app/api/?message=${data.message}&name=${data.name}&user=${data.user}&gender=${data.gender}&language2=${data.language2}&developer_name=${data.developer_name}`)
          .then((res) => {
            msg += res.data.message;
          }).catch(e => console.log(e));
        setTimeout(() => {
          message.reply({
            content: msg ? `${msg}` : "???",
          })
        }, 1000)
        message.channel.sendTyping()
      }
    };

    //======== Command for shows the prefix ========
    if (message.author.bot || message.channel.type === ChannelType.DM || message.webhookId) return;//a direct message between users

    //======== Command Prefix & args ========
    const lang = await db.has(`guild_${message.guild.id}.language`) ? await db.get(`guild_${message.guild.id}.language`) : config.source.default_language;
    const Tprefix = await db.has(`guild_${message.guild.id}.prefix`) ? await db.get(`guild_${message.guild.id}.prefix`) : `${config.discord.prefix}`;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Tprefix.toString())})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [prefix] = message.content.match(prefixRegex);
    if (message.content.indexOf(prefix) !== 0) return;
    let mes = client.languages[lang].general;
    await message.channel.sendTyping()

    //============ Check Perms
    if (!message.channel.permissionsFor(message.guild.members.me).has([PermissionsBitField.Flags.EmbedLinks])) return message.reply({ content: mes.error.replaceAll("{emote_error}", client.emotes.error) });

    //=========== Help Menu With Mention Bot
    let contents = [
      `<@!${client.user.id}>`,
      `<@${client.user.id}>`,
      `${prefix}prefix`
    ];
    if (contents.includes(message.content)) {
      message.reply({
        embeds: [new EmbedBuilder().setAuthor({ name: mes.mention.embed.author.replaceAll("{username}", client.user.username) }).setFooter({ text: mes.mention.embed.footer.replaceAll("{user}", message.author.tag), iconURL: message.author.displayAvatarURL({ dynamic: true }) }).setColor(client.colors.theme).addFields([{ name: mes.mention.embed.field1.name, value: mes.mention.embed.field1.value.replaceAll("{username}", client.user.username).replaceAll("{invite}", config.discord.default_invite.replace("{clientId}", client.user.id)).replaceAll("{ticket_emote}", client.emotes.tickets).replaceAll("{system_emote}", client.emotes.system).replaceAll("{learn_emote}", client.emotes.learn), inline: false }, { name: mes.mention.embed.field2.name, value: mes.mention.embed.field2.value.replaceAll("{prefix}", Tprefix).replaceAll("{cmd}", `</${client.application.commands.cache.find(c => c.name === "help").name}:${client.application.commands.cache.find(c => c.name === "help").id}>`), inline: false }]).setThumbnail(client.user.displayAvatarURL({ dynamic: true }))],
        components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel(mes.mention.button.btn1).setEmoji(client.emotes.report).setCustomId(`report`)), new ActionRowBuilder().addComponents([new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.mention.button.btn2).setEmoji(client.emotes.invite).setURL(config.discord.default_invite.replace("{clientId}", client.user.id)), new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel(mes.mention.button.btn3).setEmoji(client.emotes.help).setURL(`${config.discord.support.invite}`)])]
      })
    }

    //=========== Command Handler
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    if (!commandName) return;
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (command && command.only_message) {
      //======= Check Command Perms
      let bot_perms = [];
      command?.bot_permissions.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]))
      let user_perms = [];
      command?.user_permissions.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]))
      if (!message.guild.members.me.permissions.has([bot_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(mes.bot_permissions.replaceAll("{emote_x}", client.emotes.x).replaceAll("{command}", command.name).replaceAll("{perms}", command?.bot_permissions.map(p => `\`${p}\``).join(", "))).setColor(client.colors.orange)] }).catch((e) => { console.log(e) });

      if (!message.member.permissions.has([user_perms] || [])) return await message.reply({ embeds: [new EmbedBuilder().setDescription(mes.user_permissions.replaceAll("{emote_error}", client.emotes.error).replaceAll("{command}", command.name).replaceAll("{perms}", command?.user_permissions.map(p => `\`${p}\``).join(", "))).setColor(client.colors.red)] }).catch((e) => { console.log(e) });

      //======== Command Cooldown ========
      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Collection());
      }
      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 5) * 1000;

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply({
            embeds: [new EmbedBuilder().setColor(client.colors.none).setDescription(mes.cooldown.replaceAll("{emote_alert}", client.emotes.alert).replaceAll("{time}", `<t:${Math.floor((new Date().getTime() + Math.floor(timeLeft * 1000)) / 1000)}:R>`).replaceAll("{command}", command.name))],
          })
        }
      }
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

      //========= Handler
      try {
        await db.add("totalCommandsUsed", 1);
        command.run(client, message, args, lang, Tprefix);
      } catch {
      }
    }
  } catch (e) {
    error(e)
  }
};
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/
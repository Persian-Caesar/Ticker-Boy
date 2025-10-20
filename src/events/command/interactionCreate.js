const {
  Collection,
  PermissionsBitField,
  ApplicationCommandOptionType
} = require("discord.js");
const errorMessage = require("../../functions/errorMessage");
const error = require("../../functions/error");
const config = require("../../../config");

/**
 * 
 * @param {import("discord.js").Client} client 
 * @param {import("discord.js").CommandInteraction} interaction 
 * @returns {void}
 */
module.exports = async (client, interaction) => {
  try {
    let db = client.db;
    let lang = await db.has(`guild_${interaction.guild.id}.language`) ? await db.get(`guild_${interaction.guild.id}.language`) : config.source.default_language;
    let prefix = await db.has(`guild_${interaction.guild.id}.prefix`) ? await db.get(`guild_${interaction.guild.id}.prefix`) : `${config.discord.prefix}`;

    //========== Check Perms
    if (!interaction.channel.permissionsFor(interaction.guild.members.me).has([PermissionsBitField.Flags.EmbedLinks])) return interaction.reply({ content: `${client.emotes.error}| I am missing the Permission to \`EmbedLinks\` in guild.`, ephemeral: true })

    //======== 
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command && command.only_slash) {
        const args = [];
        for (let option of interaction.options.data) {
          if (option.type === ApplicationCommandOptionType.Subcommand) {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
              if (x.value) args.push(x.value);
            })
          } else if (option.value) args.push(option.value);
        }
        if (command.toggleOff) {
          return await errorMessage(client, interaction, `${client.emotes.badage}| That Command Has Been Disabled By The Developers! Please Try Later.`);
        }
        let bot_perms = [];
        command?.bot_permissions?.forEach(perm => bot_perms.push(PermissionsBitField.Flags[perm]))
        let user_perms = [];
        command?.user_permissions?.forEach(perm => user_perms.push(PermissionsBitField.Flags[perm]))
        if (!interaction.guild.members.me.permissions.has([bot_perms] || [])) return await errorMessage(client, interaction, `${client.emotes.x}| I don't have permission to respond </${client.application.commands.cache.find(c => c.name === command.name).name}:${client.application.commands.cache.find(c => c.name === command.name).id}> command!! \nPermissions need: [${command?.bot_permissions.map(p => `\`${p}\``).join(", ")}]`);

        if (!interaction.member.permissions.has([user_perms] || [])) return await errorMessage(client, interaction, `${client.emotes.error}| You don't have  permission to use </${client.application.commands.cache.find(c => c.name === command.name).name}:${client.application.commands.cache.find(c => c.name === command.name).id}> command!! \nPermissions need: [${command?.user_permissions.map(p => `\`${p}\``).join(", ")}]`);

        //======== Slash Command Cooldown ========
        if (!client.cooldowns.has(command.name)) {
          client.cooldowns.set(command.name, new Collection());
        }
        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 5) * 1000;
        if (timestamps.has(interaction.user.id)) {
          const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return await errorMessage(client, interaction, `${client.emotes.alert}| Please wait <t:${Math.floor((new Date().getTime() + Math.floor(timeLeft * 1000)) / 1000)}:R> before reusing the </${client.application.commands.cache.find(c => c.name === command.name).name}:${client.application.commands.cache.find(c => c.name === command.name).id}> command!`);
          }
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        //======== Slash Command Handler ========
        if (command) {
          await interaction.deferReply({ ephemeral: interaction.options.getString("ephemeral") === "true" ? true : false, fetchReply: true });
          await db.add("totalCommandsUsed", 1);
          command.run(client, interaction, args, lang, prefix);
        }
      } else {
        return;
      }
    }
    if (interaction.isUserContextMenuCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command) {
        await interaction.deferReply({ ephemeral: interaction.options.getString("ephemeral") === "true" ? true : false, fetchReply: true });
        await db.add("totalCommandsUsed", 1);
        command.run(client, interaction, lang, prefix);
      }
    }
  } catch (e) {
    error(e)
    errorMessage(client, interaction, '```js\n' + e + '```')
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/
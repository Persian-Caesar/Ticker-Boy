const {
    MessageEmbed,
    Collection,
    Permissions
} = require("discord.js");
var clc = require("cli-color");
module.exports = async (client, interaction) => {
try {
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return interaction.user.send({content: `${client.emotes.off}| I am missing the Permission to \`SEND_MESSAGES\` at ${interaction.channel}`,})
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.USE_EXTERNAL_EMOJIS)) 
    return interaction.reply({content: `${client.emotes.off}| I am missing the Permission to \`USE_EXTERNAL_EMOJIS\``, ephemeral: true })
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) 
    return interaction.reply({content: `${client.emotes.error}| I am missing the Permission to \`EMBED_LINKS\``, ephemeral: true })

        if (interaction.isCommand()) {
            const command = client.slashCommands.get(interaction.commandName);

      if (command) {
            const args = [];

            for (let option of interaction.options.data) {
                if (option.type === "SUB_COMMAND") {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    })
                } else if (option.value) args.push(option.value);
            }
                if (command.toggleOff) {
                    return await interaction.reply({
                        embeds: [new MessageEmbed()
                            .setTitle(`${client.emotes.badage}| **That Command Has Been Disabled By The Developers! Please Try Later.**`)
                            .setColor(client.colors.red)
                        ],
                        ephemeral: true
                    }).catch((e) => {
                        console.log(e)
                    });
                }
                if (!interaction.member.permissions.has(command.userPermissions || [])) return await interaction.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.emotes.error}| **You do not have \`${command.userPermissions.join(", ")}\` permission to use \`${command.name}\` command!**`)
                        .setColor(client.colors.red)
                    ],
                    ephemeral: true
                }).catch((e) => {
                    console.log(e)
                });
                if (!interaction.guild.me.permissions.has(command.botPermissions || [])) return await interaction.reply({
                    embeds: [new MessageEmbed()
                        .setDescription(`${client.emotes.x}| **I do not have \`${command.botPermissions.join(", ")}\` permission to use \`${command.name}\` command!**`)
                        .setColor(client.colors.orange)
                    ],
                    ephemeral: true
                }).catch((e) => {
                    console.log(e)
                });
                
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
          return interaction.reply({
              embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setDescription(`**${client.emotes.alert}| Please wait \`${Math.round(timeLeft)}\` more second(s) before reusing the \`${command.name}\` command!**`)
              ],
              ephemeral: true
          })
    }
  }
  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
                
                //======== Slash Command Handler ========
                command.run(client, interaction, args);
            } else {
                return;
            }
        }

        if (interaction.isContextMenu()) {
            const command = client.Commands.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }

    } catch (err) {
        console.log(err)
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
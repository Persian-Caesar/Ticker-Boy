import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  PermissionFlagsBits,
  PermissionsBitField
} from "discord.js";
import { CommandType } from "../../types/interfaces";
import { Languages } from "../../types/types";
import { getOption } from "../../functions/functions";
import selectLanguage from "../../utils/selectLanguage";
import responseError from "../../utils/responseError";
import responseDelete from "../../utils/responseDelete";
import languages from "../../storage/languages.json";
import EmbedData from "../../storage/EmbedData";
import response from "../../utils/response";
import dbAccess from "../../utils/dbAccess";
import config from "../../../config";
import error from "../../utils/error";

const defaultLanguage = selectLanguage(config.discord.default_language).commands.setup;
const ephemeral = selectLanguage(config.discord.default_language).replies.ephemeral;
export default {
  data: {
    name: "setup",
    description: "setup command.",
    options: [
      {
        name: "language",
        description: defaultLanguage.subCommands.language.description,
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "input",
            description: defaultLanguage.subCommands.language.options.input,
            type: ApplicationCommandOptionType.String,
            choices: Object
              .keys(languages)
              .map(a =>
                JSON.stringify({
                  name: languages[a as Languages],
                  value: a
                })
              )
              .map(a => JSON.parse(a)),

            required: false
          },
          {
            name: "ephemeral",
            description: ephemeral.description,
            type: ApplicationCommandOptionType.String,
            choices: [
              {
                name: ephemeral.choices.yes,
                value: "true"
              },
              {
                name: ephemeral.choices.no,
                value: "false"
              }
            ],
            required: false
          }
        ]
      }
    ],
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      PermissionFlagsBits.ManageGuild,
      PermissionFlagsBits.ManageChannels
    ]),
    default_bot_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks
    ])
  },
  category: "admin",
  cooldown: 10,
  only_owner: false,
  only_slash: true,
  only_message: false,

  run: async (client, interaction, args) => {
    try {
      const guildId = interaction.guildId!;
      const lang = (await dbAccess.getLanguage(guildId)) || config.discord.default_language;
      const language = selectLanguage(lang);
      const setup = client.commands.get("setup")!;

      const subcommand = getOption<string>(interaction, "getSubcommand", undefined, 0, args);
      switch (subcommand) {
        case "language": {
          const
            newlanguage = getOption<string>(interaction, "getString", "input") || args!.slice(1).join(" "),
            firstChoice = Object.keys(languages)
              .filter(a =>
                a.startsWith(newlanguage) || languages[a as Languages].toLowerCase().startsWith(newlanguage?.toLowerCase())
              ).random();

          const lastlanguage = await dbAccess.getLanguage(guildId);
          if (!newlanguage && lastlanguage) {
            const message = await response(interaction, {
              embeds: [
                new EmbedBuilder()
                  .setColor(EmbedData.color.red.HexToNumber())
                  .setFooter(
                    {
                      text: EmbedData.footer.footerText,
                      iconURL: EmbedData.footer.footerIcon
                    }
                  )
                  .setTitle(language.replies.error)
                  .setDescription(`${language.commands.setup.subCommands.language.replies.doDeleteLanguage.replaceValues({
                    language: lastlanguage
                  })}`)
              ],
              components: [
                new ActionRowBuilder<ButtonBuilder>()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId("setup-accept")
                      .setEmoji("✅")
                      .setLabel(language.replies.buttons.buttonYes)
                      .setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
                      .setCustomId("setup-cancel")
                      .setEmoji("❌")
                      .setLabel(language.replies.buttons.buttonNo)
                      .setStyle(ButtonStyle.Secondary)
                  )
              ]
            });
            const collector = message!.createMessageComponentCollector({ time: 60 * 1000, componentType: ComponentType.Button });
            collector.on("collect", async (button) => {
              if (button.user.id !== interaction.member!.user.id)
                return await responseError(
                  button,
                  language.commands.help.replies.invalidUser.replaceValues({
                    mention_command: `</${setup.data.name}:${setup.data?.id}>`,
                    author: interaction.member?.toString()!
                  })
                );

              switch (button.customId) {
                case "setup-accept": {
                  await button.deferUpdate();
                  await dbAccess.deleteLanguage(guildId);
                  return await button.editReply({
                    content: language.commands.setup.subCommands.language.replies.deleteLanguage.replaceValues({ language: config.discord.default_language }),
                    embeds: [],
                    components: []
                  });
                };
                case "setup-cancel": {
                  collector.stop();
                };
              }
            });
            collector.on("end", async () => {
              return await responseDelete(interaction, message);
            });

            return;
          }

          else if (!newlanguage || !firstChoice)
            return await responseError(
              interaction,
              language.commands.setup.subCommands.language.replies.noLanguage.replaceValues({
                languages: JSON.stringify(Object.values(languages))
              })
            )

          else {
            await dbAccess.setLanguage(guildId, firstChoice);

            return await response(interaction, {
              content: language.commands.setup.subCommands.language.replies.success.replaceValues({ language: languages[firstChoice as Languages] })
            });
          }
        }

      }
    }

    catch (e) {
      error(e)
    }
  }
} as CommandType;
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
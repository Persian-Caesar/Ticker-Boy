const db = require('quick.db');
const { 
  MessageSelectMenu,
  MessageEmbed, 
  MessageButton, 
  MessageActionRow 
} = require("discord.js");
const {
    HelpCategoryEmbed
} = require('./../../functions/functions')
module.exports = async (client, interaction) => {
  if(!interaction.isSelectMenu())return;
  if(interaction.customId === "help_menu"){
    let prefix = db.get(`prefix_${interaction.guild.id}`) | client.prefix;
    let help_member = db.get(`help_member_${interaction.guild.id}_${interaction.channel.id}`)
    if(help_member){
    if(interaction.user.id === help_member){
      
    if(interaction.values[0] === "inf"){
      HelpCategoryEmbed(client.commands, "Infos 📊", client, interaction, prefix)
    }
    if(interaction.values[0] === "owr"){
      HelpCategoryEmbed(client.commands, "Owner 👑", client, interaction, prefix)
    }
    if(interaction.values[0] === "vip"){
      HelpCategoryEmbed(client.commands, "VIP 💎", client, interaction, prefix)
    } 
    if(interaction.values[0] === "tic"){
      HelpCategoryEmbed(client.commands, "Ticket 🎫", client, interaction, prefix)
    }
    if(interaction.values[0] === "stp"){
      HelpCategoryEmbed(client.commands, "Setup 💻", client, interaction, prefix)
    }
  }
  }else{
      interaction.reply({
         embeds: [new MessageEmbed()
            .setColor(client.colors.none)
            .setDescription(`${client.emotes.error}| this menu for <@${interaction.user.id}>, you can't used this!!\nfor use this menu you can send a this \`${prefix}help\` command to get a help.`)
        ],
        ephemeral: true
      })
  }
  }
  if(interaction.customId === "ticket_menu"){
      if(interaction.values[0] === 'need_help'){
         await interaction.reply({
					        ephemeral: true,
					        content: `🔃| Process Loading...`,
					        ephemeral: true
				       })
         interaction.editReply({
              	content: `  `,
                embeds: [new MessageEmbed()
                    .setColor(client.colors.none)
                    .setTitle(`${client.emotes.tickets}| Create Ticket`)
                    .addField(`Language: PER:flag_ir:`,`دوست عزیز شما درخواستی برای ساخت یک تیکت برای **ساپورت و کمک** را داده اید. اگر موافق ساخت تیکت خود هستید در زیر پیام به دکمه سبز رنگ کلیک کنید و در صورت مخالف بودن به دکمه قرمز رنگ کلیک کنید، موفق و پیروز باشید.😎`)
                    .addField(`Language: EN:flag_us:`,`Dear friend, you have requested to make a ticket for **support and help**. If you agree to make your ticket, click on the green button below the message, and if you disagree, click on the red button, good luck. 😎`)
                      ],
                components: [new MessageActionRow()
                  .addComponents([new MessageButton()
                    .setStyle("DANGER")
                    .setCustomId("dont_do")
                    .setEmoji(client.emotes.no)
                    .setLabel("Don't Create")
                  ],[new MessageButton()
                    .setStyle("SUCCESS")
                    .setCustomId("create_need_help_ticket")
                    .setEmoji(client.emotes.ticket)
                    .setLabel("Create It")
                  ])
                ],
                ephemeral: true
         })
     } else if(interaction.values[0] === "report_bam"){
         await interaction.reply({
					          ephemeral: true,
					          content: `🔃| Process Loading...`,
					          ephemeral: true
				        })
         interaction.editReply({
              	content: `  `,
                embeds: [new MessageEmbed()
                  .setColor(client.colors.none)
                  .setTitle(`${client.emotes.tickets}| Create Ticket`)
                  .addField(`Language: PER:flag_ir:`,`دوست عزیز شما درخواستی برای ساخت یک تیکت برای **گزارش ادمین ، بات یا ممبر ها** را داده اید. اگر موافق ساخت تیکت خود هستید در زیر پیام به دکمه سبز رنگ کلیک کنید و در صورت مخالف بودن به دکمه قرمز رنگ کلیک کنید، موفق و پیروز باشید.😎`)
                  .addField(`Language: EN:flag_us:`,`Dear friend, you have requested to make a ticket for **report admins, bots or members**. If you agree to make your ticket, click on the green button below the message, and if you disagree, click on the red button, good luck. 😎`)
                ],
                components: [new MessageActionRow()
                  .addComponents([new MessageButton()
                      .setStyle("DANGER")
                      .setCustomId("dont_do")
                      .setEmoji(client.emotes.no)
                      .setLabel("Don't Create")
                  ],[new MessageButton()
                      .setStyle("SUCCESS")
                      .setCustomId("create_report_bam")
                      .setEmoji(client.emotes.ticket)
                      .setLabel("Create It")
                  ])
                ],
                ephemeral: true
         })
     } else if(interaction.values[0] === "exchange"){
         await interaction.reply({
					          ephemeral: true,
					          content: `🔃| Process Loading...`,
					          ephemeral: true
				        })
         interaction.editReply({
              	content: `  `,
                embeds: [new MessageEmbed()
                        .setColor(client.colors.none)
                        .setTitle(`${client.emotes.tickets}| Create Ticket`)
                        .addField(`Language: PER:flag_ir:`,`دوست عزیز شما درخواستی برای ساخت یک تیکت برای **اکسچنج و تبادل** را داده اید. اگر موافق ساخت تیکت خود هستید در زیر پیام به دکمه سبز رنگ کلیک کنید و در صورت مخالف بودن به دکمه قرمز رنگ کلیک کنید، موفق و پیروز باشید.😎`)
                        .addField(`Language: EN:flag_us:`,`Dear friend, you have requested to make a ticket for **exchange**. If you agree to make your ticket, click on the green button below the message, and if you disagree, click on the red button, good luck. 😎`)
                ],
                components: [new MessageActionRow()
                  .addComponents([new MessageButton()
                    .setStyle("DANGER")
                    .setCustomId("dont_do")
                    .setEmoji(client.emotes.no)
                    .setLabel("Don't Create")
                  ],[new MessageButton()
                    .setStyle("SUCCESS")
                    .setCustomId("create_exchange")
                    .setEmoji(client.emotes.ticket)
                    .setLabel("Create It")
                  ])
                ],
                ephemeral: true
         })
     } else if(interaction.values[0] === "admin"){
         await interaction.reply({
					          ephemeral: true,
					          content: `🔃| Process Loading...`,
					          ephemeral: true
				        })
         interaction.editReply({
              	content: `  `,
                embeds: [new MessageEmbed()
                        .setColor(client.colors.none)
                        .setTitle(`${client.emotes.tickets}| Create Ticket`)
                        .addField(`Language: PER:flag_ir:`,`دوست عزیز شما درخواستی برای ساخت یک تیکت برای **ثبت نام برای ادمینی** را داده اید. اگر موافق ساخت تیکت خود هستید در زیر پیام به دکمه سبز رنگ کلیک کنید و در صورت مخالف بودن به دکمه قرمز رنگ کلیک کنید، موفق و پیروز باشید.😎`)
                        .addField(`Language: EN:flag_us:`,`Dear friend, you have requested to make a ticket for **register for admin**. If you agree to make your ticket, click on the green button below the message, and if you disagree, click on the red button, good luck. 😎`)
                      ],
                components: [new MessageActionRow()
                  .addComponents([new MessageButton()
                      .setStyle("DANGER")
                      .setCustomId("dont_do")
                      .setEmoji(client.emotes.no)
                      .setLabel("Don't Create")
                  ],[new MessageButton()
                      .setStyle("SUCCESS")
                      .setCustomId("create_admin")
                      .setEmoji(client.emotes.ticket)
                      .setLabel("Create It")
                  ])
                ],
                ephemeral: true
         })
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
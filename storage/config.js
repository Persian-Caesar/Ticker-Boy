require('dotenv').config()
module.exports = {
    source: {
        website : {
            support: "https://discord.gg/at5Q72HNAx",
            domain: "https://your-replit-link.repl.co"//you need get your repl.co link in replit with keepAlive code, then replace the link
        },   
        anti_crash: true,//turn on or off the antiCrash file
        keep_alive: true,//turn on or off the keepAlive file
        dashboard: false,//turn on or off the bot dashboard website
        port: 1528,//don't need to touch or changed
        callback: 'https://your-replit-link.repl.co/callback',//you need get your repl.co link in replit with keepAlive code, then replace the link right behind of /callback
        secret: process.env.USER_SECRET_ID,//bot secret id, you can get it in discord developer portal
        client_id: process.env.USER_ID,//bot client id, you can get it in discord server or in discord developer portal
    },
    emojis: {
        x:       '❌',
        error:   '⚠',
        alert:   '⏰',
        badage:  '📛',
        entry:   '⛔',
        success: '✅',
        trash:   '🗑️',
        ticket:  '🎟️',
        tick:    '☑',
        open:    '🔓',
        close:   '🔒',
        rename:  '🖋',        
        report:  '📞',
        setup:   '📝',
        reason:  '📖',
        system:  '⚙',
        hamer:   '🛠',
        add:     '📩',
        help:    '🧰',   
        info:    '🗂',
        plus:    '➕',
        exchange:'💸',
        hurt:    '💕',
        admin:   '📠',
        reply:   '<:reply_desgine:950701730675445790>',
        tickets: '<:ticket:988804758414446602>',
    },
    discord: {
        token: process.env.TOKEN,
        prefix: process.env.PREFIX,
        invite: `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot+applications.commands+identify+guilds+applications.commands.permissions.update&permissions=2080374975`,
        server_support: "https://discord.gg/at5Q72HNAx",
        server_id: "912596015075455016",
        server_channel_report: "988020418612961322",
        server_channel_status: "988020102186303608",      
    },
    status: {
        text: "{prefix}help | TickerBoy by Mr.SIN RE#1528 | https://dsc.gg/sizar-team",
        type: "CUSTOM_STATUS",
        url: "https://www.twitch.tv/sobhan_srza",
        presence: "dnd"
    },  
    vip_role: [
        '912596015108988983'
    ],
    owner: [
        '831934465609302056', 
        '866992479328665600'
    ],
    colors: {
      none:        "#2F3136",
      red:         "#ff4d4d",
      green:       "#ddcc33",
      uptime:      "#51ff23",
      purpledark:  "#6a006a",
      purplemedium:"#a958a5",
      purplelight: "#c481fb",
      orange:      "#F9A72D",
      gold:        "#daa520",
      reddark:     "#8e2430",
      redlight:    "#ff0000",
      bluedark:    "#3b5998",
      cyan:        "#5780cd",
      bluelight:   "#ace9e7",
      aqua:        "#33a1ee",
      pink:        "#ff9dbb",
      greendark:   "#2ac075",
      greenlight:  "#a1ee33",
      white:       "#f9f9f6",
      cream:       "#ffdab9",
      blue:        "#4c8bf5",
      yellow:      "#E9E95A",
      purple:      "#B05AE9",
      black:       "#171717",
    }
};
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for SIZAR Team | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us SIZAR Team, When Using This Code!
 * @INFO
 */
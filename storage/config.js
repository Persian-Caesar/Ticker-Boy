require('dotenv').config()
module.exports = {
    source: {
        website : {
            support: "https://discord.gg/at5Q72HNAx",
            domain: "https://Ticker-Boy.your_replit_name.repl.co"//you need get your repl.co link in replit with keepAlive code, then replace the link
        },   
        anti_crash: true,//turn on or off the antiCrash file
        keep_alive: true,//turn on or off the keepAlive file
        dashboard: false,//turn on or off the bot dashboard website
        port: 1528,//don't need to touch or changed
        callback: 'https://Ticker-Boy.your_replit_name.repl.co/callback',//you need get your repl.co link in replit with keepAlive code, then replace the link right behind of /callback
        secret: process.env.USER_SECRET_ID,//bot secret id, you can get it in discord developer portal
        client_id: process.env.CLIENT_ID,//bot client id, you can get it in discord server or in discord developer portal
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
    vip_role: [
        '912596015108988983'
    ],
    owner: [
        '831934465609302056', 
        '866992479328665600'
    ],
};
/**
 * @INFO
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/sizar-team
 * @INFO
 * Work for Persian Czar | https://dsc.gg/sizar-team
 * @INFO
 * Please Mention Us Persian Czar, When Using This Code!
 * @INFO
 */

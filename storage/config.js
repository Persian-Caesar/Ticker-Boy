require('dotenv').config()
module.exports = {
    source: {
        website : {
            support: "https://discord.gg/at5Q72HNAx",
            domain: "https://Ticker-Boy.sobhansrza.repl.co"//you need get your repl.co link in replit with keepAlive code, then replace the link
        },   
        anti_crash: true,//turn on or off the antiCrash file
        keep_alive: true,//turn on or off the keepAlive file
        dashboard: false,//turn on or off the bot dashboard website
        port: 1528,//don't need to touch or changed
        callback: 'https://Ticker-Boy.sobhansrza.repl.co/callback',//you need get your repl.co link in replit with keepAlive code, then replace the link right behind of /callback
        secret: process.env.USER_SECRET_ID,//bot secret id, you can get it in discord developer portal
        client_id: process.env.CLIENT_ID,//bot client id, you can get it in discord server or in discord developer portal
    },
    discord: {
        token: process.env.TOKEN,
        prefix: process.env.PREFIX,
        invite: `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot+applications.commands&permissions=2080374975`,
        server_support: "https://discord.gg/aaahv3Ua",
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
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */
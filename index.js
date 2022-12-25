//===========================================================================================================//
//======== Packages ========
require('dotenv').config()
const { 
  Client, 
  Intents, 
  Collection 
} = require('discord.js');
const config = require(`${process.cwd()}/storage/config.js`);
const status = require(`${process.cwd()}/storage/status.json`);
const clc = require("cli-color");
const fs = require('fs');
const client = new Client({
    intents: [new Intents(32767)], // 32767 == full intents, calculated from intent calculator 
    shards: 'auto',
    allowedMentions: {
    parse: ["roles", "users", "everyone"],//mentions disable
    repliedUser: false,//disable mention in replying messages
    },
    /*presence: {//setting bot status in client
        activities: [{
          name: `${status.text}`.replace("{prefix}", config.discord.prefix), 
          type: status.type, 
          url: status.url
        }],
        status: status.presence,
        afk: true
    },*/
    ws:{
        properties: {
            browser: "Discord Android",//Discord Web | Discord Android | Discord Ios | Discord Client
            os: "Android"//Other | Android | iOS | TempleOS | Linux | Mac OS X | Windows
        },
    },
});
client.config = config;
client.prefix = client.config.discord.prefix;
client.token = client.config.discord.token;
client.emotes = require(`${process.cwd()}/storage/emotes.json`);
client.colors = require(`${process.cwd()}/storage/colors.json`);
client.embed = require(`${process.cwd()}/storage/embed.json`);
client.categories = fs.readdirSync(`${process.cwd()}/commands`);
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

//===========================================================================================================//
//======== Loading Starts =========
var starts = fs.readdirSync(`${process.cwd()}/start`).filter(file => file.endsWith('.js'));
start = new Map();
starts.forEach((file) => {
  require(`${process.cwd()}/start/${file}`)(client);
  start.set(file);
});
try {
  const stringlength = 69;
  console.log("\n")
  console.log(clc.yellowBright(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + clc.greenBright(`                   ${clc.magentaBright(start.size)} Starts Is Loaded!!`) + " ".repeat(-1 + stringlength - ` ┃ `.length - `                   ${start.size} Starts Is Loaded!!`.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┃ `) + " ".repeat(-1 + stringlength - ` ┃ `.length) + clc.yellowBright("┃"))
  console.log(clc.yellowBright(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`))
  console.log("\n")
} catch { /* */ }


//===========================================================================================================//
//======== Consol ========
if(client.token){
    client.login(client.token).catch(e => {
     console.log(clc.red("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!\n"))
   })
  } else {
   console.log(clc.red("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!"))   
  }
//========== Replit Alive
setInterval(() => {
     if(!client || !client.user) {
      console.log("The Client Didn't Login Proccesing Kill 1")
        process.kill(1);
    } else {
   }
}, 10000); 
/**
 * @Info
 * Bot Coded by Mr.SIN RE#1528 :) | https://dsc.gg/persian-caesar
 * @Info
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @Info
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @Info
 */
/**
 * @license
  BSD 3-Clause License

  Copyright (c) 2021-2025, the respective contributors, as shown by Persian Caesar and Sobhan.SRZA (mr.sinre) file.

  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

  * Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// Packages
require("dotenv").config();
const
  {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
  } = require("discord.js"),
  clc = require("cli-color"),
  fs = require("fs"),
  data = require("./package.json"),
  error = require("./src/functions/error.js"),
  post = require("./src/functions/post.js"),
  handle = fs.readdirSync("./src/handlers")
    .filter(file => file.endsWith(".js")),

  client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent
    ],
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction,
      Partials.User,
      Partials.GuildMember,
      Partials.ThreadMember
    ]
  });

client.config = require("./config");
client.prefix = client.config.discord.prefix;
client.token = client.config.discord.token;
client.colors = require("./src/storage/colors.json");
client.embed = require("./src/storage/embed.json");
client.emotes = require("./src/storage/emotes.json").theme;
client.findlang = require("./src/storage/languages.json");
client.categories = fs.readdirSync("./src/commands");
client.commands = new Collection();
client.cooldowns = new Collection();
client.languages = {};
const languages = fs.readdirSync("./src/locales");
for (const language of languages.filter(file => file.endsWith(".json"))) {
  client.languages[`${language.split(".json").join("")}`] = require(`./src/locales/${language}`);
};
Object.freeze(client.languages);

// Load Handlers 
let amount = 0;
post(
  clc.cyanBright(`Welcome to ${clc.blueBright(data.name)}! | Version: ${clc.blueBright(data.version)}`) + "\n" +
  `Coded By ${clc.yellow("Sobhan-SRZA")} & ${clc.yellow("Persian Caesar")} With ${clc.redBright("❤️")}` + "\n" +
  `Discord: ${clc.blueBright("Mr.Sinre")} | ${clc.blueBright("mr.sinre")} | ${clc.blueBright("https://dsc.gg/persian-caesar")}`,
  "W",
  "magentaBright",
  "cyanBright"
);
post(`Logging into the BOT...`, "S", "yellowBright", "greenBright");
handle.forEach((file) => {
  require(`./src/handlers/${file}`)(client);
  amount += 1;
});
post(`${clc.cyanBright(amount)} Handler Is Loaded!!`, "S", "yellowBright", "greenBright");

// Login 
if (client.token) {
  client.login(client.token).catch(e => {
    post("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!!", "E", "red", "redBright");
    error(e);
  });
} else {
  post("Please Write Your Bot Token Opposite The Token In The config.js File In Your Project!!", "E", "red", "redBright");
};

// Anti Crash
if (client.config.source.anti_crash) {
  process.on("unhandledRejection", (reason) => error(reason));
  process.on("rejectionHandled", (promise) => error(promise));
  process.on("uncaughtException", (e) => error(e));
  process.on("uncaughtExceptionMonitor", (e) => error(e));
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
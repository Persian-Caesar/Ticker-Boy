let clc = require('cli-color');
module.exports = async (client, error, id) => {
  client.logger(clc.redBright(`Shard #${id} Errored`));
    setInterval(() => {
     if(!client || !client.user) {
      console.log("The Client Didn't Login Proccesing Kill 1")
        process.kill(1);
    } else {
   }
  }, 10000); 
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
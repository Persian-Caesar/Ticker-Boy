const express = require("express");
const app = express();
const session = require(`express-session`);
const MemoryStore = require("memorystore")(session);
const http = require(`http`).createServer(app);  
const url = require(`url`);
const clc = require('cli-color');
const path = require(`path`);
const { Permissions } = require("discord.js");
const ejs = require("ejs");
const fs = require("fs")
const passport = require(`passport`);
const bodyParser = require("body-parser");
const Strategy = require(`passport-discord`).Strategy;
require('dotenv').config()
/**
 *  STARTING THE WEBSITE
 * @param {*} client THE DISCORD BOT CLIENT 
 */
module.exports = (client) => {
  client.logger("Bot Dashboard Not Finish Yet.")
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
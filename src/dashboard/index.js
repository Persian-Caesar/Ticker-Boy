const express = require("express");
const config = require("../../config");
const post = require("../functions/post");
const app = express();

/**
 * 
 * @param {import("discord.js").Client} client
 * @returns {void}
 */
module.exports = (client) => {
    const data = {
        name: "Ticker Boy",
        navigations: [
            "commands",
            "premium",
            "invite"
        ]
    };
    app.use(express.static(__dirname + "/public")); // Load html and css file in "public" folder.
    app.use(express.urlencoded({ extended: true })); // Enable use url api and encoded.
    app.use(express.json()); // Enable posting json codes.
    app.set("view engine", "ejs"); // Enable ejs file format.
    app.set("etag", false); // Disable the cache.
    app.enable("trust proxy"); // Trust to localhost ip.

    app.get("/test", (req, res) => {
        res.render(__dirname + "/views/test", { data });
    });
    app.listen(config.source.dashboard.port, () => {
        post(`Dashboard Web Is Running On ${config.source.dashboard.host} (With Port ${config.source.dashboard.port})`, "S");
    }); // Set web port and set it online.
}
/**
 * @copyright
 * Coded by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * @copyright
 * Work for Persian Caesar | https://dsc.gg/persian-caesar
 * @copyright
 * Please Mention Us "Persian Caesar", When Have Problem With Using This Code!
 * @copyright
*/
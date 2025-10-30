import {
    Client,
    ClientOptions,
    Collection,
    Partials
} from "discord.js";
import { CommandType } from "../types/interfaces";
import Database from "./Database";
import config from "../../config";

export default class DiscordClient extends Client {
    commands: Collection<string, CommandType>;
    cooldowns: Collection<string, Collection<string, number>>;
    config: typeof config;
    db: Database | null;
    constructor(options?: ClientOptions) {
        if (!options)
            options = {
                intents: [
                    "GuildBans",
                    "GuildMembers",
                    "GuildMessages",
                    "GuildWebhooks",
                    "Guilds",
                    "MessageContent"
                ],
                partials: [
                    Partials.Channel,
                    Partials.GuildMember,
                    Partials.Message,
                    Partials.User
                ],
                allowedMentions: {
                    repliedUser: true
                }
            };

        super(options);
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.config = config;
        this.token = this.config.discord.token;
        (async () => {
            const
                databaseFile = await import("../utils/database"),
                loadDB = databaseFile.default || databaseFile,
                database = await loadDB();

            if (database)
                this.db = new Database(database);
        })()
    }
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
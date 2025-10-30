import { QuickDB } from "quick.db";
import config from "../../config";
import error from "./error";
import post from "../functions/post";

export default async () => {
    try {
        let driver: any;
        switch (config.source.database.type) {
            case "sql": {
                const { SqliteDriver } = await import("quick.db");

                driver = new SqliteDriver("./");
                break;
            }

            case "mysql": {
                const { MySQLDriver } = await import("quick.db");

                driver = new MySQLDriver(config.source.database.mysql)
                break;
            }

            case "json": {
                const { JSONDriver } = await import("quick.db");

                driver = new JSONDriver();
                break;
            }

            case "mongodb": {
                const { MongoDriver } = await import("quickmongo"!);
                driver = new MongoDriver(config.source.database.mongoURL);
                await driver.connect();
                break;
            }
        };

        const db = new QuickDB({ driver });
        await db.init();
        post(
            `Database Is Successfully Activated!! (Type: ${config.source.database.type.toLocaleUpperCase()})`,
            "S"
        );

        return db;
    }

    catch (e) {
        post(`Database Doesn't Work!!`.red, "E", "red", "red")
        error(e);
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
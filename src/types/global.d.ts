export { }

declare global {
    declare namespace NodeJS {
        interface ProcessEnv {
            anti_crash: 'true' | 'false';
            database_mongoURL: string;
            database_msql_database: string;
            database_msql_host: string;
            database_msql_password: string;
            database_msql_user: string;
            database_type: 'json' | 'mysql' | 'mongodb' | 'sql';
            default_language: string;
            logger: 'true' | 'false';
            one_guild: 'true' | 'false';
            owners: string;
            prefix: string;
            status_loop: string;
            status_activity: string;
            status_presence: string;
            status_type: string;
            support_id: string;
            support_url: string;
            token: string;
            webhook_avatar: string;
            webhook_thread_bugs: string;
            webhook_thread_report: string;
            webhook_thread_status: string;
            webhook_url: string;
            webhook_username: string;
        }
    }

    interface Array<T> {
        /**
         * Retunr random item from array.
         */
        random(): T;
    }

    interface String {
        /**
         * Replace item you want replace it.
         * @example
         * ```js
         * "{item} is item.".replaceValues({ item: "glass" }) // "glass is item"
         * ```
         * @param object - any item you want to replace it.
         */
        replaceValues(object: Record<string, any>): string;


        /**
         * Doing capitalizing string.
         */
        toCapitalize(): string;

        /**
         * Change hex color code string to the hex decimal number. 
         */
        HexToNumber(): number;
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
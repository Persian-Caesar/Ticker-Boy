const { ActivityType } = require("discord.js");

module.exports = {
  source: {
    default_language: process.env.default_language || "en", // Bot default language in discord.
    anti_crash: true, // Anticrash on or off
    chat_bot: false, // Dm ChatBot on or off
    one_guild: false, // One Guild on or off
    logger: true, // Webhook logger on or off
    dashboard: {
      on: true, // Dashboad on or off
      port: Number(process.env.dashboard_port) || 3000, // Dashboard port server.
      host: process.env.dashboard_host || "http://localhost:3000" // Dashboard host url.
    },
    database: {
      type: process.env.database_type || "", // Choose one type for save users and guilds data. Types: "mysql" | "sql" | "mongodb" | "json"
      mongoURL: process.env.database_mongoURL || "", // If you choose "mongodb" type place your mongo url.
      mysql: {
        host: process.env.database_msql_host || "", // Place your Mysql server host name.
        user: process.env.database_msql_user || "", // Place your Mysql server username.
        password: process.env.database_msql_password || "", // Place your Mysql server password.
        database: process.env.database_msql_database || "" // Place your Mysql server database name.
      } // If you choose "mysql" type place your Mysql server information.
    }
  },
  discord: {
    token: process.env.token || "", // Bot token.
    prefix: process.env.prefix || "", // Bot message command prefix.
    status: {
      activity: [
        "Build by Sobhan-SRZA (mr.sinre)",
        "Working in {servers} Servers",
        "Work for {members} Members"
      ], // Set bot status activity, you can change it. | You can use "{members}" variable to shows bot all users.
      type: [
        ActivityType.Custom
      ], // Can be: ActivityType.Competing | ActivityType.Listening | ActivityType.Playing | ActivityType.Streaming | ActivityType.Watching
      presence: [
        "dnd"
      ] // Can be: "online" | "dnd" | "idle" | "offline"
    },
    noperms_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}",// Discord bot invite link with no permission.
    admin_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}&permissions=8", // Discord bot invite link with administrator permission.
    default_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}&redirect_uri=https://discord.gg/AfkuXgCKAQ&response_type=code&permissions=395674250441",  // Discord bot invite link with recommended permission.
    support: {
      invite: process.env.support_url || "https://discord.gg/AfkuXgCKAQ", // Support server invite link.
      id: process.env.support_id || "1054814674979409940", // Support server Id.
      report_channel: process.env.support_report || "1154253980021575792", // Channel Id of webhook report.
      status_channel: process.env.support_status || "1154251673670258748", // Channel Id of webhook status.
      stats_channel: process.env.support_stats || "1109485704381202552", // Channel Id of stats.
      log_channel: process.env.support_log || "1154251468279398441", // Channel Id of webhook logger.
      webhook: {
        url: process.env.webhook_url || "", // Webhook logger url.
        avatar: process.env.webhook_avatar || "https://cdn.discordapp.com/avatars/1241112292616044695/222fdd4eddd400ac5e6e42512cae2b59.png", // Webhook logger avatar.
        username: process.env.webhook_username || "Ticker Boy | Logger", // Webhook logger username.
        threads: {
          status: process.env.webhook_thread_status || "", // Id of thread for webhook to bot status alerts.
          bugs: process.env.webhook_thread_bugs || "", // Id of thread for webhook to send console errors.
          report: process.env.webhook_thread_report || "" // Id of thread for webhook to send users report messages.
        }
      },
      vip_roles: process.env.vip_roles.toString().replaceAll(" ", "").split(",") || [
        "912596015108988983"
      ], // Place VIP Roles for premium.
      owners: process.env.owners.toString().replaceAll(" ", "").split(",") || [
        "831934465609302056",
        "866992479328665600",
        "865630940361785345"
      ], // Source owners.
      whitelist_guilds: process.env.whitelist_guilds.toString().replaceAll(" ", "").split(",") || [
        "1054814674979409940",
        "991716504464797839",
        "901877002926174279",
        "912596015075455016"
      ] // Id of spacial server to none actionable.
    },
    topgg: "https://top.gg/bot/{clientId}/vote" // Addess of bot topgg page.
  }
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
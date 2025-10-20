# 🎫 **Ticker Boy** - Advanced Discord Ticket System Bot

<div align="center">

[![npm](https://badges.aleen42.com/src/npm.svg)](https://www.npmjs.com/)
[![node](https://badges.aleen42.com/src/node.svg)](https://nodejs.org/)
[![javascript](https://badges.aleen42.com/src/javascript.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![version](https://img.shields.io/github/v/release/Persian-Caesar/Ticker-Boy?label=Version)](https://github.com/Persian-Caesar/Ticker-Boy/releases)
[![license](https://img.shields.io/github/license/Persian-Caesar/Ticker-Boy?label=License)](LICENSE)
[![last-commit](https://img.shields.io/github/last-commit/Persian-Caesar/Ticker-Boy?label=Last%20Commit)](https://github.com/Persian-Caesar/Ticker-Boy/commits/main)
[![release-date](https://img.shields.io/github/release-date/Persian-Caesar/Ticker-Boy?label=Last%20Release)](https://github.com/Persian-Caesar/Ticker-Boy/releases)

[![stars](https://img.shields.io/github/stars/Persian-Caesar/Ticker-Boy?style=social)](https://github.com/Persian-Caesar/Ticker-Boy/stargazers)
[![forks](https://img.shields.io/github/forks/Persian-Caesar/Ticker-Boy?style=social)](https://github.com/Persian-Caesar/Ticker-Boy/network/members)
[![code-size](https://img.shields.io/github/languages/code-size/Persian-Caesar/Ticker-Boy?label=Code%20Size)](https://github.com/Persian-Caesar/Ticker-Boy)
[![files](https://img.shields.io/github/directory-file-count/Persian-Caesar/Ticker-Boy?label=Files)](https://github.com/Persian-Caesar/Ticker-Boy)

[![GitHub Repo stars](https://github-readme-stats.vercel.app/api/pin/?username=Persian-Caesar&repo=Ticker-Boy&theme=react)](https://github.com/Persian-Caesar)

</div>

---

## 🚀 **What is Ticker Boy?**

<a href="https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id=1241112292616044695&redirect_uri=https://discord.gg/AfkuXgCKAQ&response_type=code&&permissions=395674250441">
    <img alt="ticker-boy" src="https://github.com/user-attachments/assets/0d99dc9e-8d41-406c-8587-c5fa5e468ca5" align="right" width=25% >
</a>

**Ticker Boy** is a **feature-rich, production-ready Discord bot** designed specifically for **advanced ticket management** in Discord servers. Built with **Discord.js v14**, it provides a **professional support system** for communities, gaming servers, and businesses. 

### **Core Purpose**
- **Streamline Support**: Users create tickets via interactive buttons/menus, staff claim/resolve them with transcripts.
- **Admin Dashboard**: Configure everything via `/settings` (language, panels, roles, logs, claims).
- **Scalable**: Supports **thousands of servers** with multi-DB options (JSON, MySQL, MongoDB).
- **Customizable**: Multi-language (EN/Persian), themes, embeds, and permissions.

**Version 1.3.9 Highlights**:
- **Fixed Ticket Bugs**: Improved stability in create/close/claim flows.
- **Enhanced Buttons**: Better interaction handling, no more "interaction failed" errors.
- **Quality Improvements**: Optimized DB queries, reduced memory usage, better error logging.
- **New Features**: Claim system toggle, parent category support (open/close), menu options, mod logs.
- **Dashboard**: Express-based web interface for stats/settings.
- **Transcripts**: HTML exports for closed tickets (via `discord-html-transcripts`).
- **Multi-Language**: EN-US & Persian with dynamic localization.
- **Webhook Logging**: Auto-reports joins/leaves/errors to support server.
- **Anti-Crash**: Full error handling with webhook alerts.

Perfect for **support teams** needing **fast, organized ticket handling** without manual channels.

---

## ✨ **Key Features**

| Feature                 | Description                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| **Interactive Tickets** | Button/menu-based creation, claim, close, reopen, rename, add/remove users, delete.         |
| **Admin Dashboard**     | `/settings` with select menus, modals, buttons for full customization.                      |
| **Multi-DB Support**    | JSON (default), SQLite, MySQL, MongoDB via QuickDB/QuickMongo.                              |
| **Claim System**        | Staff claim tickets; toggleable, with permissions.                                          |
| **Transcripts**         | Auto-generate HTML transcripts on close/delete, DM to staff.                                |
| **Logging**             | Mod logs, webhook alerts (joins/leaves, errors, reports).                                   |
| **Parent Categories**   | Auto-move tickets to open/close categories.                                                 |
| **Multi-Language**      | English & Persian; per-guild configurable.                                                  |
| **Permissions**         | Granular role-based access (admin roles, ManageChannels).                                   |
| **Cooldowns**           | Per-command, per-user (configurable).                                                       |
| **Status Updates**      | Auto-updating bot stats embed in support server (servers, users, ping, uptime, CPU/memory). |
| **Anti-Crash**          | Catches unhandled errors, logs to webhook/console.                                          |
| **Dashboard**           | Web UI (Express + EJS) for stats (localhost:3000).                                          |
| **Commands**            | Slash + Prefix support; categories: Admin, Misc, Owner, Ticket.                             |

---

## 📦 **Dependencies**

| Package                                                                            | Version  | Purpose                         |
| ---------------------------------------------------------------------------------- | -------- | ------------------------------- |
| [axios](https://www.npmjs.com/package/axios)                                       | ^1.5.0   | HTTP requests (e.g., chatbots). |
| [cli-color](https://www.npmjs.com/package/cli-color)                               | ^2.0.2   | Colored console logging.        |
| [cpu-stat](https://www.npmjs.com/package/cpu-stat)                                 | ^2.0.1   | CPU stats for status embeds.    |
| [discord-html-transcripts](https://www.npmjs.com/package/discord-html-transcripts) | ^3.1.3   | Ticket transcript generation.   |
| [discord.js](https://discord.js.org/)                                              | ^14.13.0 | Discord API client.             |
| [dotenv](https://www.npmjs.com/package/dotenv)                                     | ^16.4.5  | Environment variables.          |
| [ejs](https://ejs.co/)                                                             | ^3.1.10  | Dashboard templates.            |
| [express](https://expressjs.com/)                                                  | ^4.19.2  | Web dashboard server.           |
| [moment](https://momentjs.com/)                                                    | ^2.29.4  | Date/time formatting.           |
| [mongoose](https://mongoosejs.com/)                                                | ^7.1.1   | MongoDB ORM (if used).          |
| [quick.db](https://quickdb.js.org/)                                                | ^9.1.7   | File/SQLite DB wrapper.         |
| [quickmongo](https://www.npmjs.com/package/quickmongo)                             | ^5.2.0   | MongoDB driver for QuickDB.     |

Install with: `npm install`

---

## 📁 **Project Structure**

```
Ticker Boy/
├── config.js                  # Bot config (DB, Discord, support)
├── index.js                   # Main entrypoint
├── package.json               # Dependencies & scripts
├── example.env                # Env template
├── LICENSE                    # BSD-3-Clause
├── start.bat                  # Auto-install & start
├── src/
│   ├── commands/              # All commands (Admin, Misc, Owner, Ticket)
│   │   ├── Admin/settings.js  # Main dashboard
│   │   ├── Misc/{help,invite,ping}.js
│   │   ├── Owner/{dbset,serverleave,serverlist}.js
│   │   └── Ticket/{add,claim,close,create,delete,open,rename,transcript}.js
│   ├── dashboard/             # Express web UI
│   │   ├── index.js
│   │   ├── public/            # Static files (CSS, HTML)
│   │   └── views/             # EJS templates
│   ├── events/                # Event handlers
│   │   ├── button/interactionCreate.js
│   │   ├── command/interactionCreate.js
│   │   ├── guild/{create,delete}.js
│   │   ├── menu/interactionCreate.js
│   │   ├── message/messageCreate.js
│   │   ├── modal/interactionCreate.js
│   │   ├── ready/ready.js
│   │   ├── status/ready.js
│   │   └── ticket/interactionCreate.js
│   ├── functions/             # Utilities
│   │   ├── chooseRandom.js
│   │   ├── database.js
│   │   ├── error.js
│   │   ├── errorMessage.js
│   │   ├── functions.js       # Multi-purpose utils
│   │   ├── help.js
│   │   ├── loadCommand.js
│   │   ├── post.js
│   │   ├── ticket.js          # Ticket core
│   │   └── ... (20+ more)
│   ├── handlers/              # Bootloaders
│   │   ├── 1-antivirus.js     # (Missing in your upload?)
│   │   ├── 2-database.js
│   │   ├── 3-events.js
│   │   ├── 4-dashboard.js
│   │   └── 5-commandHandler.js
│   ├── locales/               # Translations
│   │   ├── en.json
│   │   └── per.json
│   └── storage/               # Static data
│       ├── colors.json
│       ├── embed.json
│       ├── emotes.json
│       └── languages.json
```

---

## 🔧 **Important Functions**

| Function                                                                 | Input                       | Output            | Description                                     |
| ------------------------------------------------------------------------ | --------------------------- | ----------------- | ----------------------------------------------- |
| **chooseRandom(array)**                                                  | `array: any[]`              | `any`             | Returns random item from array.                 |
| **createORgetInvite(guild)**                                             | `guild: Guild`              | `Invite \| null`  | Creates or fetches server invite.               |
| **DB.has(key)**                                                          | `key: string`               | `boolean`         | Checks if DB key exists.                        |
| **DB.get(key, def?)**                                                    | `key: string, def?: any`    | `any`             | Gets value from DB (with default).              |
| **DB.set(key, val)**                                                     | `key: string, val: any`     | `Promise<void>`   | Sets DB value.                                  |
| **DB.push(key, val)**                                                    | `key: string, val: any`     | `Promise<void>`   | Appends to DB array.                            |
| **DB.add(key, num)**                                                     | `key: string, num: number`  | `Promise<number>` | Increments DB number.                           |
| **deleteResponse({interaction, message})**                               | Interaction/Message         | `void`            | Deletes reply/message safely.                   |
| **editResponse({interaction, message, data})**                           | Options obj                 | `Message`         | Edits interaction/message.                      |
| **error(err)**                                                           | `err: Error`                | `void`            | Logs error to console/webhook.                  |
| **errorMessage(client, interaction, text)**                              | Client, Interaction, string | `void`            | Sends styled error embed.                       |
| **firstUpperCase(string)**                                               | `string: string`            | `string`          | Title-cases string (e.g., "hello" → "Hello").   |
| **logMessage(client, interaction, channel, desc, reason, emote, file?)** | Params obj                  | `void`            | Sends formatted log embed (with optional file). |
| **loadCommand(dirname, type, commands)**                                 | Paths, Map                  | `void`            | Loads commands from folders.                    |
| **post(data, type, color1, color2)**                                     | Params                      | `void`            | Colored console logger.                         |
| **response(interaction, data)**                                          | Interaction, MessageOptions | `Message`         | Sends/edits response.                           |
| **selectLanguage(lang)**                                                 | `lang: string`              | `Object`          | Loads locale JSON.                              |
| **sendGuildAlert({client, guild, ...})**                                 | Options obj                 | `Message`         | Sends guild join/leave webhook.                 |
| **ticket.create(client, interaction)**                                   | Client, Interaction         | `void`            | Creates ticket channel.                         |
| **ticket.close(client, interaction)**                                    | Client, Interaction         | `void`            | Closes ticket, generates transcript.            |
| **ticket.claim(client, interaction)**                                    | Client, Interaction         | `void`            | Claims ticket for staff.                        |
| **checkPing(ms)**                                                        | `ms: number`                | `string`          | Ping status emoji/text (e.g., "🟢 Excellent").   |

---

## 🛠 **Installation**

### **Prerequisites**
- **Node.js** ≥16.9.0
- **Discord Bot Token** ([Developer Portal](https://discord.com/developers/applications))
- Optional: MySQL/MongoDB server

### **Steps**
1. **Clone Repo**:
   ```bash
   git clone https://github.com/Persian-Caesar/Ticker-Boy.git
   cd Ticker-Boy
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment** (copy `example.env` → `.env`):
   ```env
   token=YOUR_BOT_TOKEN
   prefix=!
   database_type=json  # json/sql/mysql/mongodb
   # MongoDB:
   database_mongoURL=mongodb+srv://user:pass@cluster.mongodb.net/
   # MySQL:
   database_msql_host=localhost
   database_msql_user=root
   database_msql_password=pass
   database_msql_database=tickerboy
   # Support:
   support_id=1054814674979409940
   support_url=https://discord.gg/xh2S2h67UW
   webhook_url=YOUR_WEBHOOK_URL  # For logging
   ```

4. **Customize `config.js`** (optional):
   - Dashboard port/host
   - Status activities
   - Owners/VIP roles
   - Invite links

5. **Run Bot**:
   ```bash
   node index.js
   ```
   Or: `start.bat` (auto-install + run)

**Invite Bot**: Use links in `config.js` (no-perms, admin, default).

---

## ⚙️ **Configuration**

### **config.js Sections**
- **source**: Language, anti-crash, dashboard (port: 3000), DB type.
- **discord**: Token, prefix, status, invites, support (webhook, roles, owners).
- **topgg**: Vote page URL.

**DB Types**:
- `json`: File-based (easiest).
- `sql`: SQLite (local).
- `mysql`: Remote MySQL.
- `mongodb`: Cloud MongoDB.

---

## 📋 **Commands**

| Category     | Command               | Description                        | Permissions                 |
| ------------ | --------------------- | ---------------------------------- | --------------------------- |
| **Admin 👨‍💼**  | `/settings`           | Interactive guild setup dashboard. | ManageChannels, ManageGuild |
| **Misc 📊**   | `/help [command]`     | Bot info & command list.           | SendMessages                |
| **Misc 📊**   | `/invite`             | Invite bot links.                  | SendMessages                |
| **Misc 📊**   | `/ping`               | Bot latency/ping.                  | SendMessages                |
| **Owner 👑**  | `dbset <key> <value>` | Set DB value.                      | Owner IDs                   |
| **Owner 👑**  | `serverleave`         | Leave small guilds (<50 members).  | Owner IDs                   |
| **Owner 👑**  | `serverlist`          | Paginated server list.             | Owner IDs                   |
| **Ticket 🎫** | `/add @user`          | Add user to ticket.                | ManageChannels              |
| **Ticket 🎫** | `/claim`              | Claim ticket.                      | ManageChannels              |
| **Ticket 🎫** | `/close`              | Close ticket.                      | SendMessages                |
| **Ticket 🎫** | `/create`             | Create ticket.                     | SendMessages                |
| **Ticket 🎫** | `/delete`             | Delete ticket.                     | ManageChannels              |
| **Ticket 🎫** | `/open`               | Reopen ticket.                     | ManageChannels              |
| **Ticket 🎫** | `/rename <name>`      | Rename ticket.                     | ManageChannels              |
| **Ticket 🎫** | `/transcript`         | Generate HTML transcript.          | ManageChannels              |

**Prefix**: Configurable (default: empty for slash-only).

---

## 🗄 **Database Schema**

Guild data: `guild_${guildId}`

```js
{
  language: "en",
  prefix: "!",
  ticket_type: "Reason - Menu - UserTag",
  ticket_claim: true,
  admin_roles: ["roleId1"],
  modlog: "channelId",
  categories: { open: "catId", close: "catId" },
  panel: {
    channel: "channelId",
    menu_options: [{ label: "Support", value: "Support", emoji: "🎫" }]
  },
  tickets: [
    {
      channelId: "id",
      channelName: "ticket-user",
      user: "userId",
      newUser: "addedUserId",
      closed: false,
      claimed: "claimerId"
    }
  ]
}
```

Global: `totalCommandsUsed: number`

---

## 💻 **Dashboard**

- **Enabled**: `config.source.dashboard.on = true`
- **URL**: `http://localhost:3000` (configurable port/host)
- **Tech**: Express + EJS templates
- **Features**: Stats, commands, premium (WIP), invite
- **Views**: `/test`, 404 handler
- **Static**: CSS/JS in `/public`

---

## 🌐 **Localization**

- **Files**: `src/locales/{en,per}.json`
- **Default**: English
- **Per-Guild**: `/settings` → Language
- **Usage**: `client.languages[lang].commands.help.embed1.title`

---

## 🛡️ **Error Handling**

- **Anti-Crash**: `process.on('unhandledRejection')` → Webhook + Console.
- **Commands**: Permission/cooldown checks with styled errors.
- **Webhooks**: Bugs/status/reports to support threads.

---

## 🏃‍♂️ **Scripts**

| Script      | Usage                            |
| ----------- | -------------------------------- |
| `npm start` | Run bot.                         |
| `start.bat` | Auto `npm install && npm start`. |
| `npm test`  | Placeholder (no tests).          |

---

## 🤝 **Contributing**

1. Fork repo
2. Create branch: `git checkout -b feature/ticket-fix`
3. Commit: `git commit -m "Fix: ticket claim bug"`
4. Push: `git push origin feature/ticket-fix`
5. Open PR

**Guidelines**:
- ESLint + Prettier
- JSDoc comments
- Unit tests for functions
- Mention **Persian Caesar** in credits

---

## 📞 **Support**

- **Discord**: [Persian Caesar](https://discord.gg/xh2S2h67UW)
- **Report Bugs**: `/settings` → Report button (sends webhook).
- **Issues**: [GitHub Issues](https://github.com/Persian-Caesar/Ticker-Boy/issues)
- **Vote**: [Top.gg](https://top.gg/bot/1241112292616044695/vote)

---

## 📄 **License**

[BSD 3-Clause License](LICENSE)

**Copyright (c) 2021-2025, Sobhan-SRZA (mr.sinre) & Persian Caesar**

---

## 👥 **Credits**

- **Developer**: [Sobhan-SRZA (mr.sinre)](https://github.com/Sobhan-SRZA)
- **Team**: [Persian Caesar](https://dsc.gg/persian-caesar)
- **Libraries**: Discord.js, QuickDB, Express, discord-html-transcripts
- **Icons/Emotes**: Custom Persian Caesar theme

<div align="center">

**⭐ Star this repo if it helps!**  
**Built with ❤️ for Discord communities**

</div>
<div align="center">
  <a href="https://srza.ir" target="_blank">
   <img align="left" src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/social.png" alt="Sobhan-SRZA social" width=400px>
  </a>

  <a href="https://t.me/d_opa_mine" target="_blank">
   <img alt="Telegram"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/telegram-ch.svg"
    height="30" />
  </a>

  <a href="https://t.me/Sobhan_SRZA" target="_blank">
   <img alt="Telegram"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/telegram-ac.svg"
    height="30" />
  </a>

  <a href="https://www.instagram.com/mr.sinre?igsh=cWk1aHdhaGRnOGg%3D&utm_source=qr" target="_blank">
   <img alt="Instagram"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/instagram.svg"
    height="30" />
  </a>

  <a href="https://www.twitch.tv/sobhan_srza" target="_blank">
   <img alt="Twitch"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/twitch.svg"
    height="30" />
  </a>

  <a href="https://www.youtube.com/@mr_sinre?app=desktop&sub_confirmation=1" target="_blank">
   <img alt="YouTube"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/youtube.svg"
    height="30" />
  </a>
  
  <a href="https://github.com/Sobhan-SRZA" target="_blank">
   <img alt="Github"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/github.svg"
    height="30" />
  </a>
  
  <p align="left">
   <a href="https://discord.gg/xh2S2h67UW" target="_blank">
    <img src="https://discord.com/api/guilds/1054814674979409940/widget.png?style=banner2" alt="pc-development.png">
   </a>
  </p>

  <p align="right">
   <a href="https://discord.gg/54zDNTAymF" target="_blank">
    <img src="https://discord.com/api/guilds/1181764925874507836/widget.png?style=banner2" alt="pc-club.png">
   </a>
  </p>

  <div align="center">
   <a href="https://discord.com/users/865630940361785345" target="_blank">
    <img alt="My Discord Account" src="https://discord.c99.nl/widget/theme-1/865630940361785345.png" />
   </a>
    <a href="https://discord.com/users/986314682547716117" target="_blank" align="right">
    <img alt="Team Discord Account" src="https://discord.c99.nl/widget/theme-1/986314682547716117.png" />
   </a>
  </div>

 </div>

</div>

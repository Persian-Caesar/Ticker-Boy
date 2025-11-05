import {
  AfkDB,
  LanguageDB,
  PanelDB,
  PrefixDB,
  StationDB,
  StatusDB,
  TotalCommandsUsedDB
} from "../types/database";
import client from "../../index";

const database = (id?: string) => ({
  language: `language.${id}`,
  prefix: `prefix.${id}`,
  panel: `radioPanel.${id}`,
  afk: `radioAFK.${id}`,
  station: `radioStation.${id}`,
  status: `status.${id}`,
  totalCommandsUsed: "totalCommandsUsed"
})

const db = client.db!;
export default {

  // For language setting
  getLanguage: async function (id: string) {
    return (await db.get<LanguageDB>(database(id).language))
  },
  setLanguage: async function (id: string, data: LanguageDB) {
    return (await db.set<LanguageDB>(database(id).language, data))
  },
  deleteLanguage: async function (id: string) {
    return await db.delete(database(id).language);
  },

  // For prefix setting
  getPrefix: async function (id: string) {
    return (await db.get<PrefixDB>(database(id).prefix))
  },
  setPrefix: async function (id: string, data: PrefixDB) {
    return (await db.set<PrefixDB>(database(id).prefix, data))
  },
  deletePrefix: async function (id: string) {
    return await db.delete(database(id).language);
  },

  // For panel setting
  getPanel: async function (id: string) {
    return (await db.get<PanelDB>(database(id).panel))
  },
  setPanel: async function (id: string, data: PanelDB) {
    return (await db.set<PanelDB>(database(id).panel, data))
  },
  deletePanel: async function (id: string) {
    return await db.delete(database(id).panel);
  },

  // For afk setting
  getAfk: async function (id: string) {
    return (await db.get<AfkDB>(database(id).afk))
  },
  setAfk: async function (id: string, data: AfkDB) {
    return (await db.set<AfkDB>(database(id).afk, data))
  },
  deleteAfk: async function (id: string) {
    return await db.delete(database(id).afk);
  },

  // For station setting
  getStation: async function (id: string) {
    return (await db.get<StationDB>(database(id).station))
  },
  setStation: async function (id: string, data: StationDB) {
    return (await db.set<StationDB>(database(id).station, data))
  },
  deleteStation: async function (id: string) {
    return await db.delete(database(id).station);
  },

  // For status setting
  getStatus: async function (id: string) {
    return (await db.get<StatusDB>(database(id).status))
  },
  setStatus: async function (id: string, data: StatusDB) {
    return (await db.set<StatusDB>(database(id).status, data))
  },
  deleteStatus: async function (id: string) {
    return await db.delete(database(id).status);
  },

  // For totalCommandsUsed setting
  getTotalCommandsUsed: async function () {
    return (await db.get<TotalCommandsUsedDB>(database().totalCommandsUsed))
  },
  addTotalCommandsUsed: async function (data: TotalCommandsUsedDB) {
    return (await db.add(database().totalCommandsUsed, data))
  },
  setTotalCommandsUsed: async function (data: TotalCommandsUsedDB) {
    return (await db.set<TotalCommandsUsedDB>(database().totalCommandsUsed, data))
  },
  deleteTotalCommandsUsed: async function () {
    return await db.delete(database().totalCommandsUsed);
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
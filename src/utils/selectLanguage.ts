import { Language } from "../types/interfaces";
import config from "../../config";
import path from "path";
import fs from "fs";

export default function (language: string = config.discord.default_language) {
  const languagesPath = path.join(__dirname, "../storage/languages.json");
  const lg_list_file: Record<string, string> = JSON.parse(fs.readFileSync(languagesPath, "utf-8"));
  if (!language || typeof language === "undefined" || typeof language !== "string" || !(language in lg_list_file))
    language = config.discord.default_language;

  const selectedLanguage = path.join(__dirname, `../storage/locales/${language}.json`);
  const lg_file: Language = JSON.parse(fs.readFileSync(selectedLanguage, "utf-8"));

  return lg_file;
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
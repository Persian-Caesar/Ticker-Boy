import error from "../utils/error";

export default function (data: any) {
  try {
    const logstring = `${`[G]〢┃  ${"Perisan Caesar".green}`.yellow}${" 〢 ".magenta}`;
    if (typeof data == "string")
      console.log(
        logstring +
        data
          .split("\n")
          .map(d => `${d}`.green)
          .join(`\n${logstring}`)
      );

    else if (typeof data == "object")
      console.log(logstring + JSON.stringify(data, null, 3).green);

    else if (typeof data == "boolean")
      console.log(logstring + String(data).cyan);

    else
      console.log(logstring + data);
  }

  catch (e) {
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
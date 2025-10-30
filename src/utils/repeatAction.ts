import sleep from "../functions/sleep";
import error from "./error";

export default async function <T>(
  action: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 3_000 // 3 seconds
): Promise<T | undefined> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const result = await action();

      return result;
    }

    catch (e) {
      attempts++;
      if (attempts === maxAttempts)
        error(e);

      else
        await sleep(delayMs);
    }
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
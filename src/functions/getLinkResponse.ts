import config from "../../config";

export default async function (apiKey: keyof typeof config.api, endpoint?: string): Promise<any>;
export default async function (url: string, endpoint?: string): Promise<any> {
  try {
    if (url in config.api) {
      const api = config.api[url as keyof typeof config.api];
      url = api.url;
    }

    if (endpoint)
      url += endpoint;

    let data = await fetch(url, {
      headers: {
        Authorization: "Basic MDE1NDQ1NTM1NDU0NDU1MzU0RDY6"
      }
    }).then(res => res.json());

    return data;
  }

  catch (e) {
    console.error(e)
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
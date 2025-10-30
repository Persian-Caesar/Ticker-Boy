export default function (input: string) {
  const match = input.match(/^(\d+)(s|m|h|d)$/);
  if (!match)
    return null;

  const
    value = parseInt(match[1], 10),
    unit = match[2];

  switch (unit) {
    case "s": return value * 1000;

    case "m": return value * 60 * 1000;

    case "h": return value * 60 * 60 * 1000;

    case "d": return value * 24 * 60 * 60 * 1000;

    default: return null;
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
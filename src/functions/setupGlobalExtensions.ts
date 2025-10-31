/**
 * Adds custom methods to global prototypes (String, Array, Number)
 * This function should be called once at startup (in index.ts)
 */

export default function setupGlobalExtensions() {
    // Adding "toCapitalize" method to String
    if (!String.prototype.toCapitalize) {
        String.prototype.toCapitalize = function (): string {
            return String(this).toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
        };
    }

    // Adding "replaceValues" method to String
    if (!String.prototype.replaceValues) {
        String.prototype.replaceValues = function (object: Record<string, any>): string {
            let string = String(this);
            Object.keys(object).forEach(key => {
                string = string.replace(new RegExp(`\\{${key}\\}`, 'g'), object[key]);
            });
            return string;
        };
    }

    // Adding "HexToNumber" method to String
    if (!String.prototype.HexToNumber) {
        String.prototype.HexToNumber = function (): number {
            return parseInt(this.replace("#", ""), 16);
        };
    }

    // Adding "toCapitalize" method to String
    if (!String.prototype.toCapitalize) {
        String.prototype.toCapitalize = function (): string {
            return String(this).toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
        };
    }

    // Adding "random" method to Array
    if (!Array.prototype.random) {
        Array.prototype.random = function () {
            const array = Array.from(this);
            return array[Math.floor(Math.random() * array.length)];
        };
    }

    // Adding "replaceValues" method to String
    if (!String.prototype.replaceValues) {
        String.prototype.replaceValues = function (object: Record<string, any>): string {
            let string = String(this);
            Object
                .keys(object)
                .forEach(a => {
                    string = string.replace(`{${a}}`, object[a]);
                });

            return string;
        };
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
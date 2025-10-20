module.exports = class {

  /**
   * 
   * @param {import("quick.db").QuickDB} db 
   * @returns {void}
   */
  constructor(db) {
    this.db = db;
    return this;
  }

  /**
   * 
   * @param {string} name 
   * @returns {boolean}
   */
  async has(name) {
    if (await this.db.has(name))
      return true;

    else
      return false;
  }

  /**
   * 
   * @param {string} name 
   * @returns {any}
   */
  async get(name) {
    if (await this.db.has(name))
      return await this.db.get(name);

    else
      return false;
  }

  /**
   * 
   * @param {string} name 
   * @param {any} input 
   * @returns {any}
   */
  async set(name, input) {
    return await this.db.set(name, input);
  }

  /**
   * 
   * @param {string} name 
   * @param {any} input 
   * @returns {any}
   */
  async push(name, input) {
    return await this.db.push(name, input);
  }

  /**
   * 
   * @param {string} name 
   * @param {any} input 
   * @returns {any}
   */
  async poll(name, input) {
    return await this.db.poll(name, input);
  }

  /**
   * 
   * @param {string} name 
   * @param {number} input 
   * @returns {any}
   */
  async add(name, input) {
    return await this.db.add(name, input);
  }

  /**
   * 
   * @param {string} name 
   * @param {any} input 
   * @returns {any}
   */
  async sub(name, input) {
    return await this.db.poll(name, input);
  }

  /**
   * 
   * @param {string} name 
   * @returns {any}
   */
  async delete(name) {
    return await this.db.delete(name);
  }

  /**
   * 
   * @returns {any}
   */
  async deleteAll() {
    return await this.db.deleteAll();
  }

  /**
   * 
   * @returns {any}
   */
  async all() {
    return await this.db.all();
  }
}
/**
 * @copyright
 * Coded by Sobhan-SRZA and Aria Fendereski | https://github.com/Sobhan-SRZA | https://github.com/ariafi
 * @copyright
 * Work for Vixium Team | https://discord.gg/vefvUNyPQu
 * @copyright
 */
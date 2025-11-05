import { QuickDB } from "quick.db";

interface DatabaseMethods<T = any> {
  has(name: string): Promise<boolean>;
  get<T>(name: string): Promise<T | undefined>;
  set<T>(name: string, input: T): Promise<T>;
  delete(name: string): Promise<number>;
}

export default class implements DatabaseMethods {

  db: QuickDB;
  constructor(db: QuickDB) {
    this.db = db;

    return this;
  }

  async has(name: string) {
    return await this.db.has(name);
  }

  async get<T>(name: string) {
    return (await this.db.get(name)) as T || undefined;
  }

  async set<T>(name: string, input: T) {
    return await this.db.set(name, input);
  }

  async push<T>(name: string, input: T | T[]) {
    return await this.db.push(name, input);
  }


  async pull<T>(name: string, input: T | T[]) {
    return await this.db.pull(name, input);
  }

  async add(name: string, input: number) {
    return await this.db.add(name, input);
  }

  async sub(name: string, input: number) {
    return await this.db.sub(name, input);
  }

  async delete(name: string) {
    return await this.db.delete(name);
  }

  async deleteAll() {
    return await this.db.deleteAll();
  }

  async all() {
    return await this.db.all();
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
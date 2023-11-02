import { Client } from 'pg';
import client from '../database';
import ISite from '../@types/site.type';

class SiteRepositorie {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async findAll(columns?: (keyof ISite)[]) {
    const columnsQuery = columns ? columns.join(', ') : '*';
    const { rows } = await this.client.query(`SELECT ${columnsQuery} FROM sites`);
    return rows as ISite[];
  }

  async create({ title, description, url, favicon_url }: Omit<ISite, 'id'>) {
    const {
      rows: [row],
    } = await this.client.query(
      `
      INSERT INTO sites(title, description, url, favicon_url)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `,
      [title, description, url, favicon_url]
    );

    return row as ISite[];
  }
}

export default new SiteRepositorie(client);

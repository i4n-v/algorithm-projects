import { Client } from 'pg';
import client from '../database';
import ILink from '../@types/link.type';

class SiteRepositorie {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async create({ origin_id, destiny_id }: Omit<ILink, 'id'>) {
    const {
      rows: [row],
    } = await this.client.query(
      `
      INSERT INTO links(origin_id, destiny_id)
      VALUES($1, $2)
      RETURNING *
    `,
      [origin_id, destiny_id]
    );

    return row as ILink;
  }
}

export default new SiteRepositorie(client);

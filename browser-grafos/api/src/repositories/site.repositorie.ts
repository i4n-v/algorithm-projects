import { Client } from 'pg';
import client from '../database';
import ISite from '../@types/site.type';
import ISearch from '../@types/search.type';

class SiteRepositorie {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async findAll() {
    const { rows } = await this.client.query(`
      SELECT
      origin.*,
      (
        CASE
          WHEN COUNT(destiny.id) = 0 THEN null
          ELSE ARRAY_TO_JSON(
            ARRAY_AGG(
              JSON_BUILD_OBJECT(
                'id',
                destiny.id,
                'title',
                destiny.title,
                'description',
                destiny.description,
                'url',
                destiny.url,
                'favicon_url',
                destiny.favicon_url
              )
            )
          )
        END
      ) AS links
      FROM
        sites AS origin
        LEFT JOIN links AS link ON link.origin_id = origin.id
        LEFT JOIN sites AS destiny ON link.destiny_id = destiny.id
      GROUP BY
        origin.id,
        origin.url,
        origin.favicon_url,
        origin.title,
        origin.description;
    `);

    const filteredRows: ISearch[] = [];

    rows.forEach((row) => {
      const isInRows = filteredRows.some((filteredRow) => {
        if (filteredRow.id === row.id) {
          return true;
        }

        if (filteredRow.links) {
          return filteredRow.links.some((link) => link.id === row.id);
        }

        return false;
      });

      if (!isInRows) {
        filteredRows.push(row);
      }
    });

    return filteredRows;
  }

  async create({ title, description, url, favicon_url }: Omit<ISite, 'id' | 'links'>) {
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

    return row as ISite;
  }
}

export default new SiteRepositorie(client);

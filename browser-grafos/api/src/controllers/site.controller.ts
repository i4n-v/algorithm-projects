import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import SiteRepositorie from '../repositories/site.repositorie';
import Tree from '../utils/tree';

class SiteController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { query } = request;
      const search = query.search;

      // if (!(typeof search === 'string')) {
      //   return response
      //     .status(400)
      //     .json({ message: 'O parâmetro de busca deve ser especificado.' });
      // }

      const storagedSites = await SiteRepositorie.findAll();
      // const tree = new Tree();
      // tree.bulkInsert(storagedSites);

      // const nodes = tree.searchAll(search);
      // const sites = nodes.map((node) => node.value);

      // return response.json(sites);
      return response.json(storagedSites);
    } catch (error) {
      next(error);
    }
  }
}

export default new SiteController();

import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

class BrowserController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ path: 'browser', active: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new BrowserController();

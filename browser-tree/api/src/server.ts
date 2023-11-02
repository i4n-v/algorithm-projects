import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import errorHandlerMidleWare from './midlewares/errorHandler.midleware';
import crawler from './crowler';

async function initApp() {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(routes);
    app.use(errorHandlerMidleWare);

    if (process.env.RUN_CRAWLER === 'true') {
      await crawler();
    }

    app.listen(process.env.APP_PORT, () => {
      console.log(`🔥 Server started at http://localhost:${process.env.APP_PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.log('❗ The server cannot be started');
  }
}

initApp();

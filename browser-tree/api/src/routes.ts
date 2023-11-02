import router from './config/router.config';
import BrowserController from './controllers/browser.controller';

router.get('/', BrowserController.index);

export default router;

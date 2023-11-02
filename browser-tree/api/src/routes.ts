import router from './config/router.config';
import SiteController from './controllers/site.controller';
import ServerController from './controllers/server.controller';

router.get('/', ServerController.index);
router.get('/sites', SiteController.index);

export default router;

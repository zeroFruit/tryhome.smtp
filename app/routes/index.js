import mailController from '../controllers/index';
import logMiddleware from '../middlewares/log';
import messageBuilderMiddleware from '../middlewares/messageBuilder';

module.exports = app => {
  app.post('/mail', logMiddleware.logShoppingList, messageBuilderMiddleware.build, mailController.sendMail);
}

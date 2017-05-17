import '../config/env/env';

import request from 'request';
import logger from '../config/logger';

const logShoppingList = (req, res, next) => {
  let { customer, items } = req.body;
  const requestOptions = {
    url: `${process.env.SERVER_URL}/api/shoppinglist`,
    method: 'POST',
    json: true,
    body: { customer, items }
  };

  request(requestOptions, (err, response, body) => {
    if(err) {
      logger.log('error', '[middleware/logShoppingList]', err);
      return res.send(err);
    }
    req.body.shoppinglist = response.body.data;
    next();
  })
}

module.exports = {
  logShoppingList
}

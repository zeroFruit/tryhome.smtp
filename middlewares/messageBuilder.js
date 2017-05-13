import {
  emailSubjectBuilder,
  emailBodyBuilder,
  ordersKey2Kor,
  customerKey2Kor
} from '../helpers/helper';
import mailConfig from '../config/mailConfig.json';

const build = (req, res, next) => {
  let { customer } = req.body;
  let { list: { orders, orderId } } = req.body.shoppinglist;
  let _customer = customerKey2Kor(customer);
  let _orders = ordersKey2Kor(orders);
  
  req.body.receivers = mailConfig.username;
  req.body.subject = emailSubjectBuilder(_customer);
  req.body.html = emailBodyBuilder(_orders, _customer, orderId);
  next();
}

module.exports = {
  build
}

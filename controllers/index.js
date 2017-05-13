import nodeMailer from 'nodemailer';
import xoauth2    from 'xoauth2';
import logger from '../config/logger';
import mailConfig from '../config/mailConfig.json';
import {
  responseByCode,
  responseByCodeWithData
} from '../helpers/response';
import Code from '../config/responseCode';

const transporter = nodeMailer.createTransport({
  service: mailConfig.service,
  auth: {
    type: 'OAuth2',
    user:         mailConfig.username,
    clientId:     mailConfig.clientId,
    clientSecret: mailConfig.clientSecret,
    refreshToken: mailConfig.refreshToken
  }
});

const sendMail = (req, res) => {
  let mailOptions = {
    from: `${mailConfig.username}`,
    to: req.body.receivers,
    subject: req.body.subject,
    html: req.body.html
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.log('error', '[controller/sendMail]', err);
      return responseByCode(res, Code.POST_FAIL, 400);
    }
    logger.log('info', '[controller/sendMail]');
    return responseByCodeWithData(res, Code.POST_SUCCESS, 200, { list: req.body.shoppinglist.list });
  })
}

module.exports = {
  sendMail
}

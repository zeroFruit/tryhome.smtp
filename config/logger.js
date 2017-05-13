import winston from 'winston';
import moment from 'moment-timezone';

const logTimeStamp = () => {
  return moment().tz('Asia/Tokyo').format('YYYY-MM-DD HH:mm:ss');
}

const logFormatter = (options) => {
  return `${logTimeStamp()} ${options.level.toUpperCase()} ${options.message ? options.message : ''}`;
}
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      formatter: (options) => logFormatter(options)
    }),
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'filelog-info.log',
      level: 'info',
      formatter: (options) => logFormatter(options)
    }),
    new(winston.transports.File)({
      name: 'error-file',
      filename: 'filelog-error.log',
      level: 'error',
      formatter: (options) => logFormatter(options)
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'filelog-exception.log'
    }),
    new winston.transports.Console({
      formatter: (options) => logFormatter(options)
    })
  ]
});


module.exports = logger;

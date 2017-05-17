import './config/env/env';

import express from 'express';
import logger from './config/logger';
import bodyParser from 'body-parser';
import cors from 'cors';

const env = (process.env.NODE_ENV || 'development').trim();
const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(bodyParser.json());

const Router = require('./routes/index')(app);

app.listen(port, () => {
  logger.log('info', `env: ${env}, port: ${port}`);
});

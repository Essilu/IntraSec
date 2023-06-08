import 'dotenv/config';
import express from 'express';
import logger from 'morgan';

import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';

import { index } from './routes/index';

export const app = express();

app.set('port', process.env.PORT ?? 5050);

app.use(logger('dev'));

app.use('/', index);

app.use(errorNotFoundHandler);
app.use(errorHandler);

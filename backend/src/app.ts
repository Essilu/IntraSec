import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import logger from 'morgan';
import passport from 'passport';

import 'express-async-errors';

import { db } from './database';
import { errorHandler, errorNotFoundHandler } from './middlewares/errorHandler';

import { router } from './routes';

export const app = express();

app.set('port', process.env.PORT ?? 5050);

app.use(helmet()); // Secure the app against common web vulnerabilities
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 15 * 24 * 3600 * 1000, // 15 days
  },
  store: new PrismaSessionStore(db, { checkPeriod: 2 * 60 * 1000 }),
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', router);

app.use(errorNotFoundHandler);
app.use(errorHandler);

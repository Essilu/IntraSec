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

app.set('port', process.env.PORT ?? 5050); // Set the port for the app

app.use(helmet()); // Secure the app against common web vulnerabilities
app.use(logger('dev')); // Use morgan logger middleware for logging HTTP requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })); // Enable CORS with the specified frontend URL
app.use(
  session({
    secret: process.env.SESSION_SECRET!, // Secret used to sign the session ID cookie
    resave: false, // Do not save the session if it was not modified
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 15 * 24 * 3600 * 1000, // 15 days in milliseconds
    },
    // Store sessions in the database using PrismaSessionStore
    store: new PrismaSessionStore(db, { checkPeriod: 2 * 60 * 1000 }),
  }),
);
app.use(passport.initialize()); // Initialize Passport authentication
app.use(passport.session()); // Use Passport session middleware

app.use('/', router); // Mount the router middleware to handle routes

app.use(errorNotFoundHandler); // Error handler for 404 Not Found
app.use(errorHandler); // General error handler

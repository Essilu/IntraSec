import { Router } from 'express';
import * as auth from './controllers/auth';
import * as transactions from './controllers/transactions';
import * as users from './controllers/users';
import ensureAuthenticated from './middlewares/ensureAuthenticated';

export const router = Router();

// API root
router.get('/', (_req, res) => {
  res.json({ message: "Welcome to WashConnect! There's nothing here..." });
});

// Authentication
router.post('/auth/login', auth.logIn, ensureAuthenticated, auth.me);
router.get('/auth/me', ensureAuthenticated, auth.me);
router.post('/auth/logout', ensureAuthenticated, auth.logOut);

// Users
router.route('/users')
  .get(ensureAuthenticated, users.findAll)
  .post(ensureAuthenticated, users.create);

router.route('/users/:id')
  .get(ensureAuthenticated, users.findOne)
  .patch(ensureAuthenticated, users.update)
  .delete(ensureAuthenticated, users.remove);

// Transactions
router.route('/transactions')
  .get(ensureAuthenticated, transactions.findAll)
  .post(ensureAuthenticated, transactions.create);

router.route('/transactions/:id')
  .get(ensureAuthenticated, transactions.findOne)
  .patch(ensureAuthenticated, transactions.update)
  .delete(ensureAuthenticated, transactions.remove);


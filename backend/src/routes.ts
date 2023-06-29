import { Router } from 'express';
import * as auth from './controllers/auth';
import * as comments from './controllers/comments';
import * as posts from './controllers/posts';
import * as roles from './controllers/roles';
import * as transactions from './controllers/transactions';
import * as users from './controllers/users';
import isAuthenticated from './middlewares/isAuthenticated';
import { isAuthorized } from './middlewares/isAuthorized';
import {
  PermissionSubject,
  RolePermissions,
  TransactionPermissions,
  UserPermissions,
} from './utils/permissions';

export const router = Router();

// API root
router.get('/', (_req, res) => {
  res.json({ message: "Welcome to IntraSec! There's nothing here..." });
});

// Authentication
router.post('/auth/login', auth.logIn, isAuthenticated, auth.me);
router.get('/auth/me', isAuthenticated, auth.me);
router.post('/auth/logout', isAuthenticated, auth.logOut);

// Users
router
  .route('/users')
  .get(
    isAuthenticated,
    isAuthorized(UserPermissions.ReadUser, PermissionSubject.User),
    users.findAll,
  )
  .post(
    isAuthenticated,
    isAuthorized(UserPermissions.ReadUser, PermissionSubject.User),
    users.create,
  );

router
  .route('/users/:id')
  .get(
    isAuthenticated,
    isAuthorized(UserPermissions.ReadUser, PermissionSubject.User),
    users.findOne,
  )
  .patch(
    isAuthenticated,
    isAuthorized(UserPermissions.UpdateUser, PermissionSubject.User),
    users.update,
  )
  .delete(
    isAuthenticated,
    isAuthorized(UserPermissions.DeleteUser, PermissionSubject.User),
    users.remove,
  );

// Transactions
router
  .route('/transactions')
  .get(
    isAuthenticated,
    isAuthorized(TransactionPermissions.ReadTransaction, PermissionSubject.Transaction),
    transactions.findAll,
  )
  .post(
    isAuthenticated,
    isAuthorized(TransactionPermissions.CreateTransaction, PermissionSubject.Transaction),
    transactions.create,
  );

router
  .route('/transactions/:id')
  .get(
    isAuthenticated,
    isAuthorized(TransactionPermissions.ReadTransaction, PermissionSubject.Transaction),
    transactions.findOne,
  )
  .patch(
    isAuthenticated,
    isAuthorized(TransactionPermissions.UpdateTransaction, PermissionSubject.Transaction),
    transactions.update,
  )
  .delete(
    isAuthenticated,
    isAuthorized(TransactionPermissions.DeleteTransaction, PermissionSubject.Transaction),
    transactions.remove,
  );

// Roles
router
  .route('/roles')
  .get(
    isAuthenticated,
    isAuthorized(RolePermissions.ReadRole, PermissionSubject.Role),
    roles.findAll,
  )
  .post(
    isAuthenticated,
    isAuthorized(RolePermissions.CreateRole, PermissionSubject.Role),
    roles.create,
  );

router
  .route('/roles/:id')
  .get(
    isAuthenticated,
    isAuthorized(RolePermissions.ReadRole, PermissionSubject.Role),
    roles.findOne,
  )
  .patch(
    isAuthenticated,
    isAuthorized(RolePermissions.UpdateRole, PermissionSubject.Role),
    roles.update,
  )
  .delete(
    isAuthenticated,
    isAuthorized(RolePermissions.DeleteRole, PermissionSubject.Role),
    roles.remove,
  );

// Posts
router
  .route('/posts')
  .get(isAuthenticated, posts.findAll)
  .post(isAuthenticated, posts.create);

router
  .route('/posts/:id')
  .get(isAuthenticated, posts.findOne)
  .patch(isAuthenticated, posts.update)
  .delete(isAuthenticated, posts.remove);

// Comments
router
  .route('/posts/:postId/comments')
  .get(isAuthenticated, comments.findAll)
  .post(isAuthenticated, comments.create);

router
  .route('/posts/:postId/comments/:id')
  .get(isAuthenticated, comments.findOne)
  .patch(isAuthenticated, comments.update)
  .delete(isAuthenticated, comments.remove);

import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from './database';

// Configure the local strategy for passport authentication
passport.use(
  'local',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (emailOrUsername, password, done) => {
      try {
        // Find the user by email or username in the database
        const user = await db.user.findFirst({
          where: { email: emailOrUsername },
          include: { roles: true },
        });

        if (!user) {
          // User not found
          done(null, false, { message: 'Unknown user.' });
          return;
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          // Passwords do not match
          done(null, false, { message: 'Unknown user.' });
          return;
        }

        // Authentication successful
        done(null, user);
      } catch (error) {
        // Error occurred during authentication
        done(error);
      }
    },
  ),
);

// Serialize the user into a session
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser((id: number, done) => {
  db.user
    .findUnique({ where: { id }, include: { roles: true } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

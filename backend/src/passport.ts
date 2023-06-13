import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from './database';

passport.use('local', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (emailOrUsername, password, done) => {
    const user = await db.user.findFirst({
      where: { email: emailOrUsername },
    });

    if (!user) {
      done(null, false, { message: 'Unknown user.' });
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      done(null, user);
      return;
    }
    done(null, false, { message: 'Unknown user.' });
  },
));

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  db.user.findUnique({ where: { id } })
    .then((user) => { done(null, user); })
    .catch((err) => { done(err); });
});

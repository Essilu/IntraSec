import type { User } from '@prisma/client';

// Return the user but without the password
export function safeUser(user: User): Omit<User, 'password'> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

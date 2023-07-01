import bcrypt from 'bcrypt';
import type { Response } from 'express';
import { db } from '../database';
import { safeUser } from '../utils/safeUser';
import type { Request } from '../utils/types';
import {
  changeRole,
  createUser,
  findOneUser,
  updateUser,
} from '../validators/users';

// Creates a new user
export async function create(req: Request, res: Response): Promise<void> {
  const data = createUser.parse(req.body);

  const existingUser = await db.user.findFirst({
    where: { email: data.email },
  });

  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const password = await bcrypt.hash(data.password, 10);
  const user = await db.user.create({
    data: {
      ...data,
      roles: {
        connect: [{ name: 'user' }],
      },
      password,
    },
  });

  res.status(201).json(safeUser(user));
}

// Retrieves all users
export async function findAll(req: Request, res: Response): Promise<void> {
  const users = await db.user.findMany({ include: { roles: true } });

  res.status(200).json(users.map(safeUser));
}

// Retrieves a specific user by their ID
export async function findOne(req: Request, res: Response): Promise<void> {
  const { id: userId } = findOneUser.parse(req.params);

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { roles: true },
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(safeUser(user));
}

// Updates a specific user by their ID
export async function update(req: Request, res: Response): Promise<void> {
  const { id: userId } = findOneUser.parse(req.params);

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { roles: true },
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const data = updateUser.parse(req.body);

  const updatedUser = await db.user.update({
    where: { id: userId },
    data,
  });

  res.status(200).json(safeUser(updatedUser));
}

// Removes a specific user by their ID
export async function remove(req: Request, res: Response): Promise<void> {
  const { id: userId } = findOneUser.parse(req.params);

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (user.email === process.env.ADMIN_EMAIL) {
    res.status(403).json({ message: 'Cannot delete admin user' });
    return;
  }

  await db.user.delete({
    where: { id: userId },
  });

  res.status(204).json();
}


// Add roles to a user by their ID
export async function updateRole(req: Request, res: Response, action: 'connect' | 'disconnect'): Promise<void> {
  // 1. Parse the user params input
  const { id: userId } = findOneUser.parse(req.params);

  // 2. Find the user by their ID
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { roles: true },
  });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  if (user.email === process.env.ADMIN_EMAIL) {
    res.status(403).json({ message: 'Cannot change admin user' });
    return;
  }

  // 3. Parse the user body input
  const { roles: roleIds } = changeRole.parse(req.body);

  // 4. Find the roles by their IDs
  const roles = await db.role.findMany({
    where: { id: { in: roleIds } },
    select: { id: true },
  });
  if (roles.length === 0) {
    res.status(400).json({ message: 'No valid role given' });
    return;
  }

  // 5.a If we want to disconnect, check that we aren't removing the last role of the user
  if (action === 'disconnect' && user.roles.length === roles.length) {
    res.status(400).json({ message: 'Cannot remove last role of the user' });
    return;
  }

  // 5.b Update the user with the new roles
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      roles: { [action]: roles },
    },
    include: { roles: true },
  });

  // 6. Return the updated user
  res.status(200).json(safeUser(updatedUser));
}

// Add roles to a user by their ID
export async function addRole(req: Request, res: Response): Promise<void> {
  await updateRole(req, res, 'connect');
}

// Remove roles from a user by their ID
export async function removeRole(req: Request, res: Response): Promise<void> {
  await updateRole(req, res, 'disconnect');
}

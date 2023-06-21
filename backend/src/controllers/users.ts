import bcrypt from 'bcrypt';
import type { Response } from 'express';
import { db } from '../database';
import { safeUser } from '../utils/safeUser';
import type { Request } from '../utils/types';
import { createUser, findOneUser, updateUser } from '../validators/users';

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

export async function findAll(req: Request, res: Response): Promise<void> {
  const users = await db.user.findMany();

  res.status(200).json(users);
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const { id: userId } = findOneUser.parse(req.params);

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(safeUser(user));
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id: userId } = findOneUser.parse(req.params);

  const user = await db.user.findUnique({
    where: { id: userId },
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

export async function remove(req: Request, res: Response): Promise<void> {
  const { id: userId } = findOneUser.parse(req.params);

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  await db.user.delete({
    where: { id: userId },
  });

  res.status(204).json();
}

import type { Response } from 'express';
import { db } from '../database';
import type { Request } from '../utils/types';
import {
  createRole,
  findOneRole,
  updateRole,
} from '../validators/roles';

// Creates a new role
export async function create(req: Request, res: Response): Promise<void> {
  const data = createRole.parse(req.body);

  const role = await db.role.create({ data: { ...data, builtIn: false } });

  res.status(201).json(role);
}

// Retrieves all roles
export async function findAll(req: Request, res: Response): Promise<void> {
  const roles = await db.role.findMany();

  res.status(200).json(roles);
}

// Retrieves a specific role by its ID
export async function findOne(req: Request, res: Response): Promise<void> {
  const { id: roleId } = findOneRole.parse(req.params);

  const role = await db.role.findUnique({ where: { id: roleId } });

  if (!role) {
    res.status(404).json({ message: 'Role not found' });
    return;
  }

  res.status(200).json(role);
}

// Updates a specific role by its ID
export async function update(req: Request, res: Response): Promise<void> {
  const { id: roleId } = findOneRole.parse(req.params);

  const role = await db.role.findUnique({ where: { id: roleId } });

  if (!role) {
    res.status(404).json({ message: 'Role not found' });
    return;
  }

  const data = updateRole.parse(req.body);

  const updatedRole = await db.role.update({
    where: { id: roleId },
    data,
  });

  res.status(200).json(updatedRole);
}

// Removes a specific role by its ID
export async function remove(req: Request, res: Response): Promise<void> {
  const { id: roleId } = findOneRole.parse(req.params);

  const role = await db.role.findUnique({ where: { id: roleId } });

  if (!role) {
    res.status(404).json({ message: 'Role not found' });
    return;
  }

  if (role.builtIn) {
    res.status(403).json({ message: 'Cannot delete built-in role' });
    return;
  }

  await db.role.delete({ where: { id: roleId } });

  res.status(204).json();
}

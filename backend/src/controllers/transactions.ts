import type { NextFunction, Response } from 'express';
import { db } from '../database';
import type { Request } from '../utils/types';
import { validate } from '../utils/validate';
import { createTransaction, findOneTransaction, updateTransaction } from '../validators/transactions';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(createTransaction, req.body);
  if (!success) {
    next(error);
    return;
  }

  const transaction = await db.transaction.create({ data });

  res.status(201).json(transaction);
}

export async function findAll(req: Request, res: Response): Promise<void> {
  const transactions = await db.transaction.findMany();

  res.status(200).json(transactions);
}

export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(findOneTransaction, req.params);
  if (!success) {
    next(error);
    return;
  }

  const transaction = await db.transaction.findUnique({
    where: { id: data.id },
  });

  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
    return;
  }

  res.status(200).json(transaction);
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(findOneTransaction, req.params);
  if (!success) {
    next(error);
    return;
  }

  const transaction = await db.transaction.findUnique({
    where: { id: data.id },
  });

  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
    return;
  }

  const { success: successBody, data: dataBody, error: errorBody } = validate(updateTransaction, req.body);
  if (!successBody) {
    next(errorBody);
    return;
  }

  const updatedTransaction = await db.transaction.update({
    where: { id: data.id },
    data: dataBody,
  });

  res.status(200).json(updatedTransaction);
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(findOneTransaction, req.params);
  if (!success) {
    next(error);
    return;
  }

  const transaction = await db.transaction.findUnique({
    where: { id: data.id },
  });

  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
    return;
  }

  await db.transaction.delete({
    where: { id: data.id },
  });

  res.status(201).json();
}

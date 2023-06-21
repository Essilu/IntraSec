import type { Response } from 'express';
import { db } from '../database';
import type { Request } from '../utils/types';
import { createTransaction, findOneTransaction, updateTransaction } from '../validators/transactions';

export async function create(req: Request, res: Response): Promise<void> {
  const data = createTransaction.parse(req.body);

  const transaction = await db.transaction.create({ data });

  res.status(201).json(transaction);
}

export async function findAll(req: Request, res: Response): Promise<void> {
  const transactions = await db.transaction.findMany();

  res.status(200).json(transactions);
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const { id: transactionId } = findOneTransaction.parse(req.params);

  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
    return;
  }

  res.status(200).json(transaction);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id: transactionId } = findOneTransaction.parse(req.params);

  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
    return;
  }

  const data = updateTransaction.parse(req.body);

  const updatedTransaction = await db.transaction.update({
    where: { id: transactionId },
    data,
  });

  res.status(200).json(updatedTransaction);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { id: transactionId } = findOneTransaction.parse(req.params);

  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    res.status(404).json({ message: 'Transaction not found' });
    return;
  }

  await db.transaction.delete({
    where: { id: transactionId },
  });

  res.status(204).json();
}

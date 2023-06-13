import type { NextFunction, Response } from 'express';
import { db } from '../database';
import type { Request } from '../utils/types';
import { validate } from '../utils/validate';
import { createPost, findOnePost, updatePost } from '../validators/posts';

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(createPost, req.body);
  if (!success) {
    next(error);
    return;
  }

  const post = await db.post.create({
    data: {
      ...data,
      author: {
        connect: { id: req.user!.id },
      },
    },
  });

  res.status(201).json(post);
}

export async function findAll(req: Request, res: Response): Promise<void> {
  const posts = await db.post.findMany();

  res.status(200).json(posts);
}

export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(findOnePost, req.params);
  if (!success) {
    next(error);
    return;
  }

  const post = await db.post.findUnique({
    where: { id: data.id },
  });

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  res.status(200).json(post);
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(findOnePost, req.params);
  if (!success) {
    next(error);
    return;
  }

  const post = await db.post.findUnique({
    where: { id: data.id },
  });

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const { success: successBody, data: dataBody, error: errorBody } = validate(updatePost, req.body);
  if (!successBody) {
    next(errorBody);
    return;
  }

  const updatedPost = await db.post.update({
    where: { id: data.id },
    data: dataBody,
  });

  res.status(200).json(updatedPost);
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { success, data, error } = validate(findOnePost, req.params);
  if (!success) {
    next(error);
    return;
  }

  const post = await db.post.findUnique({
    where: { id: data.id },
  });

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  await db.post.delete({
    where: { id: data.id },
  });

  res.status(201).json();
}

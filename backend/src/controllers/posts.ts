import type { Response } from 'express';
import { db } from '../database';
import { safeUser } from '../utils/safeUser';
import type { Request } from '../utils/types';
import {
  createPost,
  findManyPosts,
  findOnePost,
  updatePost,
} from '../validators/posts';

export async function create(req: Request, res: Response): Promise<void> {
  const data = createPost.parse(req.body);

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
  const { kind } = findManyPosts.parse(req.query);

  const posts = await db.post.findMany({
    where: { kind },
    include: { author: true },
  });

  res.status(200).json(posts.map(post => ({ ...post, author: safeUser(post.author) })));
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const { id: postId } = findOnePost.parse(req.params);

  const post = await db.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  res.status(200).json({ ...post, author: safeUser(post.author) });
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id: postId } = findOnePost.parse(req.params);

  const post = await db.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const data = updatePost.parse(req.body);

  const updatedPost = await db.post.update({
    where: { id: postId },
    data,
  });

  res.status(200).json(updatedPost);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { id: postId } = findOnePost.parse(req.params);

  const post = await db.post.findUnique({ where: { id: postId } });

  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  await db.post.delete({ where: { id: postId } });

  res.status(204).json();
}

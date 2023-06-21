import type { Response } from 'express';
import { db } from '../database';
import { safeUser } from '../utils/safeUser';
import type { Request } from '../utils/types';
import {
  createComment,
  findOneCommentWithPost,
  findOnePost,
  updateComment,
} from '../validators/comments';

export async function create(req: Request, res: Response): Promise<void> {
  const { postId } = findOnePost.parse(req.params);

  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const data = createComment.parse(req.body);

  const comment = await db.comment.create({
    data: {
      ...data,
      author: {
        connect: { id: req.user!.id },
      },
      post: {
        connect: { id: postId },
      },
    },
  });

  res.status(201).json(comment);
}

export async function findAll(req: Request, res: Response): Promise<void> {
  const { postId } = findOnePost.parse(req.params);

  const posts = await db.post.findUnique({ where: { id: postId } });
  if (!posts) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const comments = await db.comment.findMany({
    where: { postId },
    include: { author: true },
  });

  res.status(200).json(comments.map(comment => ({ ...comment, author: safeUser(comment.author) })));
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const { id: commentId, postId } = findOneCommentWithPost.parse(req.params);

  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const comment = await db.comment.findUnique({
    where: { id: commentId },
    include: { author: true },
  });
  if (!comment) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }

  res.status(200).json({ ...comment, author: safeUser(comment.author) });
}

export async function update(req: Request, res: Response): Promise<void> {
  const { id: commentId, postId } = findOneCommentWithPost.parse(req.params);

  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  const data = updateComment.parse(req.body);

  const comment = await db.comment.update({
    where: { id: commentId },
    data,
  });

  res.status(200).json(comment);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const { id: commentId, postId } = findOneCommentWithPost.parse(req.params);

  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  await db.comment.delete({ where: { id: commentId } });

  res.status(204).end();
}

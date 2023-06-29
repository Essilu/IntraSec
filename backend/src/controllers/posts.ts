import type { Response } from 'express';
import { db } from '../database';
import { assertPostPermission } from '../middlewares/isAuthorized';
import { GenericAction } from '../utils/permissions';
import { safeUser } from '../utils/safeUser';
import type { Request } from '../utils/types';
import {
  createPost,
  findManyPosts,
  findOnePost,
  updatePost,
} from '../validators/posts';

// Creates a new post
export async function create(req: Request, res: Response): Promise<void> {
  // 1. Parse the user body input
  const data = createPost.parse(req.body);

  // 2. Check if the user has permission to create the post
  assertPostPermission(req.user!, GenericAction.Create, data.kind);

  // 3. Create the post
  const post = await db.post.create({
    data: {
      ...data,
      author: {
        connect: { id: req.user!.id },
      },
    },
  });

  // 4. Return the post
  res.status(201).json(post);
}

// Retrieves all posts based on the provided query parameters
export async function findAll(req: Request, res: Response): Promise<void> {
  // 1. Parse the user query input
  const { kind } = findManyPosts.parse(req.query);

  // 2. Check if the user has permission to read posts of the given kind
  assertPostPermission(req.user!, GenericAction.Read, kind);

  // 3. Retrieve the posts
  const posts = await db.post.findMany({
    where: { kind },
    include: { author: true },
  });

  // 4. Return the posts
  res
    .status(200)
    .json(posts.map(post => ({ ...post, author: safeUser(post.author) })));
}

// Retrieves a specific post by its ID
export async function findOne(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { id: postId } = findOnePost.parse(req.params);

  // 2. Retrieve the post
  const post = await db.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the user has permission to read the post
  assertPostPermission(req.user!, GenericAction.Read, post);

  // 4. Return the post
  res.status(200).json({ ...post, author: safeUser(post.author) });
}

// Updates a specific post by its ID
export async function update(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { id: postId } = findOnePost.parse(req.params);

  // 2. Retrieve the post
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the user has permission to update the post
  assertPostPermission(req.user!, GenericAction.Update, post);

  // 4. Parse the user body input
  const data = updatePost.parse(req.body);

  // 5. Update the post
  const updatedPost = await db.post.update({
    where: { id: postId },
    data,
  });

  // 6. Return the post
  res.status(200).json(updatedPost);
}

// Removes a specific post by its ID
export async function remove(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { id: postId } = findOnePost.parse(req.params);

  // 2. Retrieve the post
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the user has permission to delete the post
  assertPostPermission(req.user!, GenericAction.Delete, post);

  // 4. Delete the post
  await db.post.delete({ where: { id: postId } });

  // 5. Return an empty response
  res.status(204).json();
}

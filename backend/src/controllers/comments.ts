import { PostKind } from '@prisma/client';
import type { Response } from 'express';
import { db } from '../database';
import { assertCommentPermission } from '../middlewares/isAuthorized';
import { GenericAction } from '../utils/permissions';
import { safeUser } from '../utils/safeUser';
import type { Request } from '../utils/types';
import {
  createComment,
  findOneCommentWithPost,
  findOnePost,
  updateComment,
} from '../validators/comments';

// Set of post kinds that do not allow comments
const UNCOMMENTABLE_POSTS = new Set<PostKind>([
  PostKind.PARTNER_COMPANY,
  PostKind.PARTNER_SCHOOL,
]);

// Error message for commenting on uncommentable posts
const UNCOMMENTABLE_POST_ERROR = 'Comments are not allowed on partner posts';

// Creates a new comment on a post
export async function create(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { postId } = findOnePost.parse(req.params);

  // 2. Check if the parent post exists
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the parent post allows comments
  if (UNCOMMENTABLE_POSTS.has(post.kind)) {
    res.status(400).json({ message: UNCOMMENTABLE_POST_ERROR });
    return;
  }

  // 4. Check if the user has permission to comment on the post
  assertCommentPermission(req.user!, GenericAction.Create, post);

  // 5. Parse the user body input
  const data = createComment.parse(req.body);

  // 6. Create the comment
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

  // 7. Return the comment
  res.status(201).json(comment);
}

// Retrieves all comments for a specific post
export async function findAll(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { postId } = findOnePost.parse(req.params);

  // 2. Check if the parent post exists
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the parent post allows comments
  if (UNCOMMENTABLE_POSTS.has(post.kind)) {
    res.status(400).json({ message: UNCOMMENTABLE_POST_ERROR });
    return;
  }

  // 4. Check if the user has permission to read comments on the post
  assertCommentPermission(req.user!, GenericAction.Read, post);

  // 5. Retrieve all comments for the post
  const comments = await db.comment.findMany({
    where: { postId },
    include: { author: true },
  });

  // 6. Return the comments
  res
    .status(200)
    .json(
      comments.map(comment => ({
        ...comment,
        author: safeUser(comment.author),
      })),
    );
}

// Retrieves a specific comment for a post
export async function findOne(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { id: commentId, postId } = findOneCommentWithPost.parse(req.params);

  // 2. Check if the parent post exists
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the parent post allows comments
  if (UNCOMMENTABLE_POSTS.has(post.kind)) {
    res.status(400).json({ message: UNCOMMENTABLE_POST_ERROR });
    return;
  }

  // 4. Check if the user has permission to read comments on the post
  assertCommentPermission(req.user!, GenericAction.Read, post);

  // 5. Retrieve the comment
  const comment = await db.comment.findUnique({
    where: { id: commentId },
    include: { author: true },
  });
  if (!comment || comment.postId !== postId) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }

  // 6. Return the comment
  res.status(200).json({ ...comment, author: safeUser(comment.author) });
}

// Updates a specific comment for a post
export async function update(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { id: commentId, postId } = findOneCommentWithPost.parse(req.params);

  // 2. Check if the parent post exists
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the parent post allows comments
  if (UNCOMMENTABLE_POSTS.has(post.kind)) {
    res.status(400).json({ message: UNCOMMENTABLE_POST_ERROR });
    return;
  }

  // 4. Parse the user body input
  const data = updateComment.parse(req.body);

  // 5. Retrieve the comment
  const comment = await db.comment.findUnique({
    where: { id: commentId },
    include: { post: true },
  });
  if (!comment || comment.postId !== postId) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }

  // 6. Check if the user has permission to update the comment
  assertCommentPermission(req.user!, GenericAction.Update, comment);

  // 7. Update the comment
  const updatedComment = await db.comment.update({
    where: { id: commentId },
    data,
  });

  // 8. Return the updated comment
  res.status(200).json(updatedComment);
}

// Removes a specific comment for a post
export async function remove(req: Request, res: Response): Promise<void> {
  // 1. Parse the user params input
  const { id: commentId, postId } = findOneCommentWithPost.parse(req.params);

  // 2. Check if the parent post exists
  const post = await db.post.findUnique({ where: { id: postId } });
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  // 3. Check if the parent post allows comments
  if (UNCOMMENTABLE_POSTS.has(post.kind)) {
    res.status(400).json({ message: UNCOMMENTABLE_POST_ERROR });
    return;
  }

  // 4. Retrieve the comment
  const comment = await db.comment.findUnique({
    where: { id: commentId },
    include: { post: true },
  });
  if (!comment || comment.postId !== postId) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }

  // 5. Check if the user has permission to delete the comment
  assertCommentPermission(req.user!, GenericAction.Delete, comment);

  // 6. Delete the comment
  await db.comment.delete({ where: { id: commentId } });

  // 7. Return an empty response
  res.status(204).end();
}

import { Post } from '../types/types';

export const ADD_POSTS = 'ADD_POSTS';
export const MARK_POSTS_READ = 'MARK_POSTS_READ';
export const MARK_ALL_POSTS_READ = 'MARK_ALL_POSTS_READ';
export const SET_POST_IS_READ = 'SET_POST_IS_READ';
export const REMOVE_POSTS = 'REMOVE_POSTS';
export const REMOVE_ALL_POSTS = 'REMOVE_ALL_POSTS';

export interface AddPostsAction {
  type: typeof ADD_POSTS;
  payload: Post[];
}

export function addPosts(posts: Post[]): AddPostsAction {
  return {
    type: ADD_POSTS,
    payload: posts,
  };
}

export interface RemovePostsAction {
  type: typeof REMOVE_POSTS;
  payload: Post['id'][];
}

export function removePosts(ids: Post['id'][]): RemovePostsAction {
  return {
    type: REMOVE_POSTS,
    payload: ids,
  };
}

export interface RemoveAllPostsAction {
  type: typeof REMOVE_ALL_POSTS;
}

export function removeAllPosts(): RemoveAllPostsAction {
  return {
    type: REMOVE_ALL_POSTS,
  };
}

export interface SetPostIsReadAction {
  type: typeof SET_POST_IS_READ;
  payload: {
    postId: Post['id'];
    isRead: boolean;
  };
}

export function setPostIsRead(
  postId: Post['id'],
  isRead: boolean
): SetPostIsReadAction {
  return {
    type: SET_POST_IS_READ,
    payload: {
      postId,
      isRead,
    },
  };
}

export interface MarkPostsReadAction {
  type: typeof MARK_POSTS_READ;
  payload: Post['id'][];
}

export function markPostsRead(postIds: Post['id'][]): MarkPostsReadAction {
  return {
    type: MARK_POSTS_READ,
    payload: postIds,
  };
}

export interface MarkAllPostsReadAction {
  type: typeof MARK_ALL_POSTS_READ;
}

export function markAllPostsRead(): MarkAllPostsReadAction {
  return {
    type: MARK_ALL_POSTS_READ,
  };
}

export type PostActions =
  | AddPostsAction
  | RemovePostsAction
  | RemoveAllPostsAction
  | SetPostIsReadAction
  | MarkPostsReadAction
  | MarkAllPostsReadAction;

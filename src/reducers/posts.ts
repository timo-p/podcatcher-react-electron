import { omit } from 'ramda';
import {
  ADD_POSTS,
  MARK_ALL_POSTS_READ,
  MARK_POSTS_READ,
  PostActions,
  REMOVE_ALL_POSTS,
  REMOVE_POSTS,
  SET_POST_IS_READ,
} from '../actions';
import { StatePost } from './types';

export default function posts(state: StatePost = {}, action: PostActions) {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        ...action.payload
          .filter((p) => !Object.keys(state).includes(p.id))
          .reduce((c, post) => ({ ...c, [post.id]: post }), {}),
      };
    case REMOVE_POSTS:
      return omit(action.payload, state);
    case REMOVE_ALL_POSTS:
      return {};
    case SET_POST_IS_READ:
      return {
        ...state,
        ...{
          [action.payload.postId]: {
            ...state[action.payload.postId],
            isRead: action.payload.isRead,
          },
        },
      };
    case MARK_POSTS_READ:
      return {
        ...state,
        ...action.payload.reduce(
          (c, postId) => ({
            ...c,
            [postId]: { ...state[postId], isRead: true },
          }),
          {}
        ),
      };
    case MARK_ALL_POSTS_READ:
      return Object.keys(state).reduce(
        (newState, postId) => ({
          ...newState,
          [postId]: {
            ...state[postId],
            isRead: true,
          },
        }),
        {}
      );
    default:
      return state;
  }
}

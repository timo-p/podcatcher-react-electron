import { complement, filter, isNil, partial, propEq } from 'ramda';
import { Post } from '../types/types';

export default function filterUnreadPosts(posts: Post[]) {
  const filterRead = partial<Post[]>(filter, [propEq('isRead', false)]);
  const filterNil = partial<Post[]>(filter, [complement(isNil)]);
  return filterRead(filterNil(posts));
}

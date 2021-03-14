import { List } from '@material-ui/core';
import React from 'react';
import Post from '../../containers/Post';
import { StateFeed } from '../../reducers/types';
import { Post as PostType } from '../../types/types';

type UnreadPostsProps = {
  posts: PostType[];
  feeds: StateFeed;
};

export default function UnreadPosts({ posts, feeds }: UnreadPostsProps) {
  return (
    <>
      <List>
        {posts.map((post) => (
          <Post post={post} feed={feeds[post.feedId]} key={post.id} />
        ))}
      </List>
    </>
  );
}

import { IconButton, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import React from 'react';
import { StateFeed } from '../../reducers/types';
import { Post as PostType } from '../../types/types';
import Posts from '../Posts/Posts';

type UnreadPostsProps = {
  posts: PostType[];
  feeds: StateFeed;
  markPostsRead: (postIds: PostType['id'][]) => void;
};

export default function UnreadPosts({
  posts,
  feeds,
  markPostsRead,
}: UnreadPostsProps) {
  return (
    <>
      <Typography variant="h4">Unread posts</Typography>
      <IconButton onClick={() => markPostsRead(posts.map((p) => p.id))}>
        <Done />
      </IconButton>
      <Posts posts={posts} feeds={feeds} />
    </>
  );
}

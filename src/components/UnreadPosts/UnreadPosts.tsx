import { Box, IconButton, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import React from 'react';
import { StateFeed } from '../../reducers/types';
import { Post as PostType } from '../../types/types';
import Posts from '../Posts/Posts';
import styles from './UnreadPosts.module.css';

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
      <Box className={styles.topBox}>
        <Typography variant="h4">Unread posts</Typography>
        {posts.length > 0 && (
          <Typography>{posts.length} unread posts.</Typography>
        )}

        {posts.length === 0 && <Typography>No unread posts</Typography>}
        {posts.length > 0 && (
          <IconButton onClick={() => markPostsRead(posts.map((p) => p.id))}>
            <Done />
          </IconButton>
        )}
      </Box>
      {posts.length > 0 && <Posts posts={posts} feeds={feeds} />}
    </>
  );
}

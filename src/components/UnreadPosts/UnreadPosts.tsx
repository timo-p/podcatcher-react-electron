import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { sortBy } from 'ramda';
import React from 'react';
import { StateFeed } from '../../reducers/types';
import { Post as PostType } from '../../types/types';
import filterUnreadPosts from '../../utils/filterUnreadPosts';
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
  const [showAll, setShowAll] = React.useState(false);

  const showPosts = sortBy(
    (post) => new Date(post.pubDate),
    showAll ? posts : filterUnreadPosts(posts)
  ).reverse();

  return (
    <>
      <Box className={styles.topBox}>
        <Typography variant="h4">Unread posts</Typography>
        {showPosts.length > 0 && (
          <Typography>
            {showPosts.length} {!showAll && 'unread '}post
            {showPosts.length !== 1 && 's'}.
          </Typography>
        )}

        {showPosts.length === 0 && <Typography>No unread posts</Typography>}
        <FormControlLabel
          control={
            <Checkbox checked={showAll} onChange={() => setShowAll(!showAll)} />
          }
          label="Show all posts"
        />
        {showPosts.length > 0 && (
          <IconButton onClick={() => markPostsRead(showPosts.map((p) => p.id))}>
            <Done />
          </IconButton>
        )}
      </Box>
      {showPosts.length > 0 && <Posts posts={showPosts} feeds={feeds} />}
    </>
  );
}

import { Button, Grid, List, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React from 'react';
import Post from '../../containers/Post';
import { StateFeed } from '../../reducers/types';
import { Post as PostType } from '../../types/types';
import styles from './Posts.module.css';

type PostsProps = {
  posts: PostType[];
  feeds: StateFeed;
};

export default function Posts({ posts, feeds }: PostsProps) {
  const [page, setPage] = React.useState(1);
  React.useEffect(() => {
    setPage(1);
  }, [posts]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const postsSlice = posts.slice(0, page * 10);

  return (
    <div className={styles.container}>
      <List>
        {postsSlice.map((post) => (
          <Post post={post} feed={feeds[post.feedId]} key={post.id} />
        ))}
      </List>
      <Grid container justify="center">
        <Grid item>
          {posts.length > postsSlice.length ? (
            <Button
              onClick={loadMore}
              variant="contained"
              color="primary"
              startIcon={<ExpandMore />}
            >
              Load more
            </Button>
          ) : (
            <Typography>No more posts</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

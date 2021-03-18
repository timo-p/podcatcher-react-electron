import { List, Typography } from '@material-ui/core';
import { Loop } from '@material-ui/icons';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../../containers/Post';
import { StateFeed } from '../../reducers/types';
import { Post as PostType } from '../../types/types';

type PostsProps = {
  posts: PostType[];
  feeds: StateFeed;
};

export default function Posts({ posts, feeds }: PostsProps) {
  const [page, setPage] = React.useState(1);

  const loadMore = () => {
    setPage(page + 1);
  };

  const postsSlice = posts.slice(0, page * 10);

  return (
    <List>
      <InfiniteScroll
        dataLength={postsSlice.length}
        next={loadMore}
        hasMore={posts.length > postsSlice.length}
        loader={<Loop />}
        endMessage={
          <Typography variant="subtitle2" align="center">
            No more posts
          </Typography>
        }
      >
        {postsSlice.map((post) => (
          <Post post={post} feed={feeds[post.feedId]} key={post.id} />
        ))}
      </InfiniteScroll>
    </List>
  );
}

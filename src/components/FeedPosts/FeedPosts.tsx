import { Box, IconButton, Typography } from '@material-ui/core';
import { Delete, Done, Refresh } from '@material-ui/icons';
import { filter, propEq } from 'ramda';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';
import { Feed, Post as PostType } from '../../types/types';
import Posts from '../Posts/Posts';
import styles from './FeedPosts.module.css';

type PostsProps = {
  feed: Feed | undefined;
  posts: PostType[];
  removeFeed: (feedId: Feed['id']) => void;
  removePosts: (postIds: PostType['id'][]) => void;
  markPostsRead: (postIds: PostType['id'][]) => void;
  addToRefreshQueue: (items: RefreshQueueItem[]) => void;
  processRefreshQueue: () => void;
  push: (path: string) => void;
};

export default function FeedPosts({
  posts,
  feed,
  removeFeed,
  removePosts,
  markPostsRead,
  addToRefreshQueue,
  processRefreshQueue,
  push,
}: PostsProps) {
  const removeFeedAndGoToHome = () => {
    if (feed) {
      removeFeed(feed.id);
      removePosts(feed.posts);
    }
    push('/');
  };

  const refresh = async () => {
    if (feed) {
      addToRefreshQueue([
        {
          url: feed.url,
          title: feed.title,
          status: 'queued',
        },
      ]);
      processRefreshQueue();
    }
  };

  const unreadCount = filter(propEq('isRead', false), posts).length;

  return (
    <>
      <Box className={styles.topBox}>
        <Typography className={styles.title} variant="h4">
          {feed?.title}
        </Typography>
        <Typography className={styles.postCount}>
          {posts.length} posts in total. {unreadCount} unread.
        </Typography>
      </Box>
      <IconButton onClick={() => markPostsRead(posts.map((p) => p.id))}>
        <Done />
      </IconButton>
      <IconButton onClick={() => refresh()}>
        <Refresh />
      </IconButton>
      <IconButton onClick={() => removeFeedAndGoToHome()}>
        <Delete />
      </IconButton>
      {feed && (
        <Posts
          posts={posts}
          feeds={{ [feed.id]: feed }}
          showFeedTitle={false}
          displayId={feed.id}
        />
      )}
    </>
  );
}

import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';
import { Feed, Post } from '../../types/types';
import Posts from '../Posts/Posts';

type PostsProps = {
  feed: Feed | undefined;
  posts: Post[];
  removeFeed: (feedId: Feed['id']) => void;
  removePosts: (postIds: Post['id'][]) => void;
  markPostsRead: (postIds: Post['id'][]) => void;
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

  return (
    <>
      <Typography>{feed?.title}</Typography>
      <Button onClick={() => markPostsRead(posts.map((p) => p.id))}>
        Mark all posts as read
      </Button>
      <Button onClick={() => refresh()}>Refresh feed</Button>
      <Button onClick={() => removeFeedAndGoToHome()}>Delete feed</Button>
      <Posts posts={posts} />
    </>
  );
}

import { IconButton, List, Typography } from '@material-ui/core';
import { Delete, Done, Refresh } from '@material-ui/icons';
import React from 'react';
import Post from '../../containers/Post';
import { RefreshQueueItem } from '../../reducers/types';
import { Feed, Post as PostType } from '../../types/types';

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

  return (
    <>
      <Typography variant="h4">{feed?.title}</Typography>
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
        <List>
          {posts.map((post) => (
            <Post post={post} feed={feed} key={post.id} />
          ))}
        </List>
      )}
    </>
  );
}

import { Button, List } from '@material-ui/core';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';
import { Feed } from '../../types/types';
import FeedListItem from './FeedListItem';

type FeedsProps = {
  feedsAndUnreadPosts: {
    feed: Feed;
    unreadPosts: number;
  }[];
  markAllPostsRead: () => void;
  addToRefreshQueue: (items: RefreshQueueItem[]) => void;
  processRefreshQueue: () => void;
};

export default function Feeds({
  feedsAndUnreadPosts,
  markAllPostsRead,
  addToRefreshQueue,
  processRefreshQueue,
}: FeedsProps) {
  const refreshAll = () => {
    addToRefreshQueue(
      feedsAndUnreadPosts.map(({ feed: { url, title } }) => ({
        url,
        title,
        status: 'queued',
      }))
    );
    processRefreshQueue();
  };
  return (
    <>
      <Button onClick={() => markAllPostsRead()}>Mark all as read</Button>
      <Button onClick={() => refreshAll()}>Refresh all</Button>
      <List>
        {feedsAndUnreadPosts.map(({ feed, unreadPosts }) => (
          <FeedListItem feed={feed} key={feed.id} unreadPosts={unreadPosts} />
        ))}
      </List>
    </>
  );
}

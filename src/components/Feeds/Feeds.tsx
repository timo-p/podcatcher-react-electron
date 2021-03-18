import { IconButton, List } from '@material-ui/core';
import { ViewList } from '@material-ui/icons';
import DoneAll from '@material-ui/icons/DoneAll';
import Refresh from '@material-ui/icons/Refresh';
import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshQueueItem } from '../../reducers/types';
import { Feed } from '../../types/types';
import FeedListItem from './FeedListItem';

export type FeedsProps = {
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
      <IconButton onClick={() => markAllPostsRead()}>
        <DoneAll />
      </IconButton>
      <IconButton onClick={() => refreshAll()}>
        <Refresh />
      </IconButton>
      <Link to="/">
        <IconButton>
          <ViewList />
        </IconButton>
      </Link>
      <List>
        {feedsAndUnreadPosts.map(({ feed, unreadPosts }) => (
          <FeedListItem feed={feed} key={feed.id} unreadPosts={unreadPosts} />
        ))}
      </List>
    </>
  );
}

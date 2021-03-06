import { Button, List, ButtonGroup } from '@material-ui/core';
import { ViewList } from '@material-ui/icons';
import DoneAll from '@material-ui/icons/DoneAll';
import Refresh from '@material-ui/icons/Refresh';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { RefreshQueueItem } from '../../reducers/types';
import { Feed } from '../../types/types';
import FeedListItem from './FeedListItem';
import styles from './Feeds.module.css';

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
  const history = useHistory();
  return (
    <>
      <ButtonGroup className={styles.buttonGroup}>
        <Button onClick={() => markAllPostsRead()}>
          <DoneAll />
        </Button>
        <Button onClick={() => refreshAll()}>
          <Refresh />
        </Button>
        <Button onClick={() => history.push('/')}>
          <ViewList />
        </Button>
      </ButtonGroup>
      <List>
        {feedsAndUnreadPosts.map(({ feed, unreadPosts }) => (
          <FeedListItem feed={feed} key={feed.id} unreadPosts={unreadPosts} />
        ))}
      </List>
    </>
  );
}

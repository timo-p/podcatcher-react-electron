import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Feed } from '../../types/types';
import styles from './FeedListItem.module.css';

type FeedListItemProps = {
  feed: Feed;
  unreadPosts: number;
};

export default function FeedListItem({ feed, unreadPosts }: FeedListItemProps) {
  return (
    <ListItem dense disableGutters classes={{ root: styles.listItemRoot }}>
      <ListItemText classes={{ root: styles.listItemTextRoot }}>
        <Link className={styles.link} to={`/feeds/${feed.id}/posts`}>
          {feed.title}
          {unreadPosts > 0 && ` (${unreadPosts})`}
        </Link>
      </ListItemText>
    </ListItem>
  );
}

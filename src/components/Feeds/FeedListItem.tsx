import { ListItem, ListItemText } from '@material-ui/core';
import classnames from 'classnames';
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
        <Link
          className={classnames(styles.link, {
            [styles.linkWithNoUnread]: unreadPosts === 0,
            [styles.linkWithUnread]: unreadPosts > 0,
          })}
          to={`/feeds/${feed.id}/posts`}
        >
          {feed.title}
          {unreadPosts > 0 && ` (${unreadPosts})`}
        </Link>
      </ListItemText>
    </ListItem>
  );
}

import { List } from '@material-ui/core';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';
import QueueItem from '../QueueItem/QueueItem';

export type RefreshQueueProps = {
  feeds: RefreshQueueItem[];
  removeFromRefreshQueue: (url: string) => void;
};

export default function RefreshQueue({
  feeds,
  removeFromRefreshQueue,
}: RefreshQueueProps) {
  return (
    <List>
      {feeds.map(({ url, title, status }) => (
        <QueueItem
          key={url}
          title={title || url}
          removeAction={
            status === 'queued' ? () => removeFromRefreshQueue(url) : undefined
          }
          progress={status === 'processing' ? 0 : undefined}
          speed={status === 'processing' ? 0 : undefined}
        />
      ))}
    </List>
  );
}

import { Divider, List } from '@material-ui/core';
import React, { Fragment } from 'react';
import { DownloadQueueItem } from '../../reducers/types';
import QueueItem from '../QueueItem/QueueItem';

export type DownloadsProps = {
  downloads: DownloadQueueItem[];
  addToDownloadRemoveQueue: (postId: string) => void;
  removeFromDownloadQueue: (postId: string) => void;
};

export default function DownloadQueue({
  downloads,
  addToDownloadRemoveQueue,
  removeFromDownloadQueue,
}: DownloadsProps) {
  return (
    <>
      <List>
        {downloads.map(({ postId, title, status, progress, speed }) => (
          <Fragment key={postId}>
            <QueueItem
              title={title}
              status={status}
              progress={
                ['downloading', 'finished'].includes(status)
                  ? progress
                  : undefined
              }
              speed={status === 'downloading' ? speed : undefined}
              removeAction={
                status === 'finished'
                  ? () => removeFromDownloadQueue(postId)
                  : () => addToDownloadRemoveQueue(postId)
              }
            />
            <Divider light />
          </Fragment>
        ))}
      </List>
    </>
  );
}

import { Divider, List } from '@material-ui/core';
import React, { Fragment } from 'react';
import { DownloadQueueItem } from '../../reducers/types';
import QueueItem from '../QueueItem/QueueItem';

export type DownloadsProps = {
  downloads: DownloadQueueItem[];
  addToDownloadRemoveQueue: (postId: string) => void;
};

export default function DownloadQueue({
  downloads,
  addToDownloadRemoveQueue,
}: DownloadsProps) {
  return (
    <>
      <List>
        {downloads.map(({ postId, title, status, progress, speed }) => (
          <Fragment key={postId}>
            <QueueItem
              title={title}
              progress={status === 'downloading' ? progress : undefined}
              speed={status === 'downloading' ? speed : undefined}
              removeAction={() => addToDownloadRemoveQueue(postId)}
            />
            <Divider light />
          </Fragment>
        ))}
      </List>
    </>
  );
}

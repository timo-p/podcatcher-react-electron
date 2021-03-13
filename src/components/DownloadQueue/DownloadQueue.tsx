import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { HourglassEmpty } from '@material-ui/icons';
import React from 'react';
import { DownloadQueueItem } from '../../reducers/types';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';

export type DownloadsProps = {
  downloads: DownloadQueueItem[];
};

export default function DownloadQueue({ downloads }: DownloadsProps) {
  return (
    <>
      <List>
        {downloads.map(({ postId, title, status, progress }) => (
          <ListItem key={postId}>
            <ListItemIcon>
              {status === 'downloading' && (
                <CircularProgressWithLabel value={progress} />
              )}
              {status === 'queued' && <HourglassEmpty />}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

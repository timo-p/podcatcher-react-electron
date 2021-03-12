import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { HourglassEmpty, HourglassFull } from '@material-ui/icons';
import React from 'react';
import { DownloadQueueItem } from '../../reducers/types';

type DownloadsProps = {
  downloads: DownloadQueueItem[];
};

export default function DownloadQueue({ downloads }: DownloadsProps) {
  return (
    <>
      <List>
        {downloads.map(({ postId, title, status }) => (
          <ListItem key={postId}>
            <ListItemIcon>
              {status === 'queued' ? <HourglassEmpty /> : <HourglassFull />}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

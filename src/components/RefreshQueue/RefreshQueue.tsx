import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { HourglassEmpty, HourglassFull } from '@material-ui/icons';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';

type DownloadsProps = {
  feeds: RefreshQueueItem[];
};

export default function RefreshQueue({ feeds }: DownloadsProps) {
  return (
    <>
      Refresh list
      <List>
        {feeds.map(({ url, title, status }) => (
          <ListItem key={url}>
            <ListItemIcon>
              {status === 'queued' ? <HourglassEmpty /> : <HourglassFull />}
            </ListItemIcon>
            <ListItemText primary={title || url} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

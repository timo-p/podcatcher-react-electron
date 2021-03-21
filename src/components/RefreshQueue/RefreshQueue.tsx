import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { Cached, HourglassEmpty, RemoveCircle } from '@material-ui/icons';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';

export type RefreshQueueProps = {
  feeds: RefreshQueueItem[];
  removeFromRefreshQueue: (url: string) => void;
};

export default function RefreshQueue({
  feeds,
  removeFromRefreshQueue,
}: RefreshQueueProps) {
  return (
    <>
      <List>
        {feeds.map(({ url, title, status }) => (
          <ListItem key={url}>
            <ListItemIcon>
              {status === 'queued' ? <HourglassEmpty /> : <Cached />}
            </ListItemIcon>
            <ListItemText primary={title || url} />
            {status === 'queued' && (
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => removeFromRefreshQueue(url)}
                  edge="end"
                  aria-label="delete"
                >
                  <RemoveCircle />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </>
  );
}

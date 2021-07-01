/* eslint-disable react/require-default-props */
import {
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { RemoveCircle } from '@material-ui/icons';
import React from 'react';
import { DownloadQueueItemStatus } from '../../reducers/types';
import formatSpeed from '../../utils/formatSpeed';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';
import styles from './QueueItem.module.css';

type QueueItemProps = {
  title: string;
  progress?: number;
  speed?: number;
  status: DownloadQueueItemStatus;
  removeAction?: () => void;
};

export default function QueueItem({
  title,
  progress,
  speed,
  status,
  removeAction,
}: QueueItemProps) {
  return (
    <ListItem className={styles.listItem}>
      <ListItemText primary={title} className={styles.listItemText} />
      <Grid container justify="center">
        {progress !== undefined && (
          <Grid className={styles.grid} container direction="column">
            <ListItemIcon>
              <CircularProgressWithLabel value={progress} />
            </ListItemIcon>
            {status === 'finished' && (
              <Typography variant="caption" color="textSecondary">
                Finished
              </Typography>
            )}
            {speed !== undefined && formatSpeed(speed)}
          </Grid>
        )}
        {removeAction && (
          <IconButton onClick={removeAction}>
            <RemoveCircle />
          </IconButton>
        )}
      </Grid>
    </ListItem>
  );
}

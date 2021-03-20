import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { RemoveCircle } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { DownloadQueueItem } from '../../reducers/types';
import formatSpeed from '../../utils/formatSpeed';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';
import styles from './DownloadQueue.module.css';

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
            <ListItem className={styles.listItem}>
              <ListItemText primary={title} className={styles.listItemText} />

              <Grid container justify="center">
                {status === 'downloading' && (
                  <Grid className={styles.grid} container direction="column">
                    <ListItemIcon>
                      <CircularProgressWithLabel value={progress} />
                    </ListItemIcon>
                    {formatSpeed(speed)}
                  </Grid>
                )}
                <IconButton onClick={() => addToDownloadRemoveQueue(postId)}>
                  <RemoveCircle />
                </IconButton>
              </Grid>
            </ListItem>
            <Divider light />
          </Fragment>
        ))}
      </List>
    </>
  );
}

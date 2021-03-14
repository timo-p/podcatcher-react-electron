import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import { DownloadQueueItem } from '../../reducers/types';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';
import styles from './DownloadQueue.module.css';
import formatSpeed from '../../utils/formatSpeed';

export type DownloadsProps = {
  downloads: DownloadQueueItem[];
};

export default function DownloadQueue({ downloads }: DownloadsProps) {
  return (
    <>
      <List>
        {downloads.map(({ postId, title, status, progress, speed }) => (
          <Fragment key={postId}>
            <ListItem className={styles.listItem}>
              <ListItemText primary={title} className={styles.listItemText} />

              {status === 'downloading' && (
                <>
                  <ListItemIcon>
                    <CircularProgressWithLabel value={progress} />
                  </ListItemIcon>
                  {formatSpeed(speed)}
                </>
              )}
            </ListItem>
            <Divider light />
          </Fragment>
        ))}
      </List>
    </>
  );
}

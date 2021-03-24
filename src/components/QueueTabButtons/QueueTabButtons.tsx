import { Button, ButtonGroup } from '@material-ui/core';
import { CloudDownload, Refresh } from '@material-ui/icons';
import React from 'react';
import DownloadQueue from '../../containers/DownloadQueue';
import RefreshQueue from '../../containers/RefreshQueue';
import { DownloadQueueItem, RefreshQueueItem } from '../../reducers/types';
import styles from './QueueTabButtons.module.css';

export type QueueTabButtonsProps = {
  refreshQueue: RefreshQueueItem[];
  downloadQueue: DownloadQueueItem[];
};

export default function QueueTabButtons({
  refreshQueue,
  downloadQueue,
}: QueueTabButtonsProps) {
  const [leftOpen, setLeftOpen] = React.useState(true);

  return (
    <>
      <ButtonGroup
        variant="contained"
        fullWidth
        color="primary"
        className={styles.buttonGroup}
      >
        <Button
          variant={leftOpen ? 'contained' : 'outlined'}
          onClick={() => setLeftOpen(true)}
        >
          <CloudDownload className={styles.downloadIcon} />{' '}
          {downloadQueue.length}
        </Button>
        <Button
          variant={leftOpen ? 'outlined' : 'contained'}
          onClick={() => setLeftOpen(false)}
        >
          <Refresh /> {refreshQueue.length}
        </Button>
      </ButtonGroup>
      {leftOpen ? <DownloadQueue /> : <RefreshQueue />}
    </>
  );
}

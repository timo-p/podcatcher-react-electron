import { Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { RefreshQueueItem } from '../../reducers/types';
import styles from './AddFeedBatch.css';

type AddFeedBatchProps = {
  addToRefreshQueue: (items: RefreshQueueItem[]) => void;
  processRefreshQueue: () => void;
};

export default function AddFeedBatch({
  addToRefreshQueue,
  processRefreshQueue,
}: AddFeedBatchProps) {
  const [urls, setUrls] = React.useState('');
  const add = () => {
    const refreshQueueItems: RefreshQueueItem[] = urls
      .split('\n')
      .filter((u) => u)
      .map((url) => ({
        url,
        status: 'queued',
      }));

    addToRefreshQueue(refreshQueueItems);
    processRefreshQueue();
  };
  return (
    <>
      <Typography variant="h4">Add a batch of feeds</Typography>
      <TextField
        multiline
        variant="outlined"
        fullWidth
        rows={10}
        onChange={(e) => setUrls(e.target.value)}
      />
      <Button
        className={styles.marginTop}
        variant="contained"
        color="primary"
        onClick={() => urls && add()}
      >
        Add
      </Button>
    </>
  );
}

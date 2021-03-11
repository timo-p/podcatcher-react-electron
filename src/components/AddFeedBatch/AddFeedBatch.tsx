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
  const add = async () => {
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
        rows={10}
        className={styles.textarea}
        onChange={(e) => setUrls(e.target.value)}
      />
      <Button onClick={() => urls && add()}>Add</Button>
    </>
  );
}
